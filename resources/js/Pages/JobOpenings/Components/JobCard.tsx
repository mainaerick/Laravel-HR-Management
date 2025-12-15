import React from 'react';
import { Button, Card, Col, Flex, Row, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { ContainerOutlined, EnvironmentOutlined } from "@ant-design/icons";

const buttonStyle = {
    padding: "10px",
    backgroundColor: "#7152F3",
    color: "white",
    fontSize: 12,
    minWidth: "80px", // Adjusted for readability
    textAlign: "center",
    borderRadius: "6px"
};

type Props = {
    jobId: number | string;
    department?: string | null;
    e_type?: string | null;
    title?: string | null;
    location?: string | null;
    salary?: number | null;
    status?: string | null;
    city?: string | null;
    jobClick: (jobId: number | string) => void;
};

function JobCard({ jobId, department, e_type, title, location, salary, city, jobClick }: Props) {
    return (
        <Card
            className="mb-3"
            hoverable
            onClick={() => jobClick(jobId)}
            style={{ borderRadius: "8px", transition: "0.3s", cursor: "pointer" }}
        >
            <Meta
                avatar={<ContainerOutlined style={{ fontSize: "24px", color: "#7152F3" }} />}
                title={title || "Untitled Job"}
                description={department || "Unknown Department"}
            />

            <Row gutter={[8, 8]} style={{ marginTop: "20px", marginBottom: "20px" }} justify="center">
                {department && (
                    <Col>
                        <Button style={buttonStyle as any}>{department}</Button>
                    </Col>
                )}
                {e_type && (
                    <Col>
                        <Button style={buttonStyle as any}>{e_type}</Button>
                    </Col>
                )}
                {location && (
                    <Col>
                        <Button style={buttonStyle as any}>{location}</Button>
                    </Col>
                )}
            </Row>

            <Row align="middle" gutter={16}>
                <Col span={12}>
                    <Flex align="center" gap={4}>
                        <EnvironmentOutlined style={{ fontSize: "20px", color: "#555" }} />
                        <Typography.Text style={{ fontSize: "14px" }}>
                            {city || "Unknown City"}
                        </Typography.Text>
                    </Flex>
                </Col>
                <Col span={12}>
                    <Flex justify="flex-end" align="center">
                        <Typography.Text strong style={{ fontSize: "14px", color: "#333" }}>
                            {salary
                                ? `KSH ${salary >= 1000 ? Math.round(salary / 1000).toLocaleString() + "K" : salary.toLocaleString()}`
                                : "Salary TBD"}
                        </Typography.Text>
                        <Typography.Text style={{ fontSize: "12px", color: "#777", marginLeft: "4px" }}>
                            /Month
                        </Typography.Text>
                    </Flex>
                </Col>
            </Row>
        </Card>
    );
}

export default JobCard;
