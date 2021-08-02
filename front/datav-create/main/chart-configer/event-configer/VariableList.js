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
import {Button,Table,Input,Select,Tooltip,notification} from 'antd4'
import { DeleteOutlined,PlusOutlined } from '@ant-design/icons';
import {VARIABLE_TYPE} from "../../../common/constant";

const {Option} = Select

export default function VariableList({variables:storeVariables,onCreate,onChange,onDelete}){

    let [variables,setVariables] = useState([])

    useEffect(() => {
        setVariables(Object.keys(storeVariables).map(variable => (
            {
                variable,
                value: storeVariables[variable].value,
                type: storeVariables[variable].type,
                custom: storeVariables[variable].custom
            }
        )))
    },[storeVariables])

    function handleVariableChange(index,variable){
        setVariables(update(variables,{[index]: {variable: {$set: variable}}}))
    }
    function handleValueChange(index,value){
        setVariables(update(variables,{[index]: {value: {$set: value}}}))
    }
    function handleTypeChange(record,value){
        record.type = value
        onChange(record)
    }
    function handleChange(index,record){
        let oldKey = Object.keys(storeVariables)[index]
        if(variables.filter(v => v.variable == record.variable).length > 1)
            notification.warn({message: '变量名不能重复'})
        else
            onChange(record,oldKey)
    }

    let columns = [{
        title: '变量名',
        dataIndex: 'variable',
        width: '30%',
        render: (text,record,index) => {
            // if(record.custom)
                return <Input
                    size="small"
                    style={{width: '100%'}}
                    value={text}
                    onChange={e => handleVariableChange(index,e.target.value)}
                    onBlur={() => handleChange(index,record)}
                />
            // return text
        }
    },{
        title: '默认值',
        dataIndex: 'value',
        width: '30%',
        render: (text,record,index) => {
            return <Input
                size="small"
                style={{width: '100%'}}
                value={text}
                onChange={e => handleValueChange(index,e.target.value)}
                onBlur={() => onChange(record)}
            />
        }
    },{
        title: '绑定',
        dataIndex: 'type',
        width: '40%',
        render: (text,record) => {
            return (
                <>
                    <Select style={{width: 80}} size="small" value={text} onChange={v => handleTypeChange(record,v)}>
                        <Option value={VARIABLE_TYPE.data}>数据源</Option>
                        <Option value={VARIABLE_TYPE.filter}>过滤器</Option>
                    </Select>
                    <Tooltip placement="bottom" title="移除">
                        <DeleteOutlined onClick={() => onDelete(record.variable)} />
                    </Tooltip>
                </>
            )
        }
    }]

    return (
        <>
            <Table
                size="small" pagination={false}
                locale={{emptyText: '无组件变量'}}
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