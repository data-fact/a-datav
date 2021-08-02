import React, {useState} from "react";
import useLogin from "../hooks/useLogin";
import {Button, Checkbox, Form, Input, Modal} from "antd4";

export default function LoginModel({visible,onCancel}){

    let [remember,setRemember] = useState(false)
    let [login,loading] = useLogin(success => {
        if(success)
            onCancel()
    })

    function handleFinish({username,password}){
        login({username,password,remember})
    }
    return <Modal
        title="登录"
        visible={visible}
        footer={null}
        onCancel={onCancel}
    >
        <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleFinish}
        >
            <Form.Item
                label="用户名"
                name="username"
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

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 16, span: 8 }}>
                <Checkbox checked={remember} onChange={e => setRemember(e.target.checked)}>记住我</Checkbox>
                <Button type="primary" htmlType="submit" loading={loading}>
                    登录
                </Button>
            </Form.Item>

        </Form>
    </Modal>
}