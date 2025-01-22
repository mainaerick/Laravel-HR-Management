import React, {useState} from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Button, Card, Flex, Form, message, Space, Tabs, TabsProps, Typography} from "antd";
import {Head, router, useForm} from "@inertiajs/react";
import {FileTextOutlined, LaptopOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import PersonalInfoForm from "@/Pages/Employees/components/PersonalInfoForm";
import ProfessionalInfoForm from "@/Pages/Employees/components/ProfessionalInfoForm";
import DocumentsForm from "@/Pages/Employees/components/DocumentsForm";
import AccountAccessForm from "@/Pages/Employees/components/AccountAccessForm";
import TabPane from "antd/es/tabs/TabPane";
import {Department} from "@/Pages/Departments/Core/Model";
import EmployeeForm from "@/Pages/Employees/components/EmployeeForm";
import {Employee} from "@/Pages/Employees/core/Model";
import {transformEmployeeModel} from "@/Pages/Employees/core/utils";


type Props = { departments: Department[] }

function Create({departments}: Props) {
    const [messageApi, contextHolder] = message.useMessage();

    const { data, setData, post, processing, errors }:any = useForm<Employee|any>({
            _method: "POST",
        }
    )
    const [activeTab, setActiveTab] = useState("1")
    const onTabChange = (activeKey: string) => {
        setActiveTab(activeKey)
    }

    const handleSubmit = () => {

        console.log(data)
        // const salaryslipsfilenames = data.salary_slips.map((file) => file.name)
        setData("salary_slip_names", data.salary_slips.map((file) => file.name));
        // setData("appointment_letter", values['appointment_letter'].file);
        // setData("experience_letter", values['experience_letter'].file);
        // setData("reliving_letter", values['reliving_letter'].file);
        // setData("salary_slips", values['salary_slips'].fileList.map((file) => file.originFileObj));

        post(route("employee.store"),{
            onSuccess: () => {
                messageApi.open({
                    type: "success",
                    content: "Product Updated",
                });
            },
            onProgress: () => {
                // setLoading(true);
                messageApi.open({
                    type: "loading",
                    content: "Product Updating..",
                });
            },
            onError: (e) => {
                console .log(e)
                messageApi.open({
                    type: "error",
                    content: "An error occurred",
                });
            },
            onFinish: () => {
                // setLoading(false);
            },
        })

        // form.validateFields()
        //     .then((values) => {
        //         values["salary_slip_names"] = values['salary_slips'].fileList.map((file) => file.name)
        //         values['appointment_letter'] = values['appointment_letter'].file
        //         values['experience_letter'] = values['experience_letter'].file
        //         values['reliving_letter'] = values['reliving_letter'].file
        //         values['salary_slips'] = values['salary_slips'].fileList.map((file) => file.originFileObj)
        //
        //         router.post(route("employee.store"), values, {
        //             onSuccess: () => {
        //                 message.success('Form submitted successfully!');
        //             },
        //             onError: (errors) => {
        //                 message.error('Please fix the errors before submitting.');
        //                 console.log(errors);
        //             },
        //         })
        //     })
        //     .catch((e) => {
        //         console.log(e)
        //         message.error('Please fix the errors before submitting.');
        //     });
    };
    return (
        <Authenticated header={
            <Flex vertical={true} className={"m-0"}>

                       <span style={{height: 23}}>
                           <Typography.Text style={{fontSize: 20}} className="font-semibold m-0 p-0 leading-tight text-gray-800 dark:text-gray-800">
                            Add New Employees
                        </Typography.Text>
                       </span>


                <span>
                    <Typography.Text style={{fontSize: 14}} className="m-0 p-0 leading-tight text-gray-800 dark:text-gray-400">
                            {"All Employee > Add New Employee"}
                        </Typography.Text>
                </span>

            </Flex>
        }>
            <Head title="Add Employee"/>
            <Card className={"mr-6"}>
                <EmployeeForm data={data} setData={setData} departments={departments} handleSubmit={handleSubmit}/>
            </Card>

        </Authenticated>
    );
}

export default Create;
