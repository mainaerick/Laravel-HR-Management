import React, {useState} from 'react';
import {Employee} from "@/Pages/Employees/core/Model";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Card, Col, ConfigProvider, GetProp, Menu, MenuProps, Row, Tabs, TabsProps} from "antd";
import PersonalInfoForm from "@/Pages/Employees/components/PersonalInfoForm";
import {FileTextOutlined, LaptopOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import ProfessionalInfoForm from "@/Pages/Employees/components/ProfessionalInfoForm";
import DocumentsForm from "@/Pages/Employees/components/DocumentsForm";
import AccountAccessForm from "@/Pages/Employees/components/AccountAccessForm";
import ShowPersonalInfo from "@/Pages/Employees/components/ShowPersonalInfo";
import TabPane from "antd/es/tabs/TabPane";
import ShowProfessionalInfo from "@/Pages/Employees/components/ShowProfessionalInfo";
import ShowAccountAccess from "@/Pages/Employees/components/ShowAccountAccess";
import ShowDocuments from "@/Pages/Employees/components/ShowDocuments";
import ShowAttendance from "@/Pages/Employees/components/ShowAttendance";
import ShowProjects from "@/Pages/Employees/components/ShowProjects";
import ShowLeave from "@/Pages/Employees/components/ShowLeave";


type Props = {
    employee: Employee
}
type MenuItem = GetProp<MenuProps, 'items'>[number];

function Show({employee}: Props) {
    const [selectedSideMenuKey, setSelectedSideMenuKey] = useState("1")
    const tabs: TabsProps['items'] = [
        {
            key: '1',
            label: 'Personal Information',
            children: <ShowPersonalInfo employee={employee}/>,
            icon: <UserOutlined/>
        },
        {
            key: '2',
            label: 'Professional Information',
            children: <ShowProfessionalInfo employee={employee}/>,
            icon: <LaptopOutlined/>
        },
        {
            key: '3',
            label: 'Documents',
            children: <ShowDocuments employee={employee}/>,
            icon: <FileTextOutlined/>
        },
        {
            key: '4',
            label: 'Account Access',
            children: <ShowAccountAccess employee={employee}/>,
            icon: <LockOutlined/>,

        },
    ];
    const [activeTab, setActiveTab] = useState("1")
    const onTabChange = (activeKey: string) => {
        setActiveTab(activeKey)
    }
    const sidetabs: any[] = [
        {
            key: '1',
            label: 'Profile',
            children: <Tabs defaultActiveKey="1" onChange={onTabChange} activeKey={activeTab}>
                {tabs.map((tab, index) => {
                    return (
                        <TabPane tab={tab.label} key={tab.key}>
                            {tab.children}</TabPane>
                    )
                })
                }
            </Tabs>,
            icon: <UserOutlined/>
        },
        {
            key: '2',
            label: 'Attendance',
            children: <ShowAttendance/>,
            icon: <LaptopOutlined/>
        },
        {
            key: '3',
            label: 'Projects',
            children: <ShowProjects/>,
            icon: <FileTextOutlined/>
        },
        {
            key: '4',
            label: 'Leave',
            children: <ShowLeave/>,
            icon: <LockOutlined/>,

        },
    ];

    const onClickMenuItem = ({item, key, keyPath, domEvent}) => {
        setSelectedSideMenuKey(key)
    }
    const activeComponent = sidetabs.find((tab) => tab.key === selectedSideMenuKey)?.children;
    return (
        <Authenticated>
            <Card className={"mr-6"}>
                <Row gutter={12}>
                    <Col span={8}>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Menu: {
                                        itemActiveBg: "#7152F3",
                                        itemSelectedBg: "#7152F3",
                                        itemSelectedColor: "#fff"
                                    },
                                },
                            }}
                        >
                            <Menu
                                style={{width: "100%", height: "100%"}}
                                defaultSelectedKeys={['1']}
                                items={sidetabs.map(({key, label}) => ({key, label}))}
                                onClick={onClickMenuItem}
                            /></ConfigProvider>
                    </Col>
                    <Col span={16}>
                        {activeComponent}
                    </Col>

                </Row>

            </Card>
        </Authenticated>
    );
}

export default Show;
