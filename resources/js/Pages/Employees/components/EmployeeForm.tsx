import React, {useState} from 'react';
import {Button, Flex, Form, message, Space, Tabs, TabsProps} from "antd";
import TabPane from "antd/es/tabs/TabPane";
import {Employee} from "@/Pages/Employees/core/Model";
import {Department} from "@/Pages/Departments/Core/Model";
import PersonalInfoForm from "@/Pages/Employees/components/PersonalInfoForm";
import {FileTextOutlined, LaptopOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import ProfessionalInfoForm from "@/Pages/Employees/components/ProfessionalInfoForm";
import DocumentsForm from "@/Pages/Employees/components/DocumentsForm";
import AccountAccessForm from "@/Pages/Employees/components/AccountAccessForm";
import {transformEmployeeModel} from "@/Pages/Employees/core/utils";

type Props = {data:Employee,setData:any,departments:Department[],handleSubmit:()=>void}
function EmployeeForm({data,setData,departments,handleSubmit}:Props) {
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
            children: <DocumentsForm employee={transformEmployeeModel(data)} data={data} setData={setData}/>,
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

        // form.validateFields(currentFields)
        //     .then(() => {
        //         // Move to the next tab
        //         const nextTab = (parseInt(activeTab, 10) + 1).toString();
        //         setActiveTab(nextTab);
        //     })
        //     .catch((e) => {
        //         console.log(e)
        //         message.error('Please fix the errors before proceeding.');
        //     });
    };
    return (
        <Form onFinish={handleSubmit} layout={"vertical"} initialValues={data}>
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
    );
}

export default EmployeeForm;
