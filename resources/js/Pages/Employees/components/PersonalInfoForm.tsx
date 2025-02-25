import React, {useState} from 'react';
import {Button, Col, DatePicker, Flex, Form, Input, message, Modal, Row, Select, Space, Upload} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat)
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

type Props = {setData:any}

function PersonalInfoForm({setData}: Props) {

    const [fileList, setFileList] = useState([]);
    const [preview, setPreview] = useState({ visible: false, image: "" });

    const handleUploadChange = (info) => {
        // Extract the originFileObj from the fileList
        const updatedFileList = info.fileList.map((file) => file.originFileObj).filter(Boolean);

        // Set the single file (originFileObj) as the profile picture
        setData('profile_pic', updatedFileList[0] || null); // Only keep the first file or null if empty
        setFileList(info.fileList); // Keep the file list for UI purposes
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file); // Read the file as a Data URL (Base64)
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreview({
            visible: true,
            image: file.url || file.preview,
        });
    };
    const beforeUpload = (file) => {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
            message.error("You can only upload image files!");
        }
        const isSizeValid = file.size / 1024 / 1024 < 2; // 2 MB
        if (!isSizeValid) {
            message.error("Image must be smaller than 2MB!");
        }
        return isImage && isSizeValid;
    };
    const inputStyles = {
        borderRadius: 10,
        width: "100%",
        borderColor: "#A2A1A8"
    }
    const dateFormat = 'DD/MM/YYYY'; // Define a consistent format
    return (
        <>
            <Modal
                visible={preview.visible}
                footer={null}
                onCancel={() => setPreview({ visible: false, image: "" })}
            >
                <img alt="Preview" style={{ width: "100%" }} src={preview.image} />
            </Modal>
            <Form.Item
                name="profile_pic"
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList}
                rules={[{required: true, message: 'Please upload an image'}]}
            >
                <Upload
                    accept="image/*"
                    listType="picture-card"
                    multiple={false}
                    maxCount={1}
                    fileList={fileList}
                    beforeUpload={beforeUpload} // Prevent auto-upload
                    onChange={handleUploadChange}
                    onPreview={handlePreview}
                >
                    {fileList?.length >= 1 ? null : (
                        <div>
                            <PlusOutlined/>
                            <div style={{marginTop: 8}}>Upload</div>
                        </div>
                    )}
                </Upload>
            </Form.Item>

            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item
                        name="first_name"
                        rules={[{ required: true, message: 'Please enter your first name' }]}
                    >
                        <Input
                            style={inputStyles}
                            placeholder="First Name"
                            onChange={(e) => setData("first_name", e.target.value)}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="last_name"
                        rules={[{ required: true, message: 'Please enter your last name' }]}
                    >
                        <Input
                            style={inputStyles}
                            placeholder="Last Name"
                            onChange={(e) => setData("last_name", e.target.value)}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item
                        name="phone"
                        rules={[
                            { required: true, message: 'Please enter your mobile number' },
                            { pattern: /^[0-9]+$/, message: 'Phone number must contain only numbers' },
                        ]}
                    >
                        <Input
                            style={inputStyles}
                            placeholder="Mobile Number"
                            onChange={(e) => setData("phone", e.target.value)}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        rules={[
                            { type: 'email', message: 'Please enter a valid email address' },
                            { required: true, message: 'Email address is required' },
                        ]}
                    >
                        <Input
                            type="email"
                            style={inputStyles}
                            placeholder="Email Address"
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item
                        name="date_of_birth"
                        rules={[{ required: true, message: 'Please select your date of birth' }]}
                    >
                        <DatePicker
                            format={dateFormatList}
                            size={"large"}
                            style={inputStyles}
                            placeholder="Date Of Birth"
                            onChange={(date) => setData("date_of_birth", date ? dayjs(date) : null)}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="marital_status"
                        rules={[{ required: true, message: 'Please select your marital status' }]}
                    >
                        <Select
                            style={inputStyles}
                            size={"large"}
                            placeholder="Marital Status"
                            onChange={(value) => setData("marital_status", value)}
                        >
                            <Select.Option value="single">Single</Select.Option>
                            <Select.Option value="married">Married</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item
                        name="gender"
                        rules={[{ required: true, message: 'Please select your gender' }]}
                    >
                        <Select
                            style={inputStyles}
                            size={"large"}
                            placeholder="Gender"
                            onChange={(value) => setData("gender", value)}
                        >
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="nationality"
                        rules={[{ required: true, message: 'Please select your nationality' }]}
                    >
                        <Select
                            style={inputStyles}
                            size={"large"}
                            placeholder="Nationality"
                            onChange={(value) => setData("nationality", value)}
                        >
                            <Select.Option value="usa">USA</Select.Option>
                            <Select.Option value="india">India</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16} justify={"space-between"}>
                <Col span={24}>
                    <Form.Item
                        name="address"
                        rules={[{ required: true, message: 'Please enter your address' }]}
                    >
                        <Input
                            style={inputStyles}
                            placeholder="Address"
                            onChange={(e) => setData("address", e.target.value)}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16} justify={"space-between"}>
                <Col span={8}>
                    <Form.Item
                        name="city"
                        rules={[{ required: true, message: 'Please select your city' }]}
                    >
                        <Select
                            style={inputStyles}
                            size={"large"}
                            placeholder="City"
                            onChange={(value) => setData("city", value)}
                        >
                            <Select.Option value="new_york">New York</Select.Option>
                            <Select.Option value="los_angeles">Los Angeles</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="state"
                        rules={[{ required: true, message: 'Please select your state' }]}
                    >
                        <Select
                            style={inputStyles}
                            size={"large"}
                            placeholder="State"
                            onChange={(value) => setData("state", value)}
                        >
                            <Select.Option value="ny">NY</Select.Option>
                            <Select.Option value="ca">CA</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="zipcode"
                        rules={[
                            { required: true, message: 'Please enter your ZIP code' },
                            { pattern: /^[0-9]{5}$/, message: 'ZIP code must be 5 digits' },
                        ]}
                    >
                        <Input
                            style={inputStyles}
                            placeholder="ZIP Code"
                            onChange={(e) => setData("zipcode", e.target.value)}
                        />
                    </Form.Item>
                </Col>
            </Row>


        </>
    );
}

export default PersonalInfoForm;
