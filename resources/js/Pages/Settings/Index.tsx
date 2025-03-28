import React, { useState } from 'react';
import { Switch, Select, Flex, Typography, Card, message, Grid } from "antd";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useForm } from "@inertiajs/react";
import { JobOpening } from "@/Pages/JobOpenings/Core/Model";

const { useBreakpoint } = Grid;

function Index(props) {
    const [messageApi, contextHolder] = message.useMessage();
    const screens = useBreakpoint();

    const [theme, setTheme] = useState("light");
    const [language, setLanguage] = useState("English");
    const [notifications, setNotifications] = useState({
        mobile: true,
        desktop: true,
        email: true,
    });
    const { data, setData, put, processing, errors } = useForm<JobOpening | any>({});

    const updateSetting = (key, value) => {
        put(route("settings.update", { key }), {
            value,
            onSuccess: () => {
                message.success("Setting updated successfully!");
            },
            onError: (error) => {
                message.error("Failed to update setting.");
                console.error(error);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <Flex vertical className="m-0">
                    <Typography.Text className="text-lg font-semibold text-gray-800">Settings</Typography.Text>
                    <Typography.Text className="text-sm text-gray-500">All System Settings</Typography.Text>
                </Flex>
            }
        >
            <Card className="w-full max-w-xl mx-auto p-4 md:p-6" style={{ borderRadius: "10px" }}>
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                        <span className="font-semibold">Appearance</span>
                        <Select value={theme} onChange={setTheme} className="w-full md:w-32">
                            <Select.Option value="light">Light</Select.Option>
                            <Select.Option value="dark">Dark</Select.Option>
                        </Select>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                        <span className="font-semibold">Language</span>
                        <Select value={language} onChange={setLanguage} className="w-full md:w-32">
                            <Select.Option value="English">English</Select.Option>
                            <Select.Option value="Spanish">Spanish</Select.Option>
                        </Select>
                    </div>

                    <div>
                        <div className="font-semibold">Two-factor Authentication</div>
                        <p className="text-gray-500 text-sm">Keep your account secure by enabling 2FA via mail</p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                        <span className="font-semibold">Mobile Push Notifications</span>
                        <Switch
                            checked={notifications.mobile}
                            onChange={(checked) => setNotifications({ ...notifications, mobile: checked })}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                        <span className="font-semibold">Desktop Notification</span>
                        <Switch
                            checked={notifications.desktop}
                            onChange={(checked) => setNotifications({ ...notifications, desktop: checked })}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                        <span className="font-semibold">Email Notifications</span>
                        <Switch
                            checked={notifications.email}
                            onChange={(checked) => setNotifications({ ...notifications, email: checked })}
                        />
                    </div>
                </div>

                <div className="flex justify-center md:justify-end mt-6">
                    <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg shadow-md">
                        {theme === "light" ? <SunOutlined /> : <MoonOutlined />} &nbsp; {theme}
                    </button>
                </div>
            </Card>
        </AuthenticatedLayout>
    );
}

export default Index;
