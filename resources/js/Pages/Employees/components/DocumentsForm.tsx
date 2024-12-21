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
        setFileList(files);
    };

    const onFinish = (values: any) => {
        onTabChange("4")
    };
    return (
        <Form className={"mt-6"}  onFinish={onFinish} layout={"vertical"}>

            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item label={<Typography.Text className={"text-lg text-gray-800"}>Upload Appointment Letter</Typography.Text>} name="appointment_letter">
                        <Dragger beforeUpload={() => false} onChange={handleFileChange}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Click or drag file to upload</p>
                            <p className={"text-gray-400"}>Supported formats : Jpeg, pdf</p>

                        </Dragger>
                    </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item label={<Typography.Text className={"text-lg text-gray-800"}>Upload Salary Slips</Typography.Text>} name="salary_slips">
                        <Dragger beforeUpload={() => false} onChange={handleFileChange}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Click or drag file to upload</p>
                            <p className={"text-gray-400"}>Supported formats : Jpeg, pdf</p>

                        </Dragger>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item label={<Typography.Text className={"text-lg text-gray-800"}>Upload Reliving Letter</Typography.Text>} name="reliving_letter">
                        <Dragger beforeUpload={() => false} onChange={handleFileChange}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Click or drag file to upload</p>
                            <p className={"text-gray-400"}>Supported formats : Jpeg, pdf</p>

                        </Dragger>
                    </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item label={<Typography.Text className={"text-lg text-gray-800"}>Upload Experience Letter</Typography.Text>} name="experience_letter">
                        <Dragger beforeUpload={() => false} onChange={handleFileChange}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to upload</p>
                            <p className={"text-gray-400"}>Supported formats : Jpeg, pdf</p>
                        </Dragger>
                    </Form.Item>
                </Col>
            </Row>
            <Flex justify={"end"}>
                <Form.Item>
                    <Space>
                        <Button style={{width:"100px"}} size={"large"} type="default" onClick={()=>onTabChange("2")}>
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

export default DocumentsForm;
