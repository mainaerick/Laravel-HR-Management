import { useState } from "react";
import { Layout, Menu, Button, Drawer, Row, Col, Flex } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ApartmentOutlined,
    ScheduleOutlined,
    DollarOutlined,
    LaptopOutlined,
    SolutionOutlined,
    ProfileOutlined,
    CarryOutOutlined,
    SettingOutlined,
    BellOutlined
} from "@ant-design/icons";
import { usePage, router } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import HRLogo from "@/Layouts/HRLogo";

const { Header, Sider, Content, Footer } = Layout;

export default function Authenticated({ header, children }) {
    const user = usePage().props.auth.user;
    const { ziggy } = usePage().props;

    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const currentPath = new URL(ziggy.location).pathname.split("/")[1];
    const selectedKey = Object.keys(ziggy.routes).find(key => ziggy.routes[key].uri === currentPath) || "employees";

    const toggleSidebar = () => setCollapsed(!collapsed);
    const toggleDrawer = () => setDrawerVisible(!drawerVisible);

    const onClick = (e) => {
        router.get(route(`${e.key}.index`));
        setDrawerVisible(false);
    };

    const menuItems = [
        { key: "dashboard", icon: <AppstoreOutlined />, label: "Dashboard" },
        { key: "employees", icon: <TeamOutlined />, label: "All Employees" },
        { key: "departments", icon: <ApartmentOutlined />, label: "All Departments" },
        { key: "attendance", icon: <ScheduleOutlined />, label: "Attendance" },
        { key: "payroll", icon: <DollarOutlined />, label: "Payroll" },
        { key: "jobopenings", icon: <LaptopOutlined />, label: "Jobs" },
        { key: "candidates", icon: <SolutionOutlined />, label: "Candidates" },
        { key: "leaves", icon: <ProfileOutlined />, label: "Leaves" },
        { key: "holiday", icon: <CarryOutOutlined />, label: "Holiday" },
        { key: "settings", icon: <SettingOutlined />, label: "Settings" },
    ];

    return (
        <Layout style={{ minHeight: "100vh", background: "#FFFFFF" }}>
            {/* Sidebar for Desktop */}
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={toggleSidebar}
                className="hidden md:block bg-gray-100 m-2 rounded-lg"
            >
                <div className="logo m-3 hidden md:flex" >
                    <HRLogo />
                </div>
                <Menu
                    className="bg-gray-100 pt-6"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={onClick}
                >
                    {menuItems.map(item => (
                        <Menu.Item key={item.key} icon={item.icon}>
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>

            {/* Mobile Sidebar (Drawer) */}
            <Drawer
                title={<HRLogo />}
                placement="left"
                closable
                onClose={toggleDrawer}
                visible={drawerVisible}
                bodyStyle={{ padding: 0 }}
            >
                <Menu mode="inline" selectedKeys={[selectedKey]} onClick={onClick}>
                    {menuItems.map(item => (
                        <Menu.Item key={item.key} icon={item.icon}>
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>
            </Drawer>

            <Layout className="pt-6" style={{ background: "#FFFFFF" }}>
                <Header className="bg-white p-4 flex items-center justify-between">
                    <div className={"flex justify-between  items-center"}>
                        {/* Sidebar Toggle for Mobile */}
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={toggleSidebar}
                            className="hidden md:inline-block"
                        />

                        <Button
                            type="text"
                            icon={<MenuUnfoldOutlined />}
                            onClick={toggleDrawer}
                            className="md:hidden"
                        />

                        <div className="hidden md:flex">{header}</div>
                    </div>



                    <Flex justify="end" align="center">
                        <BellOutlined className="p-2 bg-gray-200 rounded-md text-lg hidden sm:block" />
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="ml-4 flex items-center bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none">
                                    {user.name}
                                    <svg
                                        className="ml-2 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route("profile.edit")}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route("logout")} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </Flex>
                </Header>

                <Content className="p-6">
                    {children}
                </Content>

                <Footer style={{ textAlign: "center", background: "#FFFFFF" }}>
                    HR ©{new Date().getFullYear()} Created by DevRick
                </Footer>
            </Layout>
        </Layout>
    );
}
