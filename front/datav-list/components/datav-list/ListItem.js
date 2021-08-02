/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/15.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import { Card,Input,Tooltip,Dropdown,Menu,Modal,Popover,Image } from 'antd4';
import {
    EditOutlined,EyeOutlined, DeleteOutlined, FundViewOutlined,
    FundProjectionScreenOutlined,EllipsisOutlined,ExclamationCircleOutlined,
    FolderOpenOutlined,CopyOutlined,SaveOutlined,QrcodeOutlined
} from '@ant-design/icons';
import {genImageUrl} from "../../../utils/util";
import {emptyImage} from "../../../utils/util";
import useMainReducer from "../../reducers/useMainReducer";
import useDelete from "../../hooks/useDelete";
import useFetchList from "../../hooks/useFetchList";
import useUpdateDatav from "../../hooks/useUpdateDatav";
import QRCode from 'qrcode.react'
const { Meta } = Card
const { confirm,info } = Modal

export default function ListItem({item}){

    let {id,name:storeName,descr:storeDescr,image} = item
    let [main,dispatch] = useMainReducer()
    let [edit,setEdit] = useState(false)
    let fetchList = useFetchList()
    let doDelete = useDelete(() => fetchList())
    let updateDatav = useUpdateDatav(success => {
        if(success){
            setEdit(false)
            fetchList()
        }
        else{
            setName(storeName)
            setDescr(storeDescr)
        }
    })

    let [name,setName] = useState('')
    let [descr,setDescr] = useState('')
    useEffect(() => setName(storeName),[storeName])
    useEffect(() => setDescr(storeDescr),[storeDescr])

    function handleEdit() {
        window.open(`edit/${id}`,"_blank")
    }
    function handleView() {
        window.open(getViewUrl(id),"_blank")
    }
    function handleNameBlur(name) {
        updateDatav({id,name})
    }
    function handleDescrBlur(descr) {
        updateDatav({id,descr})
    }
    function handleDelete() {
        confirm({
            title: '确定删除?',
            icon: <ExclamationCircleOutlined />,
            content: '删除后无法恢复',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            centered: true,
            onOk() {
                doDelete(id)
            }
        });
    }
    function handleMove() {
        dispatch({type: 'SET_MOVE_MODEL',show: true,id})
    }
    function handleCopyNew() {
        dispatch({type: 'SET_COPY_MODEL',show: true,id})
    }
    function handleCopyTemplate() {
        dispatch({type: 'SET_COPY_TEMPLATE_MODEL',show: true,id})
    }
    function handleShowQRCode() {
        info({
            title: '预览二维码',
            okText: '关闭',
            content: <QRCode value={getViewUrl(id)}/>,
            style: {width: 260},
            centered: true
        });
    }

    return (
        <Card
            size="small"
            style={{ width: 220, margin: 20 }}
            cover={
                <Image
                    style={{objectFit: 'contain'}}
                    height={120}
                    src={genImageUrl(image)}
                    fallback={emptyImage}
                    placeholder={<></>}
                    // preview={{mask: <EyeOutlined/>}}
                />
            }
            actions={[
                <Tooltip placement="bottom" title="编辑">
                    <FundProjectionScreenOutlined key="edit" onClick={handleEdit}/>
                </Tooltip>,
                <Tooltip placement="bottom" title="查看">
                    <FundViewOutlined key="setting" onClick={handleView}/>
                </Tooltip>,
                <Tooltip placement="bottom" title="编辑名称">
                    <Popover
                        placement="topLeft" title="编辑" trigger="click"
                        content={
                            <div style={{width: 200}}>
                                <Input
                                    size="small" placeholder="名称" value={name}
                                    onChange={e => setName(e.target.value)}
                                    onBlur={e => handleNameBlur(e.target.value)}
                                />
                                <Input
                                    size="small" placeholder="描述" value={descr}
                                    onChange={e => setDescr(e.target.value)}
                                    onBlur={e => handleDescrBlur(e.target.value)}
                                />
                            </div>
                        }
                    >
                        <EditOutlined key="edit"/>
                    </Popover>
                </Tooltip>,
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item>
                                <span onClick={handleDelete}><DeleteOutlined key="delete"/>删除</span>
                            </Menu.Item>
                            <Menu.Item>
                                <span onClick={handleCopyNew}><CopyOutlined key="move"/>复制</span>
                            </Menu.Item>
                            <Menu.Item>
                                <span onClick={handleMove}><FolderOpenOutlined key="move"/>移动到分组</span>
                            </Menu.Item>
                            <Menu.Item>
                                <span onClick={handleShowQRCode}><QrcodeOutlined key="qrcode"/>预览二维码</span>
                            </Menu.Item>
                            {
                                _user_id == '1' &&
                                <Menu.Item>
                                    <span title="仅超级管理员" onClick={handleCopyTemplate}><SaveOutlined key="move"/>创建为模版</span>
                                </Menu.Item>
                            }
                        </Menu>
                    }
                    placement="bottomLeft"
                >
                    <EllipsisOutlined/>
                </Dropdown>
            ]}
        >
            <Tooltip placement="top" title={descr}>
            <Meta
                title={
                    edit ?
                        <Input
                            size="small" placeholder="名称" value={name}
                            onChange={e => setName(e.target.value)}
                            onBlur={e => handleNameBlur(e.target.value)}
                        />
                        :
                        <span
                            title={name}
                            className="span-ellipsis"
                        >{name}</span>
                }
                // description={
                //     edit ?
                //         <Input
                //             size="small" placeholder="描述" value={descr}
                //             onChange={e => setDescr(e.target.value)}
                //             onBlur={e => handleDescrBlur(e.target.value)}
                //         />
                //         :
                //         <span
                //             title={descr}
                //             className="span-ellipsis"
                //         >{descr || '无描述'}</span>
                // }
            />
            </Tooltip>
        </Card>
    )
}

export function CreaterItem(){

    let [main,dispatch] = useMainReducer()

    function handleCreateNew() {
        dispatch({type: 'SET_SHOW_CREATE_NEW',show: true})
    }
    function handleShowTemplate() {
        dispatch({type: 'SET_SHOW_TEMPLATE_MODEL',show: true})
    }
    return (
        <Card
            size="small"
            style={{
                width: 220, margin: 20, height: 218,
                backgroundImage: 'linear-gradient(-90deg,rgba(0,161,255,.39) 0,rgba(0,137,255,.19) 100%)'
            }}
            bodyStyle={{
                flexDirection: 'column', display: 'flex', border: '1px solid #177ddc',
                height: '100%',alignItems: 'center',padding: 0
            }}
        >
            <div className="create-box create-new" onClick={handleCreateNew}>
                <span>新建可视化</span>
            </div>
            <div className="create-box" onClick={handleShowTemplate}>
                <span>从模版创建</span>
            </div>
        </Card>
    )
}

function getViewUrl(id) {
    return `view/${id}`
}