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
import {JobOpening} from "@/Pages/JobOpenings/Core/Model";
import {ColumnsType} from "antd/es/table";
import JobsListing from "@/Pages/JobOpenings/Components/JobsListing";

type Props = {
    auth: any, filters:any,data:any,departments:Department[],jobOpening:JobOpening

}
function Index({auth,data,filters,departments,jobOpening}:Props) {

    let jobs:JobOpening[] = data?.data

    console.log(data)
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

            <JobsListing groupeddata={data} filters={filters} departments={departments} jobOpening={jobOpening}/>

        </AuthenticatedLayout>
    );
}

export default Index;
