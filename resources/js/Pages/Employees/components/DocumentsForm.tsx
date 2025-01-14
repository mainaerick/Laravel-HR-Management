import React, {useEffect, useState} from 'react';
import {Button, Col, Flex, Form, Input, Row, Space, Typography} from "antd";
import Dragger from "antd/es/upload/Dragger";
import {InboxOutlined} from "@ant-design/icons";
import {Employee} from "@/Pages/Employees/core/Model";
type Props = {onTabChange:(activeKey:string)=>void, employee:any|undefined}
function DocumentsForm({onTabChange,employee}:Props) {
    const [fileList, setFileList] = useState([]);

    const handleFileChange = (info) => {
        const files = info.fileList.map((file) => ({
            ...file,
            status: 'done',
        }));

        setFileList(files);
    };

    useEffect(() => {
        console.log(employee)
    }, [fileList]);

    return (
        <div className={"mt-6"}  >
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
                        <Dragger beforeUpload={() => false} onChange={handleFileChange}  defaultFileList={employee?.appointment_letter}>
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
                        <Dragger beforeUpload={() => false} onChange={handleFileChange} defaultFileList={employee?.salary_slips}>
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

                        label={<Typography.Text className={"text-lg text-gray-800"}>Upload Reliving Letter</Typography.Text>}
                        name="reliving_letter"
                        rules={[
                            { required: true, message: 'Please upload the Reliving Letter' },
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
                        <Dragger beforeUpload={() => false} onChange={handleFileChange} defaultFileList={employee?.reliving_letter}>
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
                        <Dragger beforeUpload={() => false} onChange={handleFileChange} defaultFileList={employee?.experience_letter}>
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
