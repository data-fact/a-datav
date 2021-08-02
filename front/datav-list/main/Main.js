/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/14.
 * Description:
 * Modified By:
 */
import React,{useEffect} from 'react'
import {Tabs} from 'antd4'
import { FundViewOutlined } from '@ant-design/icons';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import useFetchList from "../hooks/useFetchList";
import useMainReducer from "../reducers/useMainReducer";
import DatavList from "../components/datav-list";
import CreateModel from "../components/CreateModel";
import useFetchFolderList from "../hooks/useFetchFolderList";
import MoveModel from "../components/MoveModel";
import useCreateNew from "../hooks/useCreateNew";
import useCopyNew from "../hooks/useCopyNew";
import useCreateTemplate from "../hooks/useCreateTemplate";
import TemplateModel from "../components/TemplateModel";
import LoginBox from "../components/LoginBox";
import {getTokenUser} from "../../utils/token.util";
const { TabPane } = Tabs;

export default function Main(){

    let [main,dispatch] = useMainReducer()
    let fetchList = useFetchList()
    let fetchFolderList = useFetchFolderList()

    useEffect(() => {
        fetchList()
        fetchFolderList()
        let user = getTokenUser()
        if(user)
            dispatch({type: 'SET_USER',user})
    },[])
    useEffect(() => {
        if(main.loading)
            NProgress.start();
        else
            NProgress.done();
    },[main.loading])

    let createNew = useCreateNew(id => {
        if(id){
            handleCancelCreate()
            window.open(`edit/${id}`,"_blank")
            fetchList()
        }
    })
    let copyNew = useCopyNew(id => {
        if(id){
            handleCancelCopy()
            window.open(`edit/${id}`,"_blank")
            fetchList()
        }
    })
    let createTemplate = useCreateTemplate(id => {
        if(id){
            handleCancelCopyTemplate()
        }
    })

    function handleCancelCreate() {
        dispatch({type: 'SET_SHOW_CREATE_NEW',show: false})
    }
    function handleCancelCopy() {
        dispatch({type: 'SET_COPY_MODEL',show: false,copyId: undefined})
    }
    function handleCancelCopyTemplate() {
        dispatch({type: 'SET_COPY_TEMPLATE_MODEL',show: false,copyId: undefined})
    }

    return (
        <div style={tabStyle}>
            <Tabs
                defaultActiveKey="2"
                tabBarExtraContent={<LoginBox/>}
            >
                <TabPane
                    tab={
                        <span>
                          <FundViewOutlined />
                          我的可视化
                        </span>
                    }
                    key="1"
                >
                    <DatavList/>
                </TabPane>
            </Tabs>
            <CreateModel title="创建大屏" show={main.showCreateNew} onCreate={createNew} onCancel={handleCancelCreate}/>
            <CreateModel
                title="复制大屏"
                show={main.showCopyModel}
                onCreate={datav => {
                    datav.id = main.copyId
                    copyNew(datav)
                }}
                onCancel={handleCancelCopy}
            />
            <CreateModel
                title="创建为模版"
                show={main.showCopyTemplateModel}
                onCreate={datav => {
                    datav.id = main.copyTemplateId
                    createTemplate(datav)
                }}
                onCancel={handleCancelCopyTemplate}
            />
            <MoveModel/>
            <TemplateModel/>
        </div>
    )
}
const tabStyle = {
    padding: '20px 50px 0 50px',
    height: '100%',
    background: '#171b22'
}