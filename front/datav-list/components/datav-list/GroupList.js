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
import {Card,Popover,Input} from 'antd4'
import { PlusOutlined } from '@ant-design/icons';
import useCreateFolder from "../../hooks/useCreateFolder";
import useFetchFolderList from "../../hooks/useFetchFolderList";
import useMainReducer from "../../reducers/useMainReducer";
import GroupItem from "./GroupItem";
import useUpdateFolder from "../../hooks/useUpdateFolder";
import useDeleteFolder from "../../hooks/useDeleteFolder";
import useFetchList from "../../hooks/useFetchList";

const marginTop = 195
export default function GroupList(){

    let [main,dispatch] = useMainReducer()
    let fetchList = useFetchList()
    let fetchFolderList = useFetchFolderList()
    let createFolder = useCreateFolder(() => fetchFolderList())
    let updateFolder = useUpdateFolder(() => fetchFolderList())
    let deleteFolder = useDeleteFolder(() => {
        fetchFolderList()
        fetchList()
    })
    let [height,setHeight] = useState(0)
    useEffect(() => {
        //监听屏幕大小改变
        let resizeObserver = new ResizeObserver(entries => {
            setHeight(document.body.offsetHeight - marginTop)
        })
        resizeObserver.observe(document.body)
    },[])

    function handleChecked(groupId) {
        dispatch({type: 'SET_CHECKED_GROUP_ID',groupId})
    }
    function handleChange(id,name){
        updateFolder({id,name})
    }
    function handleDelete(id){
        deleteFolder(id)
    }

    let folderList = [
        {id: 'all',name: '全部应用'},
        {id: '',name: '未分组'},
        ...main.folderList
    ]
    return (
        <Card
            className="transparent-card" size="small"
            title={<span style={{cursor: 'default'}}>我的分组</span>}
            extra={
                <Popover
                    placement="rightTop" title="创建分组" trigger="click"
                    content={
                        <Input
                            placeholder="名称" size="small"
                            onBlur={e => createFolder({name: e.target.value})}
                        />
                    }
                >
                    <PlusOutlined
                        style={{cursor: 'pointer'}}
                    />
                </Popover>
            }
        >
            <div style={{height,overflow: 'auto'}}>
            {
                folderList.map(folder => {
                    let count = folder.id == 'all' ?
                        main.list.length :
                        main.list.filter(l => (l.folderId || '') == folder.id).length
                    return <GroupItem
                        folder={folder} count={count}
                        checkedGroupId={main.checkedGroupId}
                        onClick={handleChecked}
                        onChange={handleChange}
                        onDelete={handleDelete}
                    />
                })
            }
            </div>
        </Card>
    )
}