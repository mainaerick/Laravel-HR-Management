import React from 'react';
import {Table, TableProps} from "antd";
interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}
const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Project Name',
        dataIndex: 'project',
        key: 'project',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Start Date',
        dataIndex: 'startdate',
        key: 'startdate',
    },
    {
        title: 'Finish Date',
        dataIndex: 'finish_date',
        key: 'finish_date',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Working Hours',
        dataIndex: 'working_hours',
        key: 'working_hours',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
];
function ShowProjects() {
    return (
        <Table<DataType> columns={columns} dataSource={[]} />
    );
}

export default ShowProjects;
