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
import {Table,Input,Button,Tooltip,notification} from 'antd4'
import { DeleteOutlined,PlusOutlined } from '@ant-design/icons';

export default function GlobalVariableTable({variables:storeVariables,onCreate,onChange,onDelete}){

    let [variables,setVariables] = useState([])

    useEffect(() => {
        setVariables(Object.keys(storeVariables).map(variable => (
            {
                variable,
                value: storeVariables[variable]
            }
        )))
    },[storeVariables])

    function handleVariableChange(index,variable){
        setVariables(update(variables,{[index]: {variable: {$set: variable}}}))
    }
    function handleValueChange(index,value){
        setVariables(update(variables,{[index]: {value: {$set: value}}}))
    }
    function handleChange(index,record){
        let oldKey = Object.keys(storeVariables)[index]
        if(variables.filter(v => v.variable == record.variable).length > 1)
            notification.warn({message: '全局变量名不能重复'})
        else
            onChange(record,oldKey)
    }

    let columns = [{
        title: '变量名',
        dataIndex: 'variable',
        width: 120,
        render: (text,record,index) => {
            return <Input
                style={{width: '100%'}} size="small"
                value={text}
                onChange={e => handleVariableChange(index,e.target.value)}
                onBlur={() => handleChange(index,record)}
            />
        }
    },{
        title: '变量值',
        dataIndex: 'value',
        width: 260,
        render: (text,record,index) => {
            return <Input
                style={{width: '100%'}} size="small"
                value={text}
                onChange={e => handleValueChange(index,e.target.value)}
                onBlur={() => onChange(record)}
            />
        }
    },{
        title: '操作',
        dataIndex: 'variable',
        render: (text,record) => {
            return <Tooltip placement="bottom" title="移除">
                <DeleteOutlined onClick={() => onDelete(record.variable)}/>
            </Tooltip>
        }
    }]

    return (
        <>
            <Table
                size="small" pagination={false}
                locale={{emptyText: '无全局变量'}}
                columns={columns} dataSource={variables}
            />
            <Button
                style={{width: '100%',margin: '10px 0 10px 0'}}
                size="small" type="dashed" icon={<PlusOutlined/>}
                onClick={onCreate}
            >新建变量</Button>
        </>
    )
}