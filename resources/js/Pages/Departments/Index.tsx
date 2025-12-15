import React from 'react';
import {Department} from "@/Pages/Departments/Core/Model";
import {Avatar, Card, Col, Flex, Input, List, Row, Space, Typography} from "antd";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {SearchOutlined} from "@ant-design/icons";
import {Head, Link, router} from "@inertiajs/react";
import Meta from "antd/es/card/Meta";
import {Employee} from "@/Pages/Employees/core/Model";
import EmployeeTable from "@/Pages/Employees/components/EmployeeTable";

type Props = {
    auth: any, filters:any,data:any
}
function Index({auth,data,filters}:Props) {
    let departments:Department[] = data.data
    let queryParams = {
        per_page: data.per_page,
        page: data.current_page,
        search: filters.search,
    }
    const onSearch = (e:any) => {
        const value = e.target.value
        if (value) {
            queryParams.search = value
            router.get(route("departments.index"), queryParams,);
        }
    }
    const onSearchClear = () => {
        delete queryParams.search
        router.get(route("departments.index"), queryParams,);
    }
    return (
        <AuthenticatedLayout
            header={
                <Flex vertical={true} className={"m-0"}>

                       <span  style={{height:23}}><Typography.Text style={{fontSize:20}} className="font-semibold m-0 p-0 leading-tight text-gray-800 dark:text-gray-800">
                            All Departments
                        </Typography.Text></span>

                    <span><Typography.Text style={{fontSize:14}}
                                           className="m-0 p-0 leading-tight text-gray-800 dark:text-gray-400">
                            All Departments Information
                        </Typography.Text></span>

                </Flex>
            }
        >
            <Head title="Departments"/>
            <Card className={"mr-6"} style={{borderRadius: "10px"}}>

                <Flex justify={"space-between"} gap={"middle"} className={"mb-6"}>
                    {/*<Search enterButton={false} placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />*/}
                    <Input size="large" placeholder="Search" value={filters?.search} allowClear onPressEnter={onSearch}
                           onClear={onSearchClear} prefix={<SearchOutlined/>} style={{width: 300, borderRadius: 10}}/>
                </Flex>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 2,
                        xxl: 2,
                    }}
                    dataSource={departments}
                    renderItem={(department:Department) => (
                        <List.Item>
                            <Card title={<Meta className={"pt-6 pb-3"}
                                               title={<Typography.Title level={4}>{department.name}</Typography.Title> }
                                               description={<Typography.Text type={"secondary"} style={{fontSize:"14px"}}>20 Members</Typography.Text>}
                            />} extra={<Typography.Link><Link href={route("department.show", department.id)}> View All</Link></Typography.Link>}>
                                <List
                                itemLayout="horizontal"
                                dataSource={department.employees}
                                renderItem={(item:Employee, index) => (
                                    <List.Item key={index}>
                                        <List.Item.Meta
                                            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                            title={<a href="employees/1">{`${item.first_name} ${item.last_name} `}</a>}
                                            description={item.designation}
                                        />
                                    </List.Item>
                                )}
                            /></Card>
                        </List.Item>
                    )}
                />

            </Card>

        </AuthenticatedLayout>
    );
}
export default Index;
