/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/1/20.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import Markdown from 'react-markdown'

export default function Renderer({component}){

    let {i: id,_ready,_data,value:storeValue,color} = component

    let [value,setValue] = useState('')
    useEffect(() => {
        let value = evalText(storeValue,_data,id)
        setValue(value)
    },[storeValue,_data,id])

    if(!_ready)
        return null

    return (
        <>
            <div style={{width: '100%',height: '100%',padding: 10,color}}>
                <Markdown allowDangerousHtml={true}>{value}</Markdown>
            </div>
        </>
    )
}
function evalText(text,data,id) {
    let value = ''
    try{
        value = eval('`' + text.replaceAll('`','\\`') + '`')
    }catch (e) {
        console.error(`markdown组件 ${id} 文本字符串异常`,e)
    }
    return value
}