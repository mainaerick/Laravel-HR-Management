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
        <Form className={"mt-6"} >
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
            <Flex justify={"end"}>
                <Form.Item>
                    <Space>
                        <Button style={{width: "100px"}} size={"large"} type="default" onClick={()=>onTabChange("3")}>
                            Back
                        </Button>
                        <Button style={{width: "100px"}} size={"large"} type="primary" htmlType="submit">
                            Add
                        </Button>

                    </Space>
                </Form.Item>
            </Flex>
        </Form>
    );
}

export default AccountAccessForm;
