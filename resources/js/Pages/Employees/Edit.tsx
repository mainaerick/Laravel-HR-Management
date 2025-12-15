import React from 'react';
import {Card, Flex, Form, message, Typography} from "antd";
import {Head, useForm} from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Department} from "@/Pages/Departments/Core/Model";
import {Employee} from "@/Pages/Employees/core/Model";
import EmployeeForm from "@/Pages/Employees/components/EmployeeForm";
import {transformEmployeeModel} from "@/Pages/Employees/core/utils";

type Props = {employee:Employee,departments:Department[]}

function Edit({employee,departments}: Props) {
    const [messageApi, contextHolder] = message.useMessage();
    const { data, setData, post, processing, errors }:any = useForm<Employee|any>({
            ...transformEmployeeModel(employee),
            _method: "PUT",
        }
    )


    const handleSubmit = () => {
        const salaryslipsfilenames = data.salary_slips.map((file:any) => file.name)
        setData("salary_slip_names", salaryslipsfilenames);
        post(route("employee.update", { id: data.id }),{
            onSuccess: () => {
                messageApi.open({
                    type: "success",
                    content: "Eployee Updated",
                });
            },
            onProgress: () => {
                // setLoading(true);
                messageApi.open({
                    type: "loading",
                    content: "Employee Updating...",
                });
            },
            onError: (e:any) => {
                messageApi.open({
                    type: "error",
                    content: "An error occurred",
                });
            },
            onFinish: () => {
                // setLoading(false);
            },
        })
    };
    return (
        <Authenticated header={
            <Flex vertical={true} className={"m-0"}>

                       <span style={{height: 23}}>
                           <Typography.Text style={{fontSize: 20}}
                                            className="font-semibold m-0 p-0 leading-tight text-gray-800 dark:text-gray-800">
                            Add New Employees
                        </Typography.Text></span>


                <span>
                    <Typography.Text style={{fontSize: 14}}
                                       className="m-0 p-0 leading-tight text-gray-800 dark:text-gray-400">
                            {"All Employee > Edit Employee"}
                        </Typography.Text>
                </span>

            </Flex>
        }>
            {contextHolder}
            <Head title="Add Employee"/>
            <Card className={"mr-6"}>
                <EmployeeForm data={data} departments={departments} handleSubmit={handleSubmit} setData={setData}/>
            </Card>


        </Authenticated>
    );
}

export default Edit;
