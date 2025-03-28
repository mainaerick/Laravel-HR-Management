import React, { useState } from "react";
import {
    Button,
    Card,
    Input,
    Flex,
    Select,
    Table,
    Typography,
    Pagination
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { router } from "@inertiajs/react";
import { Department } from "@/Pages/Departments/Core/Model";

type Props = {
    data: any;
    filters: any;
    passed_params?: any;
    route_redirect: string;
    columns: any;
    departments?: Department[];
};

function AttendanceTable({ data, filters, passed_params, route_redirect, columns }: Props) {
    let datasource: any[] = data.data;
    let queryParams = {
        per_page: data.per_page,
        page: data.current_page,
        search: filters.search,
        department_id: filters.department_id,
        employment_type: filters.employment_type
    };

    const handleTableChange = (page: number) => {
        queryParams = { ...queryParams, ...passed_params, page };
        router.get(route(route_redirect, passed_params?.id ? { id: passed_params.id } : {}), queryParams, { preserveScroll: true });
    };

    const handlePerPageChange = (value: number) => {
        queryParams.per_page = value;
        queryParams = { ...queryParams, ...passed_params };
        router.get(route(route_redirect, passed_params?.id ? { id: passed_params.id } : {}), queryParams, { preserveScroll: true });
    };

    const onSearch = (e) => {
        const value = e.target.value;
        if (value) {
            queryParams.search = value;
            queryParams.page = 1;
            queryParams = { ...queryParams, ...passed_params };
            router.get(route(route_redirect, passed_params?.id ? { id: passed_params.id } : {}), queryParams, { preserveScroll: true });
        }
    };

    const onSearchClear = () => {
        delete queryParams.search;
        queryParams = { ...queryParams, ...passed_params };
        router.get(route(route_redirect, passed_params?.id ? { id: passed_params.id } : {}), queryParams, { preserveScroll: true });
    };

    return (
        <Card className="mr-6" style={{ borderRadius: "10px" }}>
            {/* Search & Filters */}
            <Flex justify="space-between" gap="middle" className="mb-6 flex-wrap">
                <Input
                    size="large"
                    placeholder="Search"
                    value={filters?.search}
                    allowClear
                    onPressEnter={onSearch}
                    onClear={onSearchClear}
                    prefix={<SearchOutlined />}
                    className="w-full md:w-72"
                    style={{ borderRadius: 10 }}
                />
            </Flex>

            {/* Table */}
            <Table
                scroll={{ x: "max-content", y: 500 }}
                columns={columns}
                dataSource={datasource}
                rowKey="id"
                pagination={false}
            />

            {/* Pagination & Per Page Controls */}
            <Flex justify="space-between" align="center" className="mt-3 flex-wrap gap-4">
                <Flex gap="large" align="center">
                    <Typography.Text className="text-gray-400">Showing</Typography.Text>
                    <Select
                        defaultValue={data.per_page}
                        style={{ width: 120 }}
                        onChange={handlePerPageChange}
                        options={[
                            { value: 10, label: 10 },
                            { value: 20, label: 20 },
                            { value: 50, label: 50 },
                            { value: 100, label: 100 }
                        ]}
                    />
                </Flex>

                <Typography.Text className="text-gray-400">
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
