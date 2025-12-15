import React from 'react';
import {Space, Table, TableProps} from "antd";
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
        title: 'Check In',
        dataIndex: 'checkin',
        key: 'checkin',
    },
    {
        title: 'Check Out',
        dataIndex: 'checkout',
        key: 'checkout',
    },
    {
        title: 'Break',
        dataIndex: 'break',
        key: 'break',
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
function ShowAttendance() {
    return (
        <Table<DataType> columns={columns} dataSource={[]} />
    );
}

export default ShowAttendance;
