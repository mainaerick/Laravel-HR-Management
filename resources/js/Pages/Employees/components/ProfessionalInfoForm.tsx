import React from 'react';
import {Button, Col, DatePicker, Flex, Form, Input, Row, Select, Space} from "antd";

type Props = {onTabChange:(activeKey:string)=>void}
function ProfessionalInfoForm({onTabChange}:Props) {
    const inputStyles = {
        borderRadius: 10,
        width: "100%",
        borderColor: "#A2A1A8"
    }
    const onFinish = (values: any) => {
        onTabChange("3")
    };
    const onBackClick =()=>{
        onTabChange("1")
    }
    return (
        <Form className={"mt-6"} onFinish={onFinish}>
            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item name="employee_id">
                        <Input style={inputStyles} placeholder="Employee ID"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="user_name">
                        <Input style={inputStyles} placeholder="User Name"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item name="type" >
                        <Select style={inputStyles} size={"large"} placeholder="Select Employee Type" >
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="work_email">
                        <Input style={inputStyles} placeholder="Work Email"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item name="type" >
                        <Select style={inputStyles} size={"large"} placeholder="Select Department" >
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="work_email">
                            <Input style={inputStyles} placeholder="Enter Designation"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item name="department_id" >
                        <Select style={inputStyles} size={"large"} placeholder="Select Department" >
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="designation">
                        <Input style={inputStyles} placeholder="Enter Designation"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item name="department_id" >
                        <Select style={inputStyles} size={"large"} placeholder="Select Working Days" >
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="join_date" >
                        <DatePicker size={"large"}  style={inputStyles} placeholder="Select Joining Date"  />
                    </Form.Item>
                </Col>
            </Row>
            <Flex justify={"end"}>
                <Form.Item>
                    <Space>
                        <Button style={{width:"100px"}} size={"large"} type="default" onClick={onBackClick}>
                            Back
                        </Button>
                        <Button  style={{width:"100px"}} size={"large"} type="primary" htmlType="submit">
                            Next
                        </Button>

                    </Space>
                </Form.Item>
            </Flex>
        </Form>
    );
}

export default ProfessionalInfoForm;
