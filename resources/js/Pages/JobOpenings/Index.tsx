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
    auth: any, filters:any,data:any,departments:Department[]

}
function Index({auth,data,filters,departments}:Props) {

    let jobs:JobOpening[] = data.data
    const columns: ColumnsType<JobOpening> = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Department",
            dataIndex: ["department", "name"],
            key: "department",
            render: (text) => text || "N/A",
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
            render: (text) => text || "Remote",
        },
        {
            title: "Salary",
            dataIndex: "salary",
            key: "salary",
            render: (salary) => (salary ? `KSH ${Number.parseInt(salary).toFixed(2)}` : "Not specified"),
        },
        {
            title: "Employment Type",
            dataIndex: "employment_type",
            key: "employment_type",
        },
    ];
    let queryParams = {
        per_page: data.per_page,
        page: data.current_page,
        search: filters.search,
    }
    const onSearch = (e) => {
        const value = e.target.value
        if (value) {
            queryParams.search = value
            router.get(route("departments.index"), queryParams,);
        }
    }
    const onSearchClear = () => {
        delete queryParams.search
        router.get(route("departments.index"), queryParams,);
    }

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

            <JobsListing data={data} filters={filters} departments={departments}/>

        </AuthenticatedLayout>
    );
}

export default Index;
