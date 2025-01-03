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
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
    },
    {
        title: 'Days',
        dataIndex: 'days',
        key: 'days',
    },
    {
        title: 'Reporting Manger',
        dataIndex: 'manager',
        key: 'manager',
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
function ShowLeave(props) {
    return (
        <Table<DataType> columns={columns} dataSource={[]} />
    );
}

export default ShowLeave;
