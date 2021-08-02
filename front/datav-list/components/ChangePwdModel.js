import React, {useState} from "react";
import useLogin from "../hooks/useLogin";
import {Button, Checkbox, Form, Input, Modal} from "antd4";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import useRegister from "../hooks/useRegister";
import useChangePwd from "../hooks/useChangePwd";

export default function ChangePwdModel({visible,onCancel}){

    let [changePwd,loading] = useChangePwd(success => {
        if(success){
            onCancel()
        }
    })

    function handleFinish({password,newPwd}){
        changePwd({password,newPwd})
    }
    return <Modal
        title="修改密码"
        visible={visible}
        footer={null}
        onCancel={onCancel}
    >
        <Form
            name="changePwd"
            initialValues={{ remember: true }}
            onFinish={handleFinish}
        >
            <Form.Item
                label="旧密码"
                name="password"
                rules={[{ required: true, message: '请输入旧密码' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="新密码"
                name="newPwd"
                rules={[{ required: true, message: '请输入新密码' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="change" valuePropName="checked" wrapperCol={{ offset: 18, span: 6 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    修改密码
                </Button>
            </Form.Item>

        </Form>
    </Modal>
}