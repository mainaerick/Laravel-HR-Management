import React, { useEffect, useState } from "react";
import { Button, Card, Flex, message, Modal, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Department } from "@/Pages/Departments/Core/Model";
import { router, useForm } from "@inertiajs/react";
import Create from "@/Pages/JobOpenings/Create";
import { JobOpening, JobOpeningsResponse } from "@/Pages/JobOpenings/Core/Model";
import JobsComplete from "@/Pages/JobOpenings/Components/JobsComplete";
import JobsInActive from "@/Pages/JobOpenings/Components/JobsInActive";
import JobsActive from "@/Pages/JobOpenings/Components/JobsActive";
import axios, {Method} from "axios";

type Props = {
    groupeddata: JobOpeningsResponse;
    filters: any;
    departments: Department[];
    passed_params?: any;
};

function JobsListing({ groupeddata, filters, departments, passed_params }: Props) {
    const [messageApi, contextHolder] = message.useMessage();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<JobOpening | undefined>(undefined);
    const [groupedDataState, setGroupedDataState] = useState(groupeddata);
    const { data, setData, post, put, processing, errors } = useForm<JobOpening | any>({});

    const openCreateModal = () => {
        setEditingJob(undefined);
        setModalOpen(true);
    };

    const openEditModal = (jobID: number|string) => {
        axios.get(route("jobopening.edit", { id: jobID }))
            .then((response:any) => {
                setEditingJob(response.data);
                setData(response.data);
                setModalOpen(true);
            })
            .catch(() => {
                messageApi.error("Failed to fetch job details.");
            });
    };

    const handleSubmit = () => {
        const method: any = editingJob ? "PUT" : "POST";
        const routeName = editingJob ? route("jobopening.update", { id: editingJob.id }) : route("jobopening.store");

        const request = editingJob ? put : post;

        request(routeName, {
            method,
            data,
            onSuccess: () => {
                messageApi.success(editingJob ? "Job Updated Successfully." : "Job Created Successfully.");
                setModalOpen(false);
            },
            onProgress: () => {
                messageApi.loading(editingJob ? "Updating Job..." : "Creating Job...");
            },
            onError: (e) => {
                messageApi.error(e.title || "An error occurred");
            },
        });
    };



    return (
        <Card className="mr-6" style={{ borderRadius: "10px" }}>
            {contextHolder}

            {/* Add New Job Button */}
            <Flex justify="space-between" className="mb-6">
                <Button
                    type="primary"
                    onClick={openCreateModal}
                    icon={<PlusOutlined />}
                    className="w-full md:w-auto"
                    style={{ borderRadius: 10, padding: "10px 20px" }}
                >
                    Add New Job
                </Button>
            </Flex>

            {/* Job Listings */}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                    {groupedDataState?.active ? (
                        <JobsActive jobClick={openEditModal} jobs={groupedDataState.active} />
                    ) : (
                        <p>Loading active jobs...</p>
                    )}
                </Col>
                <Col xs={24} sm={12} md={8}>
                    {groupedDataState?.inactive ? (
                        <JobsInActive jobClick={openEditModal} jobs={groupedDataState.inactive} />
                    ) : (
                        <p>Loading inactive jobs...</p>
                    )}
                </Col>
                <Col xs={24} sm={12} md={8}>
                    {groupedDataState?.completed ? (
                        <JobsComplete jobClick={openEditModal} jobs={groupedDataState.completed} />
                    ) : (
                        <p>Loading completed jobs...</p>
                    )}
                </Col>
            </Row>

            {/* Job Modal */}
            <Modal
                title={editingJob ? "Edit Job" : "Add New Job"}
                centered
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                footer={null}
            >
                <Create clickedJobData={editingJob} departments={departments} handleSubmit={handleSubmit} setData={setData} />
            </Modal>
        </Card>
    );
}

export default JobsListing;
