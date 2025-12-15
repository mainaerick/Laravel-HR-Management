import React, {useEffect, useState} from 'react';
import {Button, Flex, message, Space, Tag, Typography} from "antd";
import {Head, useForm} from "@inertiajs/react";
import AttendanceTable from "@/Pages/Attendance/Components/AttendanceTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {PaginatedData} from "@/Core/Models";
import {JobOpening} from "@/Pages/JobOpenings/Core/Model";
type Props={
    leavedata:PaginatedData,filters:any
}
function Index({leavedata,filters}:Props) {
    const [messageApi, contextHolder] = message.useMessage();
    const { data, setData, put, processing, errors } = useForm<JobOpening | any>({

    });
    const [updateId, setUpdateId] = useState()
    useEffect(() => {
        if (updateId){
            updateLeaveStatus(updateId)
        }

    }, [data]);
    const updateLeaveStatus = (id: number) => {
        put(route("leave.update", { id }), {
            onSuccess: () => {
                messageApi.open({
                    type: "success",
                    content: `Leave ${status.charAt(0).toUpperCase() + status.slice(1)}`,
                });
            },
            onProgress: () => {
                messageApi.open({
                    type: "loading",
                    content: `Updating Leave to ${status}...`,
                });
            },
            onError: (e) => {
                console.log(e);
                messageApi.open({
                    type: "error",
                    content: "An error occurred while updating leave",
                });
            },
        });
    };
    const columns = [
        {
            title: "Employee",
            key: "employee",
            render: (_:any, record:any) => `${record.employee?.first_name ?? ''} ${record.employee?.last_name ?? ''}`,

        },

        {
            title: "Start Date",
            dataIndex: "start_date",
            key: "start_date",
        },
        {
            title: "End Date",
            dataIndex: "end_date",
            key: "end_date",
        },
        {
            title: "Days",
            dataIndex: "days",
            key: "days",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                const color = status === "approved" ? "green" : status === "pending" ? "orange" : "red";
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_:any, record:any) => (
              <Space>
                <Button type="primary" onClick={() => {
                    setUpdateId(record.id)
                    setData({status: "approved"})
                }}>Approve</Button>
                <Button type="default" onClick={() => {
                    setUpdateId(record.id)
                    setData({status: "pending"})
                }}>In Process</Button>
                <Button danger onClick={() => {
                    setUpdateId(record.id)
                    setData({status: "rejected"})
                }}>Reject</Button>
              </Space>
            ),
          },
    ];

    return (
        <AuthenticatedLayout
            header={
                <Flex vertical={true} className={"m-0"}>

                       <span  style={{height:23}}><Typography.Text style={{fontSize:20}} className="font-semibold m-0 p-0 leading-tight text-gray-800 dark:text-gray-800">
                           Candidates
                        </Typography.Text></span>

                    <span><Typography.Text style={{fontSize:14}}
                                           className="m-0 p-0 leading-tight text-gray-800 dark:text-gray-400">
                            All Employee Payroll
                        </Typography.Text></span>

                </Flex>
            }
        >
            <Head title="Candidates"/>

            <AttendanceTable data={leavedata} filters={filters} route_redirect={"leaves.index"} columns={columns}/>

        </AuthenticatedLayout>
    );
}

export default Index;
