/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/10.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import update from 'immutability-helper';
import {Button,Table,Input} from 'antd4'
import { PlusOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';

export default function EventMapList({fields:storeFields,isIndex,onChange}){

    let [fields,setFields] = useState([])

    useEffect(() => {
        if(isIndex && !storeFields.find(f => f.field == '_index'))
            storeFields = [{ field: '_index', variable: '', descr: '数据角标' },...storeFields]
        if(!storeFields.find(f => f.field == '_event_id'))
            storeFields = [{ field: '_event_id', variable: '', descr: '事件id' },...storeFields]
        if(!storeFields.find(f => f.field == '_id'))
            storeFields = [{ field: '_id', variable: '', descr: '组件id' },...storeFields]
        setFields(storeFields)
    },[storeFields])

    function handleChange(index,variable){
        setFields(update(fields,{[index]: {variable: {$set: variable}}}))
    }
    function handleKeyChange(index,field){
        setFields(update(fields,{[index]: {field: {$set: field}}}))
    }
    function handleCreate(){
        setFields(update(fields,{$push: [{field: '',variable: '',descr: '', custom: true}]}))
    }
    function handleDelete(index){
        let newFields = update(fields,{$splice: [[index,1]]})
        onChange(newFields)
    }

    let columns = [{
        title: '字段',
        dataIndex: 'field',
        width: 80,
        render: (text,record,index) => {
            if(record.custom)
                return <Input
                    style={{width: 60}} size="small"
                    value={text}
                    onChange={e => handleKeyChange(index,e.target.value)}
                    onBlur={() => onChange(fields)}
                />
            return text
        }
    },{
        title: '绑定变量',
        dataIndex: 'variable',
        width: 60,
        render: (text,record,index) => {
            return <Input
                style={{width: 60}} size="small"
                value={text}
                onChange={e => handleChange(index,e.target.value)}
                onBlur={() => onChange(fields,text)}
            />
        }
    },{
        title: '描述',
        dataIndex: 'descr',
        width: 80,
        render: (text,record,index) => {
            if(record.custom)
                return <DeleteOutlined onClick={() => handleDelete(index)} />
            return text
        }
    }]

    return (
        <>
            <Table
                size="small" pagination={false}
                locale={{emptyText: '无字段映射'}}
                columns={columns} dataSource={fields}
            />
            {
                isIndex &&
                <Button
                    style={{width: '100%',margin: '10px 0 10px 0'}}
                    size="small" type="dashed" icon={<PlusOutlined/>}
                    onClick={handleCreate}
                >新建字段</Button>
            }
        </>
    )
}