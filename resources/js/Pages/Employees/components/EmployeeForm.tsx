import React, { useState } from 'react';
import { Button, Flex, Form, Space, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { Employee } from "@/Pages/Employees/core/Model";
import { Department } from "@/Pages/Departments/Core/Model";
import PersonalInfoForm from "@/Pages/Employees/components/PersonalInfoForm";
import { FileTextOutlined, LaptopOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import ProfessionalInfoForm from "@/Pages/Employees/components/ProfessionalInfoForm";
import DocumentsForm from "@/Pages/Employees/components/DocumentsForm";
import AccountAccessForm from "@/Pages/Employees/components/AccountAccessForm";
import { transformEmployeeModel } from "@/Pages/Employees/core/utils";

type Props = {
    data: Employee,
    setData: any,
    departments: Department[],
    handleSubmit: () => void
};

export default function EmployeeForm({ data, setData, departments, handleSubmit }: Props) {

    const [activeTab, setActiveTab] = useState("1");

    const onTabChange = (activeKey: string) => {
        setActiveTab(activeKey);
    };

    const tabs = [
        {
            key: '1',
            label: 'Personal Information',
            children: <PersonalInfoForm setData={setData} />,
            icon: <UserOutlined />
        },
        {
            key: '2',
            label: 'Professional Information',
            children: <ProfessionalInfoForm departments={departments} setData={setData} />,
            icon: <LaptopOutlined />
        },
        {
            key: '3',
            label: 'Documents',
            children: <DocumentsForm employee={transformEmployeeModel(data)} data={data} setData={setData} />,
            icon: <FileTextOutlined />
        },
        {
            key: '4',
            label: 'Account Access',
            children: <AccountAccessForm onTabChange={onTabChange} setData={setData} />,
            icon: <LockOutlined />
        },
    ];

    const goNext = () => {
        const next = (parseInt(activeTab) + 1).toString();
        setActiveTab(next);
    };

    return (
        <Form onFinish={handleSubmit} layout={"vertical"} initialValues={data}>
            <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={onTabChange}>
                {tabs.map((tab, index) => (
                    <TabPane tab={tab.label} key={tab.key}>
                        {tab.children}

                        <Flex justify={"end"}>
                            <Form.Item>
                                <Space>
                                    <Button style={{ width: "100px" }} size="large">
                                        Cancel
                                    </Button>

                                    {index < tabs.length - 1 && (
                                        <Button
                                            style={{ width: "100px" }}
                                            size="large"
                                            type="primary"
                                            onClick={goNext}
                                        >
                                            Next
                                        </Button>
                                    )}

                                    {index === tabs.length - 1 && (
                                        <Button
                                            htmlType="submit"
                                            style={{ width: "100px" }}
                                            size="large"
                                            type="primary"
                                        >
                                            Submit
                                        </Button>
                                    )}
                                </Space>
                            </Form.Item>
                        </Flex>
                    </TabPane>
                ))}
            </Tabs>
        </Form>
    );
}
