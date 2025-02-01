import React from 'react';
import {Table} from "antd";

function AttendanceTable(props) {
    const columns: ColumnsType<Attendance> = [
        {
            title: 'Employee Name',
            dataIndex: 'employee',
            key: 'employee',
            render: (employee: any) => `${employee.first_name} ${employee.last_name}`,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Check-In Time',
            dataIndex: 'check_in_time',
            key: 'check_in_time',
        },
        {
            title: 'Check-Out Time',
            dataIndex: 'check_out_time',
            key: 'check_out_time',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color = 'green';
                if (status === 'late') color = 'orange';
                if (status === 'absent') color = 'red';
                return <Tag color={color}>{status}</Tag>;
            },
        },
    ];
    return (
        <Table
            columns={columns}
            dataSource={attendances}
            rowKey="id"
            pagination={{ pageSize: 10 }}
        />
    );
}

export default AttendanceTable;
