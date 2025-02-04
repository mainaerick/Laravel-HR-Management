import React from 'react';
import {
    Button,
    Card,
    Checkbox, Col,
    Flex,
    Input,
    Modal,
    Pagination, Radio, Row,
    Select,
    Table,
    TableColumnsType,
    Tag,
    Typography
} from "antd";
import {Attendance} from "@/Pages/Attendance/Core/Model";
import {ColumnsType} from "antd/es/table";
import {Employee} from "@/Pages/Employees/core/Model";
import {router} from "@inertiajs/react";
import {PaginatedData} from "@/Core/Models";
import {FilterOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {Department} from "@/Pages/Departments/Core/Model";


type Props = {
    data:PaginatedData, filters: any,passed_params?:any,route_redirect:string,columns:any
}
function AttendanceTable({data,filters,passed_params,route_redirect,columns}:Props) {
    let datasource:any[] = data.data
    let queryParams = {
        per_page: data.per_page,
        page: data.current_page,
        search: filters.search,
        department_id: filters.department_id,
        employment_type: filters.employment_type

    }


    const handleTableChange = (page: number) => {
        queryParams = {
            ...queryParams,...passed_params,page : page
        }
        router.get(route(route_redirect, passed_params?.id ? { id: passed_params.id } : {}), queryParams, { preserveScroll: true });

    };
    const handlePerPageChange = (value: number) => {
        queryParams.per_page = value
        queryParams = {
            ...queryParams,...passed_params
        }

        router.get(route(route_redirect, passed_params?.id ? { id: passed_params.id } : {}), queryParams, { preserveScroll: true });
    };
    const onSearch = (e) => {

        const value = e.target.value
        if (value) {
            queryParams.search = value
            queryParams.page = 1
            queryParams = {
                ...queryParams,...passed_params
            }

            router.get(route(route_redirect, passed_params?.id ? { id: passed_params.id } : {}), queryParams, { preserveScroll: true });
        }

    }
    const onSearchClear = () => {
        delete queryParams.search
        queryParams = {
            ...queryParams,...passed_params
        }

        router.get(route(route_redirect, passed_params?.id ? { id: passed_params.id } : {}), queryParams, { preserveScroll: true });
    }
    return (
        <Card className={"mr-6"} style={{borderRadius: "10px"}}>
            <Flex justify={"space-between"} gap={"middle"} className={"mb-6"}>
                {/*<Search enterButton={false} placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />*/}
                <Input size="large" placeholder="Search" value={filters?.search} allowClear onPressEnter={onSearch}
                       onClear={onSearchClear} prefix={<SearchOutlined/>} style={{width: 300, borderRadius: 10}}/>



            </Flex>
            <Table scroll={{y: 500}}
                   columns={columns}
                   dataSource={datasource}
                   rowKey="id"
                   pagination={false}
            />
            <Flex justify={"space-between"} align={"center"} className={"mt-3"}>
                <Flex gap={"large"} align={"center"}><Typography.Text
                    className={"text-gray-400"}>{"Showing"}</Typography.Text><Select
                    defaultValue={data.per_page}
                    style={{width: 120}}
                    onChange={handlePerPageChange}
                    options={[
                        {value: 10, label: 10},
                        {value: 20, label: 20},
                        {value: 50, label: 50},
                        {value: 100, label: 100},
                    ]}
                /></Flex>
                <Typography.Text className={"text-gray-400"}>
                    Showing {data.from} to {data.to} out of {data.total} records
                </Typography.Text>
                <Pagination
                    current={data.current_page}
                    total={data.total}
                    pageSize={data.per_page}
                    onChange={handleTableChange}
                />
            </Flex>
        </Card>

    );
}

export default AttendanceTable;
