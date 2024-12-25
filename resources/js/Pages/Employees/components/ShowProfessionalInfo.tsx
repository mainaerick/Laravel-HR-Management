import React from 'react';
import {Col, DescriptionsProps, Flex, Row, Typography} from "antd";
import {Employee} from "@/Pages/Employees/core/Model";

type Props ={
    employee:Employee
}
function ShowProfessionalInfo({employee}:Props) {
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Employee ID',
            children: employee.employee_id ?  employee.employee_id :'NA',
        },
        {
            key: '2',
            label: 'User Name',
            children: employee.username?employee.username:'NA',
        },
        {
            key: '3',
            label: 'Employee Type',
            children: employee.employment_type?employee.employment_type:'NA',
        },
        {
            key: '4',
            label: 'Email Address',
            children: employee.employment_email?employee.employment_email:'NA',
        },
        {
            key: '5',
            label: 'Department',
            children: employee?.department_details?.name?employee?.department_details?.name:'NA',
        },
        {
            key: '6',
            label: 'Designation',
            children: employee.designation?employee.designation:'NA',
        },
        {
            key: '7',
            label: 'Working Days',
            children: employee.working_days?employee.working_days:'NA',
        },
        {
            key: '8',
            label: 'Joining Date',
            children: employee.join_date?employee.join_date:'NA',
        },

    ];
    const groupedItems =items&& items.reduce((acc, curr:any, index) => {
        const groupIndex = Math.floor(index / 2);
        acc[groupIndex] = acc[groupIndex] || [];
        acc[groupIndex].push(curr);
        return acc;
    }, [] as typeof items[][]);

    return (
        <>
            {groupedItems?.map((group, idx) => (
                <Row key={idx} gutter={[16, 16]} >
                    {group.map((item:any ) => (

                        <Col key={item.key} xs={24} xl={12}>
                            <Flex vertical>
                                <Typography.Text className="text-gray-500 mb-3" style={{fontSize:14}}>
                                    {item.label}
                                </Typography.Text>
                                <Typography.Text className={"mb-3"} style={{fontSize:16}} >
                                    {item.children}
                                </Typography.Text>
                            </Flex>
                            <hr className="mb-4"></hr>
                        </Col>
                    ))}
                </Row>
            ))}
        </>
    );
}

export default ShowProfessionalInfo;
