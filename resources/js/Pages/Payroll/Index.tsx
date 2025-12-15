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
import {Payroll} from "@/Pages/Payroll/Core/Model";

type Props = {
    auth: any, filters:any,data:any
}
function Index({auth,data,filters}:Props) {

    let payroll:Payroll[] = data.data
    const columns: TableColumnsType<Payroll> = [
        {
            title: 'Employee Name',
            dataIndex: 'employee',
            key: 'employee',
            render: (employee) => `${employee.first_name} ${employee.last_name}`,
        },
        {
            title: 'Base Salary',
            dataIndex: 'base_salary',
            key: 'base_salary',
            render: (salary:string):string => `$${Number.parseInt(salary).toFixed(2)}`,
        },
        {
            title: 'Deductions',
            dataIndex: 'deductions',
            key: 'deductions',
            render: (deductions) => `$${Number.parseInt(deductions).toFixed(2)}`,
        },
        {
            title: 'Net Salary',
            dataIndex: 'net_salary',
            key: 'net_salary',
            render: (salary) => `$${Number.parseInt(salary).toFixed(2)}`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = status === 'completed' ? 'green' : 'orange';
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
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
                           Payroll
                        </Typography.Text></span>

                    <span><Typography.Text style={{fontSize:14}}
                                           className="m-0 p-0 leading-tight text-gray-800 dark:text-gray-400">
                            All Employee Payroll
                        </Typography.Text></span>

                </Flex>
            }
        >
            <Head title="Payroll"/>

            <AttendanceTable data={data} filters={filters} route_redirect={"payroll.index"} columns={columns}/>

        </AuthenticatedLayout>
    );
}

export default Index;
