import React from 'react';
import {Department} from "@/Pages/Departments/Core/Model";
import {Avatar, Card, Col, Flex, Input, List, Row, Space, Typography} from "antd";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {SearchOutlined} from "@ant-design/icons";
import {Head, Link, router} from "@inertiajs/react";
import Meta from "antd/es/card/Meta";
import {Employee} from "@/Pages/Employees/core/Model";
import EmployeeTable from "@/Pages/Employees/components/EmployeeTable";

type Props = {
    auth: any, filters:any,data:any
}
function Index({auth,data,filters}:Props) {

    // let departments:Department[] = data.data

    console.log(data)
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
        </AuthenticatedLayout>
    );
}

export default Index;
