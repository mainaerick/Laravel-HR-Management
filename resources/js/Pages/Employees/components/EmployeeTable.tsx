import React, {useState} from 'react';
import {
    Button,
    Card,
    Checkbox, CheckboxProps, Col,
    Flex,
    Input,
    Modal,
    Pagination, Row,
    Select,
    Table,
    TableColumnsType,
    Typography
    , Radio, RadioChangeEvent, GetProp, notification
} from 'antd';
import {Employee} from "@/Pages/Employees/core/Model";
import {DeleteOutlined, EditOutlined, FilterOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {PaginatedData} from "@/Core/Models";
import {router} from "@inertiajs/react";
import {SearchProps} from "antd/lib/input";
import {Department} from "@/Pages/Departments/Core/Model";



const EmployeeTable: React.FC<{ data: PaginatedData, filters: any, departments: Department[] }> = ({
                                                                                                       data,
                                                                                                       filters,
                                                                                                       departments
                                                                                                   }) => {

    const generateEmployeeColumns = (): TableColumnsType<Employee> => {
        const columns: TableColumnsType<Employee> = [
            {
                title: 'Name',
                dataIndex: 'first_name',
                key: 'first_name',
                render: (text, record) => (
                    <a>{`${record.first_name} ${record.last_name}`}</a>
                ),
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
                render:(text,item)=> <span>{item.department_id && departments.find((department)=>department.id===item.department_id).name}</span>
            },
            {
                title: 'Designation',
                dataIndex: 'designation',
                key: 'designation',
                responsive: ['md'],
            },
            {
                title: 'Type',
                dataIndex: 'location_type',
                key: 'type',
                responsive: ['lg'],
            },
            {
                title: 'Status',
                dataIndex: 'employment_type',
                key: 'employment_type',
                responsive: ['lg'],
            },
            {
                title: 'Action',
                dataIndex: 'join_date',
                key: 'join_date',
                render: (text,item) => <Flex gap={"middle"}><EditOutlined style={{fontSize: "18px"}}/> <DeleteOutlined onClick={()=>handleDelete(item.id)}
                                                                                                                  style={{fontSize: "18px"}}/></Flex>,
            },

        ];

        return columns;
    };
    const [type, setType]:string|undefined = useState(filters.employment_type);
    const [selected_departments, setSelectedDepartments]:[] = useState(filters.department_id);
    const columns = generateEmployeeColumns();
    const employee: Employee[] = data.data
    let queryParams = {
        per_page: data.per_page,
        page: data.current_page,
        search: filters.search,
        department_id: filters.department_id,
        employment_type: filters.employment_type

    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleDelete = (id) => {
        console.log(id)
        if (window.confirm('Are you sure you want to delete this employee?')) {
            router.delete(route('employee.destroy', id), {
                onSuccess: () => {
                    notification.success({
                        message: 'Employee Deleted',
                        description: 'The employee was successfully deleted.',
                    });
                },
                onError: (error) => {

                },
            });
        }
    };
    const handleConfirmFilters = () => {
        // setIsModalOpen(false);
        queryParams.department_id=selected_departments
        queryParams.employment_type=type
        router.get(route("employee.index"), queryParams,);
    };

    const handleFilterReset = () => {
        setSelectedDepartments([])
        setType()
        delete queryParams.department_id
        delete queryParams.employment_type
        // setIsModalOpen(false);
    };
    const handleTableChange = (page: number) => {
        queryParams.page = page
        router.get(route("employee.index"), queryParams, {preserveScroll: true});
        // Inertia.get('/employees', { page }, { preserveScroll: true });
    };
    const handlePerPageChange = (value: number) => {
        queryParams.per_page = value
        router.get(route("employee.index"), queryParams,);
    };
    const onSearch = (e) => {

        const value = e.target.value
        if (value) {
            queryParams.search = value
            router.get(route("employee.index"), queryParams,);
        }

    }
    const onSearchClear = () => {

        delete queryParams.search
        router.get(route("employee.index"), queryParams,);
    }
    const onDepartmentChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        console.log(checkedValues);
        setSelectedDepartments(checkedValues)
    };
    const onTypeChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setType(e.target.value)
    };
    const onNewEmployee = ()=>{
        router.get(route("employee.create"))
    }
    return (
        <Card className={"mr-6"} style={{borderRadius: "10px"}}>

            <Flex justify={"space-between"} gap={"middle"} className={"mb-6"}>
                {/*<Search enterButton={false} placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />*/}
                <Input size="large" placeholder="Search" value={filters?.search} allowClear onPressEnter={onSearch}
                       onClear={onSearchClear} prefix={<SearchOutlined/>} style={{width: 300, borderRadius: 10}}/>

                <Flex justify={"space-between"} gap={"middle"}>
                    <Button style={{borderRadius: 10, paddingTop: "20px", paddingBottom: "20px"}} type="primary" onClick={onNewEmployee}
                            icon={<PlusOutlined/>}>
                        Add New Employee
                    </Button>

                    <div>
                        <Button type="default" onClick={showModal} icon={<FilterOutlined/>}
                                style={{borderRadius: 10, paddingTop: "20px", paddingBottom: "20px"}}>
                            Filter
                        </Button>
                        <Modal title="Filter" open={isModalOpen} cancelText={"Reset"} onOk={handleConfirmFilters} onCancel={handleFilterReset}>
                            <Card>
                                <Flex vertical={true} gap={"middle"}>
                                    <Flex vertical={true} gap={"middle"}>
                                        <Typography.Text className={"font-bold text-md"}>Department</Typography.Text>
                                        <Checkbox.Group style={{width: '100%'}} value={selected_departments}
                                                        onChange={onDepartmentChange}>
                                            <Row>

                                                {departments.map((department: Department) => {
                                                    return <Col span={12}><Checkbox
                                                        className={"font-medium text-gray-600"}
                                                        value={department.id.toString()}>{department.name}</Checkbox></Col>
                                                })}
                                            </Row></Checkbox.Group>


                                    </Flex>
                                    <Flex vertical={true} gap={"middle"}>
                                        <Typography.Text className={"font-bold text-md"}>Select Type</Typography.Text>
                                        <Radio.Group onChange={onTypeChange} value={type}>
                                            <Radio className={"font-medium text-gray-600"}
                                                   value={"office"}>Office</Radio>
                                            <Radio className={"font-medium text-gray-600"} value={"remote"}>Work from
                                                Home</Radio>
                                        </Radio.Group>
                                    </Flex>
                                </Flex>
                            </Card>
                        </Modal>
                    </div>
                </Flex>


            </Flex>

            <Table scroll={{y: 500}} columns={columns} pagination={false} dataSource={employee} rowKey="user_id"/>

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

        </Card>);
};

export default EmployeeTable;
