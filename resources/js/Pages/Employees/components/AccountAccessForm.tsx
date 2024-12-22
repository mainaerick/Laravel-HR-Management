import React from 'react';
import {Button, Col, Flex, Form, Input, Row, Space} from "antd";
type Props = {onTabChange:(activeKey:string)=>void}
function AccountAccessForm({onTabChange}:Props) {
    const inputStyles = {
        borderRadius: 10,
        width: "100%",
        borderColor: "#A2A1A8"
    }
    return (
        <div className={"mt-6"} >
            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item name="slack_id">
                        <Input style={inputStyles} placeholder="Slack ID"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="skype_id">
                        <Input style={inputStyles} placeholder="Skype ID"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16} justify={"space-between"}>
                <Col span={12}>
                    <Form.Item name="git_id">
                        <Input style={inputStyles} placeholder="Github ID"/>
                    </Form.Item>
                </Col>
            </Row>

        </div>
    );
}

export default AccountAccessForm;
