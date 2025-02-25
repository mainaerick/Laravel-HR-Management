import React, {useState} from 'react';
import {Button, Card, Flex, Input, Modal} from "antd";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {Department} from "@/Pages/Departments/Core/Model";
import {PaginatedData} from "@/Core/Models";
import {router} from "@inertiajs/react";
import Create from "@/Pages/JobOpenings/Create";

type Props={
    data:PaginatedData, filters:any, departments:Department[],passed_params?:any
}
function JobsListing({data, filters, departments,passed_params}:Props) {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    let datasource:any[] = data.data
    let route_redirect =''
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
    const onNewJob = ()=>{
        setCreateModalOpen(true)
    }

    return (
        <Card className={"mr-6"} style={{borderRadius: "10px"}}>
            <Flex justify={"space-between"} gap={"middle"} className={"mb-6"}>
                {/*<Search enterButton={false} placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />*/}
                <Input size="large" placeholder="Search" value={filters?.search} allowClear onPressEnter={onSearch}
                       onClear={onSearchClear} prefix={<SearchOutlined/>} style={{width: 300, borderRadius: 10}}/>


                <Button style={{borderRadius: 10, paddingTop: "20px", paddingBottom: "20px"}} type="primary" onClick={onNewJob}
                        icon={<PlusOutlined/>}>
                    Add New Job
                </Button>
                <Modal
                    title="Vertically centered modal dialog"
                    centered
                    open={createModalOpen}
                    onOk={() => setCreateModalOpen(false)}
                    onCancel={() => setCreateModalOpen(false)}
                >
                    <Create departments={departments}/>
                </Modal>
            </Flex>
        </Card>
    );
}

export default JobsListing;
