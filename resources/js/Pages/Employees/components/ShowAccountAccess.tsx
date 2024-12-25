import React from 'react';
import {Col, Descriptions, DescriptionsProps, Flex, Row, Typography} from "antd";
import {Employee} from "@/Pages/Employees/core/Model";


type Props = {
    employee:Employee
}
function ShowAccountAccess({employee}:Props) {
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Email Address',
            children: employee.email ?  employee.employee_id :'NA',
        },
        {
            key: '2',
            label: 'Slack ID',
            children: 'NA',
        },
        {
            key: '3',
            label: 'Skype ID',
            children: 'NA',
        },
        {
            key: '4',
            label: 'Github ID',
            children: 'NA',
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

export default ShowAccountAccess;
