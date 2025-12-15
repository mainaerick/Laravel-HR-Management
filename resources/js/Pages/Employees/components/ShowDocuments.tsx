import React from 'react';
import {Employee} from "@/Pages/Employees/core/Model";
import {Button, Card, Col, Flex, Row, Typography} from "antd";
import {DownloadOutlined, EyeOutlined} from "@ant-design/icons";
import {router} from "@inertiajs/react";

type Props = {
    employee: Employee
}
type IconProp = {
    whichComponent:string
}
function ShowDocuments({employee}: Props) {

    const Icons = ({whichComponent}:IconProp) => {
        return (
            <Flex justify={"space-between"} gap={12} align={"center"}>
            <Button style={{border:"none"}} icon={<EyeOutlined style={{fontSize: 24}} onClick={()=>{
                const viewUrl = route('employee.view.file', [
                    employee.employee_id,
                    whichComponent.split('/').pop(),
                ]);
                window.open(viewUrl, '_blank');
            }}/>}></Button>
            <Button style={{border:"none"}} icon={<DownloadOutlined style={{fontSize: 24}} onClick={ () => {
                const downloadUrl = route('employee.download.file', [
                    employee.employee_id,
                    whichComponent.split('/').pop(),
                ]);
                window.location.href = downloadUrl;
            }}/>}></Button>
        </Flex>)
    }
    return (
        <div>
            <Row gutter={12}>
                <Col xs={24} xl={12} className={"mb-6"}>
                    {employee.appointment_letter && <Card>
                        <Flex justify={"space-between"} align={"center"}>
                            <Typography.Text>
                                Appointment Letter
                            </Typography.Text>

                            <Icons  whichComponent={employee.appointment_letter}/>
                        </Flex>
                    </Card>}
                </Col>
                <Col xs={24} xl={12} className={"mb-6"}>
                    {employee.experience_letter && <Card>
                        <Flex justify={"space-between"} align={"center"}>
                            <Typography.Text>
                                Experience Letter
                            </Typography.Text>

                            <Icons whichComponent={employee.experience_letter}/>
                        </Flex>
                    </Card>}
                </Col>


                {employee.reliving_letter && <Col xs={24} xl={12} className={"mb-6"}> <Card>
                    <Flex justify={"space-between"} align={"center"}>
                        <Typography.Text>
                            Reliving Letter
                        </Typography.Text>

                        <Icons whichComponent={employee.reliving_letter}/>
                    </Flex>
                </Card></Col>}

                {employee?.salary_slips?.length ? (
                    employee.salary_slips.map((salary_slip, key) => (
                        <Col key={key} xs={24} xl={12} className={"mb-6"}>
                            <Card>
                                <Flex justify={"space-between"} align={"center"}>
                                    <Typography.Text>
                                        Salary Slip {salary_slip.split('/').pop()}
                                    </Typography.Text>

                                    <Icons whichComponent={salary_slip}/>
                                </Flex>
                            </Card>
                        </Col>
                    ))
                ) : null}
            </Row>
        </div>
    );
}

export default ShowDocuments;
