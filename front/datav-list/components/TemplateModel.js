/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/18.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Modal,Tooltip,notification,Form,Input} from 'antd4'
import useMainReducer from "../reducers/useMainReducer";
import useFetchTemplateList from "../hooks/useFetchTemplateList";
import useCopyTemplate from "../hooks/useCopyTemplate";
import useFetchList from "../hooks/useFetchList";
import TemplateItem from "./TemplateItem";

let init = false
export default function TemplateModel(){

    let [main,dispatch] = useMainReducer()
    let [id,setId] = useState('')
    let [form] = Form.useForm()
    let fetchList = useFetchList()
    let fetchTemplateList = useFetchTemplateList()
    let copyTemplate = useCopyTemplate(id => {
        if(id){
            handleCancel()
            window.open(`edit/${id}`,"_blank")
            fetchList()
        }
    })

    useEffect(() => {
        if(main.showTemplateModel && !init){
            init = true
            fetchTemplateList()
        }
    },[main.showTemplateModel])

    function handleOk() {
        if(!id){
            notification.info({message: '请选择模版'})
            return
        }
        form
            .validateFields()
            .then(values => {
                let folderId = main.checkedGroupId == 'all' ? '' : main.checkedGroupId
                copyTemplate({...values,id,folderId})
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }
    function handleCancel() {
        dispatch({type: 'SET_SHOW_TEMPLATE_MODEL',show: false})
    }

    return (
        <Modal
            title="模版"
            style={{top: '10%'}}
            width={document.body.offsetWidth * 0.9}
            height={document.body.offsetHeight * 0.8}
            visible={main.showTemplateModel}
            okText="创建"
            cancelText="取消"
            onCancel={handleCancel}
            onOk={handleOk}
        >
            <Form
                layout="inline"
                form={form}
                name="basic"
                initialValues={{ remember: true }}
            >
                <Form.Item
                    label="名称"
                    name="name"
                    rules={[{ required: true, message: '请输入名称' }]}
                >
                    <Input style={{widht: 300}}/>
                </Form.Item>

                <Form.Item
                    label="描述"
                    name="descr"
                    rules={[{ required: false }]}
                >
                    <Input style={{width: 400}}/>
                </Form.Item>
            </Form>
            <div
                style={{
                    height: document.body.offsetHeight * 0.6,
                    display: 'flex', flexWrap: 'wrap',
                    overflow: 'auto'
                }}
            >
                {
                    main.templateList.map(template => (
                        <TemplateItem id={id} template={template} onClick={setId}/>
                    ))
                }
            </div>
        </Modal>
    )
}