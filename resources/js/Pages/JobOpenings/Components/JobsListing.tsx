import React, {useEffect, useState} from "react";
import { Button, Card, Flex, message, Modal, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Department } from "@/Pages/Departments/Core/Model";
import {router, useForm} from "@inertiajs/react";
import Create from "@/Pages/JobOpenings/Create";
import { JobOpening, JobOpeningsResponse } from "@/Pages/JobOpenings/Core/Model";
import JobsComplete from "@/Pages/JobOpenings/Components/JobsComplete";
import JobsInActive from "@/Pages/JobOpenings/Components/JobsInActive";
import JobsActive from "@/Pages/JobOpenings/Components/JobsActive";

type Props = {
    groupeddata: JobOpeningsResponse;
    filters: any;
    departments: Department[];
    passed_params?: any;
};

function JobsListing({ groupeddata, filters, departments, passed_params }: Props) {
    const [messageApi, contextHolder] = message.useMessage();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
    const [groupedDataState,setGroupedDataState]=useState(groupeddata);
    const { data, setData, post, put, processing, errors } = useForm<JobOpening | any>({

    });

    const openCreateModal = () => {
        setEditingJob(null); // Clear editing state
        setModalOpen(true);
    };

    const openEditModal = (jobID: number) => {
        axios.get(route("jobopening.edit", { id: jobID }))
            .then((response) => {

                setEditingJob(response.data);
                setData(response.data)
                setModalOpen(true);
            })
            .catch((e) => {
                console.log(e)
                messageApi.error("Failed to fetch job details.");
            });
    };

    const handleSubmit = () => {
        const method = editingJob ? "PUT" : "POST";
        const routeName = editingJob ? route("jobopening.update", { id: editingJob.id }) : route("jobopening.store");

        if (editingJob){
            put(routeName, {
                method,
                data,
                onSuccess: () => {
                    messageApi.open({
                        type: "success",
                        content: "Job Updated Successfully." ,
                    });
                    setGroupedDataState((prevGroupedData) => {
                        if (!prevGroupedData) return prevGroupedData; // Ensure state exists before updating

                        // Find the updated job's status
                        const updatedStatus = data.status;

                        // Remove the job from all sections
                        const newActiveJobs = prevGroupedData.active.data.filter((job) => job.id !== data.id);
                        const newInactiveJobs = prevGroupedData.inactive.data.filter((job) => job.id !== data.id);
                        const newCompletedJobs = prevGroupedData.completed.data.filter((job) => job.id !== data.id);

                        // Add the job to the correct section
                        if (updatedStatus === "active") {
                            newActiveJobs.push(data);
                        } else if (updatedStatus === "inactive") {
                            newInactiveJobs.push(data);
                        } else if (updatedStatus === "completed") {
                            newCompletedJobs.push(data);
                        }

                        return {
                            ...prevGroupedData,
                            active: { ...prevGroupedData.active, data: newActiveJobs },
                            inactive: { ...prevGroupedData.inactive, data: newInactiveJobs },
                            completed: { ...prevGroupedData.completed, data: newCompletedJobs },
                        };
                    });
                    setModalOpen(false);
                },
                onProgress: () => {
                    messageApi.open({
                        type: "loading",
                        content: "Updating Job...",
                    });
                },
                onError: (e) => {
                    console.log(e)
                    messageApi.open({
                        type: "error",
                        content: e.title || "An error occurred",
                    });
                },
            });
        }else {
            post(routeName, {
                method,
                data,
                onSuccess: () => {
                    messageApi.open({
                        type: "success",
                        content:"Job Created Successfully.",
                    });
                    setModalOpen(false);
                },
                onProgress: () => {
                    messageApi.open({
                        type: "loading",
                        content: "Creating Job...",
                    });
                },
                onError: (e) => {
                    console.log(e)
                    messageApi.open({
                        type: "error",
                        content: e.title || "An error occurred",
                    });
                },
            });
        }
    };

    useEffect(() => {
        console.log(groupedDataState)
    }, [groupedDataState]);
    return (
        <Card className="mr-6" style={{ borderRadius: "10px" }}>
            {contextHolder}
            <Flex justify="space-between" className="mb-6">
                <Button
                    type="primary"
                    onClick={openCreateModal}
                    icon={<PlusOutlined />}
                    style={{ borderRadius: 10, padding: "10px 20px" }}
                >
                    Add New Job
                </Button>
            </Flex>

            {/* Job Listings */}
            <Row gutter={16}>
                <Col span={8}>
                    {groupedDataState?.active ? <JobsActive jobClick={openEditModal} jobs={groupedDataState.active} /> : <p>Loading active jobs...</p>}
                </Col>
                <Col span={8}>
                    {groupedDataState?.inactive ? <JobsInActive jobClick={openEditModal} jobs={groupedDataState.inactive} /> : <p>Loading inactive jobs...</p>}
                </Col>
                <Col span={8}>
                    {groupedDataState?.completed ? <JobsComplete jobClick={openEditModal} jobs={groupedDataState.completed} /> : <p>Loading completed jobs...</p>}
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
