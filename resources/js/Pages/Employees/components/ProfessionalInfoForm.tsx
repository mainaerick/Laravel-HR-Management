import React from 'react';
import {Button, Col, DatePicker, Flex, Form, Input, Row, Select, Space} from "antd";
import {Department} from "@/Pages/Departments/Core/Model";

type Props = {departments:Department[]}
function ProfessionalInfoForm({departments}:Props) {
    const inputStyles = {
        borderRadius: 10,
        width: "100%",
        borderColor: "#A2A1A8"
    }

    return (
        <div className={"mt-6"} >
            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item
                        name="employee_id"
                        rules={[{ required: true, message: 'Please enter the Employee ID' }]}
                    >
                        <Input style={inputStyles} placeholder="Employee ID" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="user_name"
                        rules={[{ required: true, message: 'Please enter the User Name' }]}
                    >
                        <Input style={inputStyles} placeholder="User Name" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item
                        name="employment_type"
                        rules={[{ required: true, message: 'Please select the Employee Type' }]}
                    >
                        <Select style={inputStyles} size={"large"} placeholder="Select Employee Type">
                            <Select.Option value="permanent">Permanent</Select.Option>permanent,contract,intern
                            <Select.Option value="contract">Contract</Select.Option>
                            <Select.Option value="intern">Intern</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="work_email"
                        rules={[
                            { type: 'email', message: 'Please enter a valid email address' },
                            { required: true, message: 'Please enter the Work Email' },
                        ]}
                    >
                        <Input style={inputStyles} placeholder="Work Email" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item
                        name="department_id"
                        rules={[{ required: true, message: 'Please select a Department' }]}
                    >
                        <Select style={inputStyles} size={"large"} placeholder="Select Department">
                            {departments.map((department,key)=>{
                                return <Select.Option value={department.id} key={key}>{department.name}</Select.Option>
                            })}

                            <Select.Option value="it">IT</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="designation"
                        rules={[{ required: true, message: 'Please enter the Designation' }]}
                    >
                        <Input style={inputStyles} placeholder="Enter Designation" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item
                        name="working_days"
                        rules={[{ required: true, message: 'Please select the Working Days' }]}
                    >
                        <Select mode={"multiple"} style={inputStyles} size={"large"} placeholder="Select Working Days">
                            <Select.Option value="monday">Monday</Select.Option>
                            <Select.Option value="tuesday">Tuesday</Select.Option>
                            <Select.Option value="wednesday">Wednesday</Select.Option>
                            <Select.Option value="thursday">Thursday</Select.Option>
                            <Select.Option value="friday">Friday</Select.Option>
                            <Select.Option value="saturday">Saturday</Select.Option>
                            <Select.Option value="sunday">Sunday</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="join_date"
                        rules={[{ required: true, message: 'Please select the Joining Date' }]}
                    >
                        <DatePicker size={"large"} style={inputStyles} placeholder="Select Joining Date" />
                    </Form.Item>
                </Col>
            </Row>


        </div>
    );
}

export default ProfessionalInfoForm;
