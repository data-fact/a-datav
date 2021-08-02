/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/30.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Input} from 'antd4'
import { EditOutlined } from '@ant-design/icons';

export default function FilterEditorTitle({filter,onChange}){

    let {id,name:storeName} = filter
    let [edit,setEdit] = useState(false)
    let [name,setName] = useState('')

    useEffect(() => setName(storeName),[storeName])

    return (
        <>
            {
                edit ?
                    <Input
                        style={{width: 180}}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onBlur={() => {
                            setEdit(false)
                            onChange(name)
                        }}
                    />
                    :
                    <>
                        <span style={{paddingRight: 10}}>{name}</span>
                        <EditOutlined onClick={() => setEdit(true)}/>
                    </>
            }
        </>
    )
}