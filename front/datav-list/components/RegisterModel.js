import React, {useState} from "react";
import useLogin from "../hooks/useLogin";
import {Button, Checkbox, Form, Input, Modal} from "antd4";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import useRegister from "../hooks/useRegister";

export default function RegisterModel({visible,onCancel}){

    let [register,loading] = useRegister(success => {
        if(success)
            onCancel()
    })

    function handleFinish({userName,password}){
        register({userName,password})
    }
    return <Modal
        title="注册"
        visible={visible}
        footer={null}
        onCancel={onCancel}
    >
        <Form
            name="register"
            initialValues={{ remember: true }}
            onFinish={handleFinish}
        >
            <Form.Item
                label="用户名"
                name="userName"
                rules={[{ required: true, message: '请输入用户名' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label=""
                name="label"
            >
                <ExclamationCircleOutlined /> 这里只为演示，如需专业服务，请联系我们。
            </Form.Item>

            <Form.Item name="create" valuePropName="checked" wrapperCol={{ offset: 18, span: 6 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    注册
                </Button>
            </Form.Item>

        </Form>
    </Modal>
}