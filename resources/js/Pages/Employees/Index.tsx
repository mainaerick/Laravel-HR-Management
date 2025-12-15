import React from 'react';
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Col, Flex, Row, Typography} from "antd";
import EmployeeTable from "@/Pages/Employees/components/EmployeeTable";
import {Employee} from "@/Pages/Employees/core/Model";
import {Department} from "@/Pages/Departments/Core/Model";

type Props = { auth: any, employees: any,filters:any,departments:Department[] }

function Index({auth, employees,filters,departments}: Props) {

    console.log(auth, employees);
    return (
        <AuthenticatedLayout
            header={
                <Flex vertical={true} className={"m-0"}>

                       <span  style={{height:23}}>
                           <Typography.Text style={{fontSize:20}} className="font-semibold m-0 p-0 leading-tight text-gray-800 dark:text-gray-800">
                            All Employees
                        </Typography.Text>
                       </span>

                       <span><Typography.Text style={{fontSize:14}}
                                              className="m-0 p-0 leading-tight text-gray-800 dark:text-gray-400">
                            All Employee Information
                        </Typography.Text></span>

                </Flex>
            }
        >
            <Head title="Employees"/>
            <EmployeeTable data={employees} filters={filters} route_redirect={"employees.index"}  departments={departments} passed_params={{}}/>
        </AuthenticatedLayout>

    );
}

export default Index;
