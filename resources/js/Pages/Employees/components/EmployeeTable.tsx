import React, { useState } from 'react';
import {
    Button,
    Card,
    Checkbox,
    Col,
    Flex,
    Input,
    Modal,
    Pagination,
    Row,
    Select,
    Table,
    Typography,
    Radio,
    notification
} from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    FilterOutlined,
    PlusOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { router } from '@inertiajs/react';
import {Department} from "@/Pages/Departments/Core/Model";

interface Props {
    data:any, filters:any, route_redirect:any, passed_params:any, departments:Department[]
}
const EmployeeTable = ({ data, filters, route_redirect, passed_params, departments }:Props) => {
    const [type, setType] = useState(filters.employment_type);
    const [selected_departments, setSelectedDepartments] = useState(filters.department_id);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = (id:any) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            router.delete(route('employee.destroy', id), {
                onSuccess: () => {
                    notification.success({ message: 'Employee Deleted', description: 'The employee was successfully deleted.' });
                },
            });
        }
    };

    const handleConfirmFilters = () => {
        const queryParams = { ...filters, department_id: selected_departments, employment_type: type, page: 1, ...passed_params };
        router.get(route(route_redirect, passed_params?.id ? { id: passed_params.id } : {}), queryParams, { preserveScroll: true });
    };

    const handleFilterReset = () => {
        setSelectedDepartments([]);
        setType(undefined);
        const queryParams = { ...filters, page: 1, ...passed_params };
        router.get(route(route_redirect, passed_params?.id ? { id: passed_params.id } : {}), queryParams, { preserveScroll: true });
    };

    const handleTableChange = (page:any) => {
        const queryParams = { ...filters, page, ...passed_params };
        router.get(route(route_redirect, passed_params?.id ? { id: passed_params.id } : {}), queryParams, { preserveScroll: true });
    };

    const handlePerPageChange = (value:any) => {
        const queryParams = { ...filters, per_page: value, ...passed_params };
        router.get(route(route_redirect, passed_params?.id ? { id: passed_params.id } : {}), queryParams, { preserveScroll: true });
    };

    const onSearch = (e:any) => {
        const value = e.target.value;
        if (value) {
            const queryParams = { ...filters, search: value, page: 1, ...passed_params };
            router.get(route(route_redirect, passed_params?.id ? { id: passed_params.id } : {}), queryParams, { preserveScroll: true });
        }
    };

    const onSearchClear = () => {
        const queryParams = { ...filters, search: undefined, ...passed_params };
        router.get(route(route_redirect, passed_params?.id ? { id: passed_params.id } : {}), queryParams, { preserveScroll: true });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'first_name',
            key: 'first_name',
            render: (text:any, record:any) => <a>{`${record.first_name} ${record.last_name}`}</a>,
        },
        {
            title: 'Employment ID',
            dataIndex: 'employee_id',
            key: 'employee_id',
            responsive: ['md'],
        },
        {
            title: 'Department',
            dataIndex: 'department_id',
            key: 'department_id',
            render: (text:any, item:any) => <span>{item.department?.name}</span>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text:any, item:any) => (
                <Flex gap="middle">
                    <EyeOutlined onClick={() => router.get(route('employee.show', item.id))} style={{ fontSize: '18px' }} />
                    <EditOutlined onClick={() => router.get(route('employee.edit', item.id))} style={{ fontSize: '18px' }} />
                    <DeleteOutlined onClick={() => handleDelete(item.id)} style={{ fontSize: '18px' }} />
                </Flex>
            ),
        },
    ];

    return (
        <Card style={{ borderRadius: '10px' }}>
            <Flex justify="space-between" className="mb-6">
                <Input size="large" placeholder="Search" allowClear onPressEnter={onSearch} onClear={onSearchClear} prefix={<SearchOutlined />} style={{ width: '100%', maxWidth: 300, borderRadius: 10 }} />

                <Flex justify="space-between" align={"center"} gap="middle">
                    <Button type="default" onClick={() => setIsModalOpen(true)} icon={<FilterOutlined />} style={{ borderRadius: 10 }}>Filter</Button>
                    <Button type="primary" onClick={() => router.get(route('employee.create'))} icon={<PlusOutlined />} style={{ borderRadius: 10 }}>Add New</Button>
                </Flex>
            </Flex>
            <Table columns={columns as any} pagination={false} dataSource={data.data} rowKey="user_id" scroll={{ x: 'max-content', y: 500 }} />
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
            <Modal title="Filter" open={isModalOpen} onOk={handleConfirmFilters} onCancel={handleFilterReset}>
                <Card>
                    <Flex vertical>
                        {departments && (
                            <Checkbox.Group value={selected_departments} onChange={setSelectedDepartments}>
                                <Row>{departments.map(dept => <Col span={12} key={dept.id}><Checkbox value={dept.id.toString()}>{dept.name}</Checkbox></Col>)}</Row>
                            </Checkbox.Group>
                        )}
                        <Radio.Group onChange={e => setType(e.target.value)} value={type}>
                            <Radio value="office">Office</Radio>
                            <Radio value="remote">Remote</Radio>
                        </Radio.Group>
                    </Flex>
                </Card>
            </Modal>
        </Card>
    );
};

export default EmployeeTable;
