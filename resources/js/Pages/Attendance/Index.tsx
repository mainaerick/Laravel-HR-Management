import React from 'react';
import {Department} from "@/Pages/Departments/Core/Model";
import {Avatar, Card, Col, Flex, Input, List, Row, Space, TableColumnsType, Tag, Typography} from "antd";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {SearchOutlined} from "@ant-design/icons";
import {Head, Link, router} from "@inertiajs/react";
import Meta from "antd/es/card/Meta";
import {Employee} from "@/Pages/Employees/core/Model";
import EmployeeTable from "@/Pages/Employees/components/EmployeeTable";
import AttendanceTable from "@/Pages/Attendance/Components/AttendanceTable";
import {Attendance} from "@/Pages/Attendance/Core/Model";

type Props = {
    auth: any, filters:any,data:any
}
function Index({auth,data,filters}:Props) {

    let attendances:Attendance[] = data.data

    const columns: TableColumnsType<Attendance> = [
        {
            title: 'Employee Name',
            dataIndex: 'employee',
            key: 'employee',
            render: (employee: any) => `${employee.first_name} ${employee.last_name}`,
        },
        {
            title: 'Designation',
            dataIndex: 'employee',
            key: 'designation',
            render: (employee: Employee) => `${employee?.designation}`,
        },
        {
            title: 'Type',
            dataIndex: 'employee',
            key: 'type',
            render: (employee: Employee) => `${employee?.location_type}`,
        },
        {
            title: 'Check-In Time',
            dataIndex: 'check_in_time',
            key: 'check_out_time',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color = 'green';
                if (status === 'late') color = 'orange';
                if (status === 'absent') color = 'red';
                return <Tag color={color}>{status}</Tag>;
            },
        },
    ];

    let queryParams = {
        per_page: data.per_page,
        page: data.current_page,
        search: filters.search,
    }

    return (
        <AuthenticatedLayout
            header={
                <Flex vertical={true} className={"m-0"}>

                       <span  style={{height:23}}><Typography.Text style={{fontSize:20}} className="font-semibold m-0 p-0 leading-tight text-gray-800 dark:text-gray-800">
                           Attendance
                        </Typography.Text></span>

                    <span><Typography.Text style={{fontSize:14}}
                                           className="m-0 p-0 leading-tight text-gray-800 dark:text-gray-400">
                            All Employee Attendance
                        </Typography.Text></span>

                </Flex>
            }
        >
            <Head title="Attendance"/>

            <AttendanceTable data={data} filters={filters} route_redirect={"attendance.index"} columns={columns}/>

        </AuthenticatedLayout>
    );
}

export default Index;
