/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/19.
 * Description:
 * Modified By:
 */
import React,{useEffect,useState} from 'react'
import update from 'immutability-helper';
import {Card,Tabs} from 'antd4'
import state from "../state";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import useInitComponent from "../../../../hooks/useInitComponent";
import ColumnsConfiger from "./ColumnsConfiger";
import TableConfiger from "./TableConfiger";
import PaginationConfiger from "./PaginationConfiger";
const {TabPane} = Tabs

export default function Configer({component}){

    let {i: id,_data:data,columns,table} = component

    let updateComponent = useUpdateComponent()

    //初始化state
    let ready = useInitComponent(component,state)

    useEffect(() => {
        if(data && data[0]){
            let newColumns = []
            Object.keys(data[0]).forEach(key => {
                let column = columns.find(c => c.dataIndex == key)
                if(column)
                    newColumns.push(column)
                else{
                    newColumns.push({
                        key, title: key, dataIndex: key,width: 120,
                        _show: true,_color: '',_fixed: false,_align: 'left'
                    })
                }
            })
            updateComponent(id,{columns: newColumns})
        }
    },[data])

    if(!ready)
        return null

    function handleTableChange(key,value) {
        updateComponent(id,{table: update(table,{[key]: {$set: value}})})
    }
    function handleColumnsChange(index,key,value) {
        updateComponent(id,{columns: update(columns,{[index]: {[key]: {$set: value}}})})
    }

    return (
        <>
            <Card
                size="small"
                bordered={false} style={{ width: '100%',height: '100%' }}
            >
                <Tabs size="small" style={{ width: '100%',height: '100%' }}>
                    <TabPane
                        key="1"
                        tab="表格配置"
                    >
                        <TableConfiger table={table} onChange={handleTableChange}/>
                    </TabPane>
                    <TabPane
                        key="2"
                        tab="字段配置"
                    >
                        <ColumnsConfiger columns={columns} onChange={handleColumnsChange}/>
                    </TabPane>
                </Tabs>
            </Card>
        </>
    )
}