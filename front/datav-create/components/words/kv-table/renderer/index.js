/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/19.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Table} from 'antd4'
import useHandleEvent from "../../../../hooks/useHandleEvent";
import {genColumns} from "./util";
import './table.css'

export default function Renderer({component}){

    let {i:id,w,h,_ready,_data:data,table,columns:storeColumns,pagination} = component
    let [dataSource,setDataSource] = useState([])
    let [columns,setColumns] = useState([])

    let handleEvent = useHandleEvent()

    useEffect(() => {
        setDataSource(data)
    },[data])
    useEffect(() => {
        setColumns(genColumns(storeColumns,table))
    },[storeColumns,table])

    if(!_ready)
        return null

    function handleClick(e,record,index){
        handleEvent(id,'click',{_row: index},index)
    }

    let hMargin = 120
    if(pagination.position[0] != 'none' && pagination.position[1] != 'none')
        hMargin = 180
    return (
        <div style={{width: '100%',height: '100%',overflow: 'auto'}} className={'datav-antd-component datav-component-table'}>
            <Table
                size={table.size}
                bordered={table.borderShow}
                showHeader={table.headerShow}
                pagination={
                    pagination.position[0] == 'none' && pagination.position[1] == 'none' ? false : {
                        size: pagination.size,
                        position:pagination.position
                    }
                }
                scroll={table.headerFixed ? {y:h - hMargin} : false}
                dataSource={dataSource} columns={columns}
                onRow={(record,index) => {
                    return {
                        onClick: (e) => handleClick(e,record,index)
                    };
                }}
            />
        </div>
    )
}