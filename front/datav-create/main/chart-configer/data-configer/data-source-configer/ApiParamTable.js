/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/20.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Table,Input,Button} from 'antd4'
import { DeleteOutlined,PlusOutlined } from '@ant-design/icons';
import AAutoComplete from "../../../../../lib/time-formatter-select/AAutoComplete";

export default function ApiParamTable({params:storeParams,onChange,variables}){

    let [params,setParams] = useState([])
    let [search,setSearch] = useState('')

    useEffect(() => setParams(storeParams),[storeParams])

    function handleAdd() {
        params = [...params]
        params.push({name: '',value: ''})
        setParams(params)
    }
    function handleChange(index,key,value) {
        params = [...params]
        params[index][key] = value
        setParams(params)
    }
    function handleNameBlur() {
        onChange(params)
    }
    function handleDelete(index) {
        params = [...params]
        params.splice(index,1)
        onChange(params)
    }
    function handleValueBlur(index,value) {
        params = [...params]
        params[index]['value'] = value
        onChange(params)
    }

    const columns = [
        {
            title: '参数名',
            dataIndex: 'name',
            key: 'name',
            render: (text,record,index) => {
                return (
                    <Input
                        size="small" value={text}
                        onChange={e => handleChange(index,'name',e.target.value)}
                        onBlur={handleNameBlur}
                    />
                )
            }
        },
        {
            title: '值',
            dataIndex: 'value',
            key: 'value',
            render: (text,record,index) => {
                return (
                    <>
                        <AAutoComplete
                            dataSource={Object.keys(variables).map(v => ({name: `\${vars.${v}}`,value: `\${vars.${v}}`}))}
                            option={{
                                style: {width: 180},
                                size: "small"
                            }}
                            value={text}
                            onChange={value => handleValueBlur(index,value)}
                        />
                        <DeleteOutlined onClick={() => handleDelete(index)}/>
                    </>
                )
            }
        }
    ]

    return (
        <>
            <Table
                pagination={false} locale={{emptyText: '无请求参数'}} size="small"
                dataSource={params} columns={columns}
            />
            <Button
                style={{width: '100%',margin: '10px 0 10px 0'}}
                size="small" type="dashed" icon={<PlusOutlined/>}
                onClick={handleAdd}
            >添加参数</Button>
        </>
    )
}