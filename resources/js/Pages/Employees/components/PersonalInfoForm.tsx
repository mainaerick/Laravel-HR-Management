import React, {useState} from 'react';
import {Button, Col, DatePicker, Flex, Form, Input, message, Row, Select, Space, Upload} from "antd";
import {PlusOutlined} from "@ant-design/icons";

type Props={
    onTabChange:(activeKey:string)=>void
}
function PersonalInfoForm({onTabChange}:Props) {

    const [fileList, setFileList] = useState([]);

    const handleUploadChange = (info) => {
        let updatedFileList = [...info.fileList];
        // Only keep the latest file
        updatedFileList = updatedFileList.slice(-1);

        // Preview validation for image files
        updatedFileList = updatedFileList.map((file) => {
            if (file.response) {
                file.url = file.response.url; // Example: add file URL from the server response
            }
            return file;
        });

        setFileList(updatedFileList);
    };


    const onFinish = (values: any) => {
        onTabChange("2")
        console.log('Form Values:', values);
        console.log('Uploaded File:', fileList[0]?.originFileObj);
    };

    const inputStyles={
        borderRadius:10,
        width:"100%",
        borderColor:"#A2A1A8"
    }
    return (
        <Form className={"mt-6"} onFinish={onFinish}>
            <Form.Item
                name="upload"
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList}
                rules={[{required: true, message: 'Please upload an image'}]}
            >
                <Upload
                    accept="image/*"
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={() => false} // Prevent auto-upload
                    onChange={handleUploadChange}
                >
                    {fileList.length >= 1 ? null : (
                        <div>
                            <PlusOutlined/>
                            <div style={{marginTop: 8}}>Upload</div>
                        </div>
                    )}
                </Upload>
            </Form.Item>


            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item name="first_name">
                        <Input style={inputStyles} placeholder="First Name" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="last_name">
                        <Input style={inputStyles} placeholder="Last Name"  />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item name="phone">
                        <Input  style={inputStyles} placeholder="Mobile Number" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="email">
                        <Input type={"email"}  style={inputStyles} placeholder="Email Address"  />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item name="date_of_birth" >
                        <DatePicker size={"large"}  style={inputStyles} placeholder="Date Of Birth"  />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="marital_status" >
                        <Select style={inputStyles} size={"large"} placeholder="Marital Status" >
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item name="gender">
                        <Select style={inputStyles} size={"large"} placeholder="Gender" >
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="nationality">
                        <Select style={inputStyles} size={"large"} placeholder="Nationality" >
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16} justify={"space-between"}>
                <Col span={24}>
                    <Form.Item name="address">
                        <Input  style={inputStyles} placeholder="Address" />
                    </Form.Item>
                </Col>

            </Row>
            <Row gutter={16} justify={"space-between"}>
                <Col span={8}>
                    <Form.Item name="city">
                        <Select style={inputStyles} size={"large"} placeholder="City" >
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="state">
                        <Select style={inputStyles} size={"large"} placeholder="State" >
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="zip_code">
                        <Select style={inputStyles} size={"large"} placeholder="ZIP Code" >
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Flex justify={"end"}>
                <Form.Item>
                    <Space>
                        <Button style={{width:"100px"}} size={"large"} type="default">
                            Cancel
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

export default PersonalInfoForm;
