import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Input, message, Modal, Radio, RadioChangeEvent, Row, Select, Space} from 'antd';
import {useForm} from "@inertiajs/react";
import {JobOpening} from "@/Pages/JobOpenings/Core/Model";
import {Department} from "@/Pages/Departments/Core/Model";

const inputStyles = {
    borderRadius: 10,
    width: "100%",
    borderColor: "#A2A1A8"
}

interface CreateProps {
    departments?: Department[]
    handleSubmit:()=>void
    setData:any
    clickedJobData?:JobOpening
}

function Create ({departments,setData,handleSubmit,clickedJobData}:CreateProps){
    const [form] = Form.useForm(); // ✅ Create Ant Design Form instance

    useEffect(() => {
        if (clickedJobData) {
            form.setFieldsValue(clickedJobData); // ✅ Prefill form when editing
        } else {
            form.resetFields(); // ✅ Reset when adding new job
        }
    }, [clickedJobData]); // ✅ Runs when `clickedJobData` changes
    return (
        <Card className="pt-0 mt-0">
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
                // initialValues={clickedJobData || {}}
            >
                {/* Department */}
                <Form.Item
                    name="department_id"
                    rules={[{ required: true, message: "Please select your department" }]}
                >
                    <Select
                        placeholder="Select Department"
                        size="large"
                        onChange={(value) => setData("department_id", value)}
                    >
                        {departments?.map((department) => (
                            <Select.Option key={department.id} value={department.id}>
                                {department.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Job Title */}
                <Form.Item name="title" rules={[{ required: true, message: "Please enter Job Title" }]}>
                    <Input
                        placeholder="Enter Job Title"
                        size="large"
                        onChange={(e) => setData("title", e.target.value)}
                    />
                </Form.Item>
                {/* Job City */}
                <Form.Item name="city" rules={[{ required: true, message: "Please enter City" }]}>
                    <Input
                        placeholder="Enter City"
                        size="large"
                        onChange={(e) => setData("city", e.target.value)}
                    />
                </Form.Item>
                {/* Salary */}
                <Form.Item name="salary" rules={[{ required: true, message: "Please Enter Amount" }]}>
                    <Input
                        placeholder="Enter Salary Amount"
                        size="large"
                        type="number"
                        defaultValue={clickedJobData?.salary as number}
                        onChange={(e) => setData("salary", e.target.value)}
                    />
                </Form.Item>

                {/* Employment Location */}
                <Form.Item label="Select Location" name="location">
                    <Radio.Group onChange={(e: RadioChangeEvent) => setData("location", e.target.value)}
                                 options={[
                                     { value: "office", label: "Office" },
                                     { value: "hybrid", label: "Hybrid"},
                                     { value: "remote", label: "Remote"},
                                 ]}
                    />
                </Form.Item>
                {/* Employment Type */}
                <Form.Item label="Select Employment Type" name="employment_type" initialValue={clickedJobData?.employment_type}>
                    <Radio.Group onChange={(e: RadioChangeEvent) => setData("employment_type", e.target.value)}
                                 options={[
                                     { value: "full-time", label: "Full-Time" },
                                     { value: "part-time", label: "Part-Time"},
                                     { value: "internship", label: "Internship"},
                                 ]}
                    />
                </Form.Item>
                {/* Job Status */}
                <Form.Item label="Status" name="status">
                    <Radio.Group onChange={(e: RadioChangeEvent) => setData("status", e.target.value)} options={[
                        { value: "active", label: "Active" },
                        { value: "inactive", label: "Inactive"},
                        { value: "completed", label: "Completed"},

                    ]}/>
                </Form.Item>

                {/* Buttons */}
                <Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            {/*<Button block onClick={onClose}>Cancel</Button>*/}
                        </Col>
                        <Col span={12}>
                            <Button block type="primary" htmlType="submit">
                                {clickedJobData ? "Update" : "Add"}
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </Card>
    );
}
export default Create;
