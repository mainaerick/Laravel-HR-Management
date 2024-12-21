import React, {useState} from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Card, Flex, Tabs, TabsProps, Typography} from "antd";
import {Head} from "@inertiajs/react";
import {FileTextOutlined, LaptopOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import PersonalInfoForm from "@/Pages/Employees/components/PersonalInfoForm";
import ProfessionalInfoForm from "@/Pages/Employees/components/ProfessionalInfoForm";
import DocumentsForm from "@/Pages/Employees/components/DocumentsForm";
import AccountAccessForm from "@/Pages/Employees/components/AccountAccessForm";


type Props={}
function Create({}:Props ) {

    const [activeTab, setActiveTab] = useState("1")
    const onTabChange=(activeKey: string)=>{

        console.log(activeKey)
        setActiveTab(activeKey)
    }


    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Personal Information',
            children: <PersonalInfoForm onTabChange={onTabChange}/>,
            icon:<UserOutlined/>
        },
        {
            key: '2',
            label: 'Professional Information',
            children: <ProfessionalInfoForm onTabChange={onTabChange}/>,
            icon: <LaptopOutlined />
        },
        {
            key: '3',
            label: 'Documents',
            children: <DocumentsForm onTabChange={onTabChange}/>,
            icon: <FileTextOutlined />
        },
        {
            key: '4',
            label: 'Account Access',
            children: <AccountAccessForm onTabChange={onTabChange}/>,
            icon:<LockOutlined />,

        },
    ];


    return (
        <Authenticated header={
            <Flex vertical={true} className={"m-0"}>

                       <span  style={{height:23}}><Typography.Text style={{fontSize:20}} className="font-semibold m-0 p-0 leading-tight text-gray-800 dark:text-gray-800">
                            Add New Employees
                        </Typography.Text></span>


                <span><Typography.Text style={{fontSize:14}}
                                       className="m-0 p-0 leading-tight text-gray-800 dark:text-gray-400">
                            {"All Employee > Add New Employee"}
                        </Typography.Text></span>

            </Flex>
        }>
            <Head title="Add Employee"/>
            <Card className={"mr-6"}>
                <Tabs defaultActiveKey="1" onChange={onTabChange} activeKey={activeTab} items={items} />
            </Card>


        </Authenticated>
    );
}

export default Create;
