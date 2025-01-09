import React, {useState} from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Button, Card, Flex, Form, message, Space, Tabs, TabsProps, Typography} from "antd";
import {Head, router} from "@inertiajs/react";
import {FileTextOutlined, LaptopOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import PersonalInfoForm from "@/Pages/Employees/components/PersonalInfoForm";
import ProfessionalInfoForm from "@/Pages/Employees/components/ProfessionalInfoForm";
import DocumentsForm from "@/Pages/Employees/components/DocumentsForm";
import AccountAccessForm from "@/Pages/Employees/components/AccountAccessForm";
import TabPane from "antd/es/tabs/TabPane";
import {Department} from "@/Pages/Departments/Core/Model";


type Props = {departments:Department[]}

function Create({departments}: Props) {
    const [form] = Form.useForm();

    const [activeTab, setActiveTab] = useState("1")
    const onTabChange = (activeKey: string) => {
        setActiveTab(activeKey)
    }


    const tabs: TabsProps['items'] = [
        {
            key: '1',
            label: 'Personal Information',
            children: <PersonalInfoForm/>,
            icon: <UserOutlined/>
        },
        {
            key: '2',
            label: 'Professional Information',
            children: <ProfessionalInfoForm departments={departments}/>,
            icon: <LaptopOutlined/>
        },
        {
            key: '3',
            label: 'Documents',
            children: <DocumentsForm onTabChange={onTabChange}/>,
            icon: <FileTextOutlined/>
        },
        {
            key: '4',
            label: 'Account Access',
            children: <AccountAccessForm onTabChange={onTabChange}/>,
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
            .catch(() => {
                message.error('Please fix the errors before proceeding.');
            });
    };

    const handleSubmit = () => {
        form.validateFields()
            .then((values) => {
                values["salary_slip_names"]=values['salary_slips'].fileList.map((file)=>file.name)
                values['appointment_letter']= values['appointment_letter'].file
                values['experience_letter']= values['experience_letter'].file
                values['reliving_letter']= values['reliving_letter'].file
                values['salary_slips']= values['salary_slips'].fileList.map((file)=>file.originFileObj)

                router.post(route("employee.store"),values,{
                    onSuccess: () => {
                        message.success('Form submitted successfully!');
                    },
                    onError: (errors) => {
                        message.error('Please fix the errors before submitting.');
                        console.log(errors);
                    },
                })
            })
            .catch((e) => {
                console.log(e)
                message.error('Please fix the errors before submitting.');
            });
    };
    return (
        <Authenticated header={
            <Flex vertical={true} className={"m-0"}>

                       <span style={{height: 23}}><Typography.Text style={{fontSize: 20}}
                                                                   className="font-semibold m-0 p-0 leading-tight text-gray-800 dark:text-gray-800">
                            Add New Employees
                        </Typography.Text></span>


                <span><Typography.Text style={{fontSize: 14}}
                                       className="m-0 p-0 leading-tight text-gray-800 dark:text-gray-400">
                            {"All Employee > Add New Employee"}
                        </Typography.Text></span>

            </Flex>
        }>
            <Head title="Add Employee"/>
            <Card className={"mr-6"}>
                <Form form={form}  layout={"vertical"}>
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
                                                    <Button style={{width: "100px"}} size={"large"} type="primary"
                                                            onClick={handleSubmit}>
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

export default Create;
