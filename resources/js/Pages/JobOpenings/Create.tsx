import React, {useState} from 'react';
import {Button, Form, Modal, Select} from 'antd';
import {useForm} from "@inertiajs/react";
import {JobOpening} from "@/Pages/JobOpenings/Core/Model";
import {Department} from "@/Pages/Departments/Core/Model";

const inputStyles = {
    borderRadius: 10,
    width: "100%",
    borderColor: "#A2A1A8"
}

interface CreateProps {
    departments?: Department[]
}

function Create ({departments}:CreateProps){
    const {data, setData, post, processing, errors}: any = useForm<JobOpening | any>({
            _method: "POST",
        }
    )
    return (
        <Form onFinish={() => {
        }} layout={"vertical"} initialValues={{}}><Form.Item
            name="state"
            rules={[{required: true, message: 'Please select your state'}]}
        >
            <Select
                style={inputStyles}
                size={"large"}
                placeholder="Select Department"
                onChange={(value) => setData("state", value)}
            >
                {departments.map((department) => {
                    return <Select.Option value={department.id}>{department.name}</Select.Option>
                })}

            </Select>
        </Form.Item></Form>
    );
};

export default Create;
