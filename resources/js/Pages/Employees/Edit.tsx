import React, {useEffect, useState} from 'react';
import {Button, Card, Flex, Form, message, Space, Tabs, TabsProps, Typography} from "antd";
import PersonalInfoForm from "@/Pages/Employees/components/PersonalInfoForm";
import {FileTextOutlined, LaptopOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import ProfessionalInfoForm from "@/Pages/Employees/components/ProfessionalInfoForm";
import DocumentsForm from "@/Pages/Employees/components/DocumentsForm";
import AccountAccessForm from "@/Pages/Employees/components/AccountAccessForm";
import {Head, router, useForm} from "@inertiajs/react";
import TabPane from "antd/es/tabs/TabPane";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Department} from "@/Pages/Departments/Core/Model";
import {Employee} from "@/Pages/Employees/core/Model";
import dayjs from "dayjs";
type Props = {employee:Employee,departments:Department[]}
const transformEmployeeModel = (employee) => ({
    ...employee,
    date_of_birth: employee.date_of_birth ? dayjs(employee.date_of_birth) : null,
    join_date: employee.join_date ? dayjs(employee.join_date) : null,
    leave_date: employee.leave_date ? dayjs(employee.leave_date) : null,
    created_at: employee.created_at ? dayjs(employee.created_at) : null,
    updated_at: employee.updated_at ? dayjs(employee.updated_at) : null,
    appointment_letter: employee.appointment_letter
        ? [{ uid: '-1', name: 'Appointment Letter', url: employee.appointment_letter, type: 'application/pdf', status: 'done' }]
        : null,
    salary_slips: employee.salary_slips
        ? employee.salary_slips.map((url, index) => ({ uid: `${index}`, name: `Salary Slip ${index + 1}`, url, type: 'application/pdf', status: 'done' }))
        : [],
    reliving_letter: employee.reliving_letter
        ? [{ uid: '-1', name: 'Reliving Letter', url: employee.reliving_letter, type: 'application/pdf', status: 'done' }]
        : [],
    experience_letter: employee.experience_letter
        ? [{ uid: '-1', name: 'Experience Letter', url: employee.experience_letter, type: 'application/pdf', status: 'done' }]
        : [],
});


function Edit({employee,departments}: Props) {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const { data, setData, post, processing, errors } = useForm<Employee|any>({
            ...transformEmployeeModel(employee),
        _method: "PUT",
        }
    )
    const [activeTab, setActiveTab] = useState("1")
    const onTabChange = (activeKey: string) => {
        setActiveTab(activeKey)
    }


    const tabs: TabsProps['items'] = [
        {
            key: '1',
            label: 'Personal Information',
            children: <PersonalInfoForm setData={setData}/>,
            icon: <UserOutlined/>
        },
        {
            key: '2',
            label: 'Professional Information',
            children: <ProfessionalInfoForm departments={departments} setData={setData}/>,
            icon: <LaptopOutlined/>
        },
        {
            key: '3',
            label: 'Documents',
            children: <DocumentsForm onTabChange={onTabChange} employee={transformEmployeeModel(employee)} form={form} data={data} setData={setData}/>,
            icon: <FileTextOutlined/>
        },
        {
            key: '4',
            label: 'Account Access',
            children: <AccountAccessForm onTabChange={onTabChange} setData={setData}/>,
            icon: <LockOutlined/>,

        },
    ];

    const handleNext = () => {
        const fieldNamesForCurrentTab = {
            '1': ['upload',
                'first_name',
                'last_name',
                'phone',
                'email',
                'date_of_birth',
                'marital_status',
                'gender',
                'nationality',
                'address',
                'city',
                'state',
                'zip_code'],
            '2': ['employee_id',
                'user_name',
                'employee_type',
                'work_email',
                'department',
                'designation',
                'working_days',
                'join_date'],
            '3': ['appointment_letter',
                'salary_slips',
                'reliving_letter',
                'experience_letter'],
            '4': ['slack_id',
                'skype_id',
                'git_id'],
        };
        const currentFields = fieldNamesForCurrentTab[activeTab];

        form.validateFields(currentFields)
            .then(() => {
                // Move to the next tab
                const nextTab = (parseInt(activeTab, 10) + 1).toString();
                setActiveTab(nextTab);
            })
            .catch((e) => {
                console.log(e)
                message.error('Please fix the errors before proceeding.');
            });
    };


    const handleSubmit = (values) => {

        console.log(values)
        post(route("employee.update", { id: data.id }),{
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
        //
        //         console.log(values)
        //
        //         values["salary_slip_names"]=values['salary_slips']?.fileList ? values['salary_slips'].fileList.map((file)=>file.name):values['salary_slips'].map((file)=>file.name)
        //         values['appointment_letter']= values['appointment_letter'].file
        //         values['experience_letter']= values['experience_letter'].file
        //         values['reliving_letter']= values['reliving_letter'].file
        //         values['salary_slips']= values['salary_slips']?.fileList?.map((file)=>file?.originFileObj)
        //
        //         router.post(route("employee.update",{id:employee.id}),values,{
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

    useEffect(() => {
        console.log(data)
    }, [data]);
    return (
        <Authenticated header={
            <Flex vertical={true} className={"m-0"}>

                       <span style={{height: 23}}><Typography.Text style={{fontSize: 20}}
                                                                   className="font-semibold m-0 p-0 leading-tight text-gray-800 dark:text-gray-800">
                            Add New Employees
                        </Typography.Text></span>


                <span><Typography.Text style={{fontSize: 14}}
                                       className="m-0 p-0 leading-tight text-gray-800 dark:text-gray-400">
                            {"All Employee > Edit Employee"}
                        </Typography.Text></span>

            </Flex>
        }>
            {contextHolder}
            <Head title="Add Employee"/>
            <Card className={"mr-6"}>
                <Form onFinish={handleSubmit} layout={"vertical"} initialValues={transformEmployeeModel(data)}>
                    <Tabs defaultActiveKey="1" onChange={onTabChange} activeKey={activeTab}>
                        {tabs.map((tab, index) => {
                            return (
                                <TabPane tab={tab.label} key={tab.key}>
                                    {tab.children}
                                    <Flex justify={"end"}>
                                        <Form.Item>
                                            <Space>
                                                <Button style={{width: "100px"}} size={"large"} type="default">
                                                    Cancel
                                                </Button>

                                                {index < tabs.length - 1 && (
                                                    <Button style={{width: "100px"}} size={"large"} type="primary"
                                                            onClick={handleNext}>
                                                        Next
                                                    </Button>
                                                )}
                                                {index === tabs.length - 1 && (
                                                    <Button htmlType={"submit"} style={{width: "100px"}} size={"large"} type="primary"
                                                           >
                                                        Submit
                                                    </Button>
                                                )}

                                            </Space>
                                        </Form.Item>
                                    </Flex>
                                </TabPane>
                            )
                        })}

                    </Tabs>

                </Form>
            </Card>


        </Authenticated>
    );
}

export default Edit;
