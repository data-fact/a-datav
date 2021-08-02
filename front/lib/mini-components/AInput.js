/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/2/20.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Input} from 'antd4'

export default function AInput(props){

    let {value:storeValue,onBlur} = props
    let [value,setValue] = useState('')
    useEffect(() => {
        if(storeValue)
            setValue(storeValue.replaceAll('\n', '\\n'))
    },[storeValue])

    function handleChange(e) {
        setValue(e.target.value)
    }
    function handleBlur(e) {
        let {value} = e.target
        onBlur && onBlur((value || '').replaceAll('\\n', '\n'))
    }
    return (
        <Input {...props} value={value} onChange={handleChange} onBlur={handleBlur}/>
    )
}