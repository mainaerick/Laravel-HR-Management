import React from 'react';
import {Button, Card, Col, Flex, Modal, Row, Typography} from "antd";
import Meta from "antd/es/card/Meta";
import {ContainerOutlined, EnvironmentOutlined} from "@ant-design/icons";
import {Department} from "@/Pages/Departments/Core/Model";
import Create from "@/Pages/JobOpenings/Create";

const buttonsStyle = {padding:"10px", backgroundColor:"#7152F3", color:"white", fontSize:12,width:"60px"}

type Props = {
    jobId:any
    department:string| null|undefined,
    e_type:string | null
    title:string| null
    location:string| null
    salary:number| null
    status:string| null
    city:string| null
    jobClick:(jobId:any)=>void
}
function JobCard({jobId,department,
                     e_type,
                     title,
                     location,
                     salary,city,
                     status,jobClick}:Props) {

    return (
        <Card className={"m-3"} hoverable={true} onClick={()=>jobClick(jobId)}>

            <Meta avatar={<ContainerOutlined style={{fontSize:"24px"}} />} title={title} description={department} />
            <Row gutter={16} style={{marginTop:"23px",marginBottom:"23px"}}>
                <Col className="gutter-row" span={6} >
                    <Button style={buttonsStyle}>
                        {department}
                    </Button>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Button style={buttonsStyle}>
                        {e_type}</Button>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Button style={buttonsStyle}>
                        {location}</Button>
                </Col>
            </Row>
            <Row align={"middle"}>
                <Col span={8}>
                    <Flex justify={"flex-start"} align={"center"}><EnvironmentOutlined style={{fontSize:"24px"}} /><Typography.Text style={{fontSize:"14px"}}>{city}</Typography.Text></Flex>
                </Col>
                <Col span={16}>
                    <Flex justify={"flex-end"} align={"center"}>
                        <Typography.Text className={"font-bold"} style={{fontSize:"18px"}}>
                            KSH{salary}
                        </Typography.Text>
                        <Typography.Text style={{fontSize:"18px"}}>
                            /Month
                        </Typography.Text>
                    </Flex>
                </Col>

            </Row>
        </Card>
    );
}

export default JobCard;
