import React, {useEffect, useState} from 'react';
import {Button, Col, Flex, Form, FormInstance, Input, Row, Space, Typography} from "antd";
import Dragger from "antd/es/upload/Dragger";
import {InboxOutlined} from "@ant-design/icons";
import {Employee} from "@/Pages/Employees/core/Model";
type Props = { employee:any|undefined,data:Employee,setData:any }

const uploadFields = [
    { key: 'appointment_letter', label: 'Upload Appointment Letter', maxCount: 1 },
    { key: 'salary_slips', label: 'Upload Salary Slips', maxCount: 5 },
    { key: 'reliving_letter', label: 'Upload Relieving Letter', maxCount: 1 },
    { key: 'experience_letter', label: 'Upload Experience Letter', maxCount: 1 },
];
type DocumentField =
    | "appointment_letter"
    | "salary_slips"
    | "reliving_letter"
    | "experience_letter";

const documentKeys: DocumentField[] = [
    "appointment_letter",
    "salary_slips",
    "reliving_letter",
    "experience_letter",
];
function DocumentsForm({employee,data,setData}:Props) {


    const validateFileType = (file:any) => {
        return file.type === 'application/pdf' || file.type === 'image/jpeg';
    };
    const handleFileChange = (fieldName:any, info:any) => {
        const files = info.fileList.map((file:any) => file.originFileObj || file);
        setData(fieldName, fieldName === 'salary_slips' ? files : files.slice(-1)); // Keep only the latest for single upload
    };

    return (
        <div className={"mt-6"} style={{height:600}} >
            <Row gutter={16}>
                {uploadFields.map(({ key, label, maxCount }) => (
                    <Col span={12} key={key}>

                        {documentKeys.map((key) => {
                            const maxCount = key === "salary_slips" ? 12 : 1;

                            return (
                                <Form.Item label={<Typography.Text className="text-lg text-gray-800">{label}</Typography.Text>} key={key}>
                                    <Dragger
                                        fileList={data[key] as any}
                                        multiple={maxCount > 1}
                                        maxCount={maxCount}
                                        beforeUpload={() => false}
                                        onChange={(info) => handleFileChange(key, info)}
                                        onRemove={() => setData(key, [])}
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to upload</p>
                                        <p className="text-gray-400">Supported formats: JPEG, PDF</p>
                                    </Dragger>
                                </Form.Item>
                            );
                        })}
                        {/*<Form.Item*/}
                        {/*    layout="vertical"*/}
                        {/*    label={<Typography.Text className="text-lg text-gray-800">{label}</Typography.Text>}*/}
                        {/*    name={key as string}*/}
                        {/*    rules={[*/}
                        {/*        { required: true, message: `Please upload the ${label}` },*/}
                        {/*        {*/}
                        {/*            validator: (_, fileList) =>*/}
                        {/*                !fileList || !fileList[0]*/}
                        {/*                    ? Promise.resolve()*/}
                        {/*                    : validateFileType(fileList[0].originFileObj || fileList[0])*/}
                        {/*                        ? Promise.resolve()*/}
                        {/*                        : Promise.reject('Only PDF and JPEG files are allowed'),*/}
                        {/*        },*/}
                        {/*    ]}*/}
                        {/*>*/}
                        {/*  */}
                        {/*    <Dragger*/}
                        {/*        fileList={data[key as any] as any}*/}
                        {/*        multiple={maxCount > 1}*/}
                        {/*        maxCount={maxCount}*/}
                        {/*        beforeUpload={() => false}*/}
                        {/*        onChange={(info) => handleFileChange(key, info)}*/}
                        {/*        onRemove={() => setData(key, [])}*/}
                        {/*    >*/}
                        {/*        <p className="ant-upload-drag-icon">*/}
                        {/*            <InboxOutlined />*/}
                        {/*        </p>*/}
                        {/*        <p className="ant-upload-text">Click or drag file to upload</p>*/}
                        {/*        <p className="text-gray-400">Supported formats: JPEG, PDF</p>*/}
                        {/*    </Dragger>*/}
                        {/*</Form.Item>*/}
                    </Col>
                ))}
            </Row>
        </div>
    );
}
export default DocumentsForm;
