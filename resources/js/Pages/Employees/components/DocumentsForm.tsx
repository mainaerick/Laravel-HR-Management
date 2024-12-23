import React, {useState} from 'react';
import {Button, Col, Flex, Form, Input, Row, Space, Typography} from "antd";
import Dragger from "antd/es/upload/Dragger";
import {InboxOutlined} from "@ant-design/icons";
type Props = {onTabChange:(activeKey:string)=>void}
function DocumentsForm({onTabChange}:Props) {
    const [fileList, setFileList] = useState([]);

    const handleFileChange = (info) => {
        const files = info.fileList.map((file) => ({
            ...file,
            status: 'done',
        }));

        console.log(files)
        setFileList(files);
    };


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
                                validator: (_, file) =>
                                    !file || (file.fileList[0]?.type === 'application/pdf' || file.fileList[0]?.type === 'image/jpeg')
                                        ? Promise.resolve()
                                        : Promise.reject(new Error('Supported formats: JPEG, PDF')),
                            },
                        ]}
                    >
                        <Dragger beforeUpload={() => false} onChange={handleFileChange}>
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
                                validator: (_, file) =>
                                    !file || (file.fileList[0]?.type === 'application/pdf' || file.fileList[0]?.type === 'image/jpeg')
                                        ? Promise.resolve()
                                        : Promise.reject(new Error('Supported formats: JPEG, PDF')),
                            },
                        ]}
                    >
                        <Dragger beforeUpload={() => false} onChange={handleFileChange}>
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
                                validator: (_, file) =>
                                    !file || (file.fileList[0]?.type === 'application/pdf' || file.fileList[0]?.type === 'image/jpeg')
                                        ? Promise.resolve()
                                        : Promise.reject(new Error('Supported formats: JPEG, PDF')),
                            },
                        ]}
                    >
                        <Dragger beforeUpload={() => false} onChange={handleFileChange}>
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
                                validator: (_, file) =>
                                    !file || (file.fileList[0]?.type === 'application/pdf' || file.fileList[0]?.type === 'image/jpeg')
                                        ? Promise.resolve()
                                        : Promise.reject(new Error('Supported formats: JPEG, PDF')),
                            },
                        ]}
                    >
                        <Dragger beforeUpload={() => false} onChange={handleFileChange}>
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
