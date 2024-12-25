import React from 'react';
import {Col, Descriptions, DescriptionsProps, Flex, Row, Typography} from "antd";
import {Employee} from "@/Pages/Employees/core/Model";


type Props = {
    employee:Employee
}
function ShowPersonalInfo({employee}:Props) {
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'First Name',
            children: employee.first_name ?  employee.first_name :'NA',
        },
        {
            key: '2',
            label: 'Last Name',
            children: employee.last_name?employee.last_name:'NA',
        },
        {
            key: '3',
            label: 'Mobile Number',
            children: employee.phone?employee.phone:'NA',
        },
        {
            key: '4',
            label: 'Email Address',
            children: employee.email?employee.email:'NA',
        },
        {
            key: '5',
            label: 'Date of Birth',
            children: employee.date_of_birth?employee.date_of_birth:'NA',
        },
        {
            key: '6',
            label: 'Marital Status',
            children: employee.marital_status?employee.marital_status:'NA',
        },
        {
            key: '7',
            label: 'Gender',
            children: employee.gender?employee.gender:'NA',
        },
        {
            key: '8',
            label: 'Nationality',
            children: employee.nationality?employee.nationality:'NA',
        },
        {
            key: '9',
            label: 'Address',
            children: employee.address?employee.address:'NA',
        },
        {
            key: '10',
            label: 'City',
            children: employee.city?employee.city:'NA',
        },
        {
            key: '11',
            label: 'State',
            children: employee.state?employee.state:'NA',
        },
        {
            key: '12',
            label: 'Zip Code',
            children:employee.zipcode?employee.zipcode:'NA',
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

export default ShowPersonalInfo;
