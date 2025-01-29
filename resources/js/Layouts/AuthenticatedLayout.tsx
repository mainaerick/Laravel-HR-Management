import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import {Link, router, usePage} from "@inertiajs/react";
import React, {PropsWithChildren, ReactNode, useState} from "react";
import {Content, Header, Footer} from "antd/es/layout/layout";
import {Breadcrumb, Button, Col, Flex, Layout, Menu, MenuProps, Row, theme} from "antd";
import Sider from "antd/es/layout/Sider";
import {
    ApartmentOutlined,
    AppstoreOutlined, BellOutlined,
    CalendarOutlined,
    CarryOutOutlined,
    DollarOutlined,
    LaptopOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProfileOutlined,
    RightCircleOutlined,
    ScheduleOutlined,
    SettingOutlined,
    SolutionOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import Icon from "antd/es/icon";
import SubMenu from "antd/es/menu/SubMenu";
import NavLink from "@/Components/NavLink";
import HRLogo from "@/Layouts/HRLogo";

const items = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    UserOutlined,
].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
}));
export default function Authenticated({
                                          header,
                                          children,
                                      }: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const { ziggy } = usePage().props; // Ensure Ziggy routes are available
    const [collapsed, setCollapsed] = useState<boolean>();

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const currentPath = new URL(ziggy.location).pathname.split("/")[1]; // Extract first segment

// Match currentPath with available routes to get the selected key
    const routeKeys = Object.keys(ziggy.routes);
    const matchedKey = routeKeys.find(key => ziggy.routes[key].uri === currentPath) || "employees";
    const extractedKey = matchedKey.split(".")[0]; // Extract module name (e.g., "employees" from "employees.index")
    const [selectedKey, setSelectedKey] = useState(extractedKey || "employees");

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const onCollapse = (collapsed) => {
        setCollapsed(collapsed);
    };

    const onPageTitleDesc = (title: string, desc: string) => {
    };
    const onClick: MenuProps['onClick'] = (e) => {
        router.get(route(`${e.key}.index`))
    };
    return (
        // <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        //     <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
        //         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        //             <div className="flex h-16 justify-between">
        //                 <div className="flex">
        //                     <div className="flex shrink-0 items-center">
        //                         <Link href="/">
        //                             <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
        //                         </Link>
        //                     </div>
        //
        //                     <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
        //                         <NavLink
        //                             href={route('dashboard')}
        //                             active={route().current('dashboard')}
        //                         >
        //                             Dashboard
        //                         </NavLink>
        //                     </div>
        //                 </div>
        //
        //                 <div className="hidden sm:ms-6 sm:flex sm:items-center">
        //                     <div className="relative ms-3">
        //                         <Dropdown>
        //                             <Dropdown.Trigger>
        //                                 <span className="inline-flex rounded-md">
        //                                     <button
        //                                         type="button"
        //                                         className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
        //                                     >
        //                                         {user.name}
        //
        //                                         <svg
        //                                             className="-me-0.5 ms-2 h-4 w-4"
        //                                             xmlns="http://www.w3.org/2000/svg"
        //                                             viewBox="0 0 20 20"
        //                                             fill="currentColor"
        //                                         >
        //                                             <path
        //                                                 fillRule="evenodd"
        //                                                 d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        //                                                 clipRule="evenodd"
        //                                             />
        //                                         </svg>
        //                                     </button>
        //                                 </span>
        //                             </Dropdown.Trigger>
        //
        //                             <Dropdown.Content>
        //                                 <Dropdown.Link
        //                                     href={route('profile.edit')}
        //                                 >
        //                                     Profile
        //                                 </Dropdown.Link>
        //                                 <Dropdown.Link
        //                                     href={route('logout')}
        //                                     method="post"
        //                                     as="button"
        //                                 >
        //                                     Log Out
        //                                 </Dropdown.Link>
        //                             </Dropdown.Content>
        //                         </Dropdown>
        //                     </div>
        //                 </div>
        //
        //                 <div className="-me-2 flex items-center sm:hidden">
        //                     <button
        //                         onClick={() =>
        //                             setShowingNavigationDropdown(
        //                                 (previousState) => !previousState,
        //                             )
        //                         }
        //                         className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
        //                     >
        //                         <svg
        //                             className="h-6 w-6"
        //                             stroke="currentColor"
        //                             fill="none"
        //                             viewBox="0 0 24 24"
        //                         >
        //                             <path
        //                                 className={
        //                                     !showingNavigationDropdown
        //                                         ? 'inline-flex'
        //                                         : 'hidden'
        //                                 }
        //                                 strokeLinecap="round"
        //                                 strokeLinejoin="round"
        //                                 strokeWidth="2"
        //                                 d="M4 6h16M4 12h16M4 18h16"
        //                             />
        //                             <path
        //                                 className={
        //                                     showingNavigationDropdown
        //                                         ? 'inline-flex'
        //                                         : 'hidden'
        //                                 }
        //                                 strokeLinecap="round"
        //                                 strokeLinejoin="round"
        //                                 strokeWidth="2"
        //                                 d="M6 18L18 6M6 6l12 12"
        //                             />
        //                         </svg>
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //
        //         <div
        //             className={
        //                 (showingNavigationDropdown ? 'block' : 'hidden') +
        //                 ' sm:hidden'
        //             }
        //         >
        //             <div className="space-y-1 pb-3 pt-2">
        //                 <ResponsiveNavLink
        //                     href={route('dashboard')}
        //                     active={route().current('dashboard')}
        //                 >
        //                     Dashboard
        //                 </ResponsiveNavLink>
        //             </div>
        //
        //             <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
        //                 <div className="px-4">
        //                     <div className="text-base font-medium text-gray-800 dark:text-gray-200">
        //                         {user.name}
        //                     </div>
        //                     <div className="text-sm font-medium text-gray-500">
        //                         {user.email}
        //                     </div>
        //                 </div>
        //
        //                 <div className="mt-3 space-y-1">
        //                     <ResponsiveNavLink href={route('profile.edit')}>
        //                         Profile
        //                     </ResponsiveNavLink>
        //                     <ResponsiveNavLink
        //                         method="post"
        //                         href={route('logout')}
        //                         as="button"
        //                     >
        //                         Log Out
        //                     </ResponsiveNavLink>
        //                 </div>
        //             </div>
        //         </div>
        //     </nav>
        //
        //     {header && (
        //         <header className="bg-white shadow dark:bg-gray-800">
        //             <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        //                 {header}
        //             </div>
        //         </header>
        //     )}
        //
        //     <main>{children}</main>
        //
        // </div>

        <Layout style={{minHeight: "100vh", background: "#FFFFFF"}}>
            <Sider
                trigger={null}
                className={"bg-gray-100 ms-2 mt-6 mb-6"}
                style={{borderRadius: 20}}
                theme={"light"}
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
            >
                <div className="logo mt-6 ">
                    <HRLogo/>
                </div>
                <Menu
                    className={"bg-gray-100 pt-6"}
                    style={{border: "0px"}}
                    defaultSelectedKeys={[selectedKey]}
                    onClick={onClick}
                    mode="inline"
                >
                    <Menu.Item key="dashboard">
                        <AppstoreOutlined/>
                        <span>Dashboard</span>
                    </Menu.Item>
                    <Menu.Item key="employees">
                        <TeamOutlined/>
                        <span>All Employees</span>
                    </Menu.Item>
                    <Menu.Item key="departments">
                        <ApartmentOutlined/>
                        <span>All Departments</span>
                    </Menu.Item>
                    <Menu.Item key="attendance">
                        <ScheduleOutlined/>
                        <span>Attendance</span>
                    </Menu.Item>
                    <Menu.Item key="payroll">
                        <DollarOutlined/>
                        <span>Payroll</span>
                    </Menu.Item>
                    <Menu.Item key="jobs">
                        <LaptopOutlined/>
                        <span>Jobs</span>
                    </Menu.Item>
                    <Menu.Item key="candidates">
                        <SolutionOutlined/>
                        <span>Candidates</span>
                    </Menu.Item>
                    <Menu.Item key="leaves">
                        <ProfileOutlined/>
                        <span>Leaves</span>
                    </Menu.Item>
                    <Menu.Item key="holiday">
                        <CarryOutOutlined/>
                        <span>Holiday</span>
                    </Menu.Item>
                    <Menu.Item key="settings">
                        <SettingOutlined/>
                        <span>Settings</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className={"pt-6"} style={{background: "#FFFFFF"}}>
                <Header style={{background: "#ffff",paddingTop:0,  paddingLeft:0}}>
                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                        <Col span={12}><Row>
                            <Col><Button
                                type="text"
                                icon={
                                    collapsed ? (
                                        <MenuUnfoldOutlined/>
                                    ) : (
                                        <MenuFoldOutlined/>
                                    )
                                }
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: "16px",
                                    width: 64,
                                    height: 64,
                                }}
                            /></Col>

                            <Col  className={"hidden sm:flex "} > {header && (

                                <span>{header}</span>

                            )}</Col>
                        </Row>
                        </Col>
                        <Col span={12}>
                            <Flex justify={"end"} align={"flex-end"} vertical={false}>
                                <div className={"hidden sm:flex "} ><div><BellOutlined className={"p-2 m-0 bg-gray-200"}  style={{ fontSize: '18px', border:"1 black", borderRadius:6  }}  /></div> </div>
                                <div className="hidden sm:ms-6 sm:flex sm:items-center">
                                    <div className="relative ms-3">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                                 <span className="inline-flex rounded-md">
                                             <button
                                                 type="button"
                                                 className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-white border-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                             >
                                                                         {user.name}

                                                 <svg
                                                     className="-me-0.5 ms-2 h-4 w-4"
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
                                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route('profile.edit')}
                                                >
                                                    Profile
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>

                            </Flex>
                        </Col>
                    </Row>

                    {" "}


                </Header>
                <Content className={"ps-6 pt-8"} >


                    {children}
                </Content>
                <Footer style={{textAlign: "center", background: "#FFFFFF"}}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
}
