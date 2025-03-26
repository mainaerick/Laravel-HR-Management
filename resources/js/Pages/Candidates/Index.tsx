import React from 'react';
import {Flex, TableColumnsType, Tag, Typography} from "antd";
import {Head} from "@inertiajs/react";
import AttendanceTable from "@/Pages/Attendance/Components/AttendanceTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {PaginatedData} from "@/Core/Models";

type Props={
    data:PaginatedData
    ,filters:any
}
function Index({data,filters}:Props) {
    const columns: TableColumnsType<Candidate> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Application Date",
            dataIndex: "application_date",
            key: "application_date",
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let color = status === 'selected' ? 'green' : status === 'in-process' ? 'orange' : 'red';
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
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

            <AttendanceTable data={data} filters={filters} route_redirect={"candidates.index"} columns={columns}/>

        </AuthenticatedLayout>
    );
}

export default Index;
