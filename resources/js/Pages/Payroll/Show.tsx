import React from 'react';
import {Flex, Typography} from "antd";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Department} from "@/Pages/Departments/Core/Model";
import {Employee} from "@/Pages/Employees/core/Model";
import EmployeeTable from "@/Pages/Employees/components/EmployeeTable";
import {PaginatedData} from "@/Core/Models";

type Props = {
    department:Department,
    employees:PaginatedData,filters:any,
}
function Show({department,employees,filters}:Props) {
    return (
        <AuthenticatedLayout
            header={
                <Flex vertical={true} className={"m-0"}>

                       <span  style={{height:23}}><Typography.Text style={{fontSize:20}} className="font-semibold m-0 p-0 leading-tight text-gray-800 dark:text-gray-800">
                            {`${department.name}`}
                        </Typography.Text></span>

                    <span><Typography.Text style={{fontSize:14}}
                                           className="m-0 p-0 leading-tight text-gray-800 dark:text-gray-400">
                            {`All Departments > ${department.name}`}
                        </Typography.Text></span>

                </Flex>
            }
        >

        </AuthenticatedLayout>
    );
}

export default Show;
