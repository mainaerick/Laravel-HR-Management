import React, {useEffect, useState} from 'react';
import {Button, Col, Flex, Form, FormInstance, Input, Row, Space, Typography} from "antd";
import Dragger from "antd/es/upload/Dragger";
import {InboxOutlined} from "@ant-design/icons";
import {Employee} from "@/Pages/Employees/core/Model";
type Props = {onTabChange:(activeKey:string)=>void, employee:any|undefined,form: FormInstance<any>,data:Employee,setData:any }
function DocumentsForm({onTabChange,employee,form,data,setData}:Props) {

    const handleFileChange = (fieldName, info) => {
        console.log(info)
        if (info.file) {
            // const files = info.fileList.map((file) => ({
            //     ...file,
            //     status: 'done',
            // }));
            if (fieldName === 'salary_slips') {
                const files = info.fileList.map((file) => file.originFileObj || file)
                setData(fieldName, files);

            }
            else {

                setData(fieldName, info.fileList.map((file) => file.originFileObj || file));
                // setData(fieldName, files);
            }
            // setData(fieldName, files);
        }

        if (info.file && info.file.originFileObj) {
            const file = info.file.originFileObj;

            // if (!validateFile(file)) {
            //     return;
            // }

            if (fieldName === 'salary_slips') {
                setData(fieldName, [...(data[fieldName] || []), file]);
            } else {
                setData(fieldName, file);
            }
        }
    };
    return (
        <div className={"mt-6"} style={{height:600}} >
            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item
                        layout={"vertical"}
                        label={<Typography.Text className={"text-lg text-gray-800"}>Upload Appointment Letter</Typography.Text>}
                        name="appointment_letter"
                        rules={[
                            { required: true, message: 'Please upload the Appointment Letter' },
                            {
                                validator: (_, fileList) => {
                                    if (!fileList || !fileList[0]) return Promise.resolve();
                                    const file = fileList[0].originFileObj || fileList[0];
                                    const isValidType = file.type === 'application/pdf' || file.type === 'image/jpeg';
                                    return isValidType
                                        ? Promise.resolve()
                                        : Promise.reject('Only PDF and JPEG files are allowed');
                                }
                            }
                        ]}
                    >
                        <Dragger
                            fileList={data?.appointment_letter as any}
                            multiple={false}
                            maxCount={1}
                            beforeUpload={() => false}
                            onRemove={(info)=>setData("appointment_letter", [])}
                            onChange={(info) => handleFileChange("appointment_letter", info)}
                            // defaultFileList={data?.appointment_letter as any}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to upload</p>
                            <p className={"text-gray-400"}>Supported formats : JPEG, PDF</p>
                        </Dragger>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        layout={"vertical"}
                        label={<Typography.Text className={"text-lg text-gray-800"}>Upload Salary Slips</Typography.Text>}
                        name="salary_slips"
                        rules={[
                            { required: true, message: 'Please upload the Salary Slips' },
                            {
                                validator: (_, fileList) => {
                                    if (!fileList || !fileList[0]) return Promise.resolve();
                                    const file = fileList[0].originFileObj || fileList[0];
                                    const isValidType = file.type === 'application/pdf' || file.type === 'image/jpeg';
                                    return isValidType
                                        ? Promise.resolve()
                                        : Promise.reject('Only PDF and JPEG files are allowed');
                                }
                            }
                        ]}
                    >
                        <Dragger
                            fileList={data.salary_slips as any}
                            beforeUpload={() => false}
                            onChange={(info) => handleFileChange("salary_slips", info)}
                            defaultFileList={employee?.salary_slips}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to upload</p>
                            <p className={"text-gray-400"}>Supported formats : JPEG, PDF</p>
                        </Dragger>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item
                        layout={"vertical"}
                        label={<Typography.Text className={"text-lg text-gray-800"}>Upload Relieving Letter</Typography.Text>}
                        name="reliving_letter"
                        rules={[
                            { required: true, message: 'Please upload the Relieving Letter' },
                            {
                                validator: (_, fileList) => {
                                    if (!fileList || !fileList[0]) return Promise.resolve();
                                    const file = fileList[0].originFileObj || fileList[0];
                                    const isValidType = file.type === 'application/pdf' || file.type === 'image/jpeg';
                                    return isValidType
                                        ? Promise.resolve()
                                        : Promise.reject('Only PDF and JPEG files are allowed');
                                }
                            }
                        ]}
                    >
                        <Dragger
                            fileList={data.reliving_letter as any}
                            beforeUpload={() => false}
                            onChange={(info) => handleFileChange("reliving_letter", info)}
                            defaultFileList={employee?.reliving_letter}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to upload</p>
                            <p className={"text-gray-400"}>Supported formats : JPEG, PDF</p>
                        </Dragger>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        layout={"vertical"}
                        label={<Typography.Text className={"text-lg text-gray-800"}>Upload Experience Letter</Typography.Text>}
                        name="experience_letter"
                        rules={[
                            { required: true, message: 'Please upload the Experience Letter' },
                            {
                                validator: (_, fileList) => {
                                    if (!fileList || !fileList[0]) return Promise.resolve();
                                    const file = fileList[0].originFileObj || fileList[0];
                                    const isValidType = file.type === 'application/pdf' || file.type === 'image/jpeg';
                                    return isValidType
                                        ? Promise.resolve()
                                        : Promise.reject('Only PDF and JPEG files are allowed');
                                }
                            }
                        ]}
                    >
                        <Dragger
                            fileList={data.experience_letter as any}
                            beforeUpload={() => false}
                            onChange={(info) => handleFileChange("experience_letter", info)}
                            defaultFileList={employee?.experience_letter}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to upload</p>
                            <p className={"text-gray-400"}>Supported formats : JPEG, PDF</p>
                        </Dragger>
                    </Form.Item>
                </Col>
            </Row>
        </div>
    );
}
export default DocumentsForm;
