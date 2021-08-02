/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/16.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Modal,Form, Input} from 'antd4'
import useMainReducer from "../reducers/useMainReducer";
import useCreateNew from "../hooks/useCreateNew";
import useFetchList from "../hooks/useFetchList";

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
export default function CreateModel({title,show,onCreate,onCancel}){

    let [main,dispatch] = useMainReducer()
    let [form] = Form.useForm()

    function handleOk() {
        form
            .validateFields()
            .then(values => {
                let folderId = main.checkedGroupId == 'all' ? '' : main.checkedGroupId
                onCreate({...values,folderId})
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }

    return (
        <Modal
            title={title}
            visible={show}
            okText="创建"
            cancelText="取消"
            onCancel={onCancel}
            onOk={handleOk}
        >
            <Form
                {...layout}
                form={form}
                name="basic"
                initialValues={{ remember: true }}
            >
                <Form.Item
                    label="名称"
                    name="name"
                    rules={[{ required: true, message: '请输入名称' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="描述"
                    name="descr"
                    rules={[{ required: false }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}