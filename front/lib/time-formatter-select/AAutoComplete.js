/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/30.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Dropdown,Menu,Input} from 'antd4'
import { UpOutlined,DownOutlined } from '@ant-design/icons';

export default function AAutoComplete({value:storeValue,dataSource,option,onChange}){

    let [value,setValue] = useState('')
    let [focus,setFocus] = useState(false)

    useEffect(() => setValue(storeValue),[storeValue])

    function handleBlur(value){
        setFocus(false)
        setValue(value)
        onChange(value)
    }

    return (
        <Dropdown
            overlay={
                <Menu>
                    {
                        dataSource.map((o,i) => (
                            <Menu.Item key={''+i} onClick={() => handleBlur(o.value)}>
                                <span>{o.name}</span>
                            </Menu.Item>
                        ))
                    }
                </Menu>
            }
            trigger={['click']}
        >
            <Input
                {...option}
                size="small"
                placeholder="请选择输入"
                suffix={
                    focus ?
                        <UpOutlined /> :
                        <DownOutlined />
                }
                value={value}
                onChange={e => setValue(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={e => handleBlur(e.target.value)}
            />
        </Dropdown>
    )
}