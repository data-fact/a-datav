/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Input,Divider} from 'antd4'
import useUpdateComponent from "../../../hooks/useUpdateComponent";
import state from "../state";
import VscodeEditor from "../../../../lib/vscode-editor/VscodeEditor";
import useInitComponent from "../../../hooks/useInitComponent";

const { TextArea } = Input

export default function Configer({component}){

    let {i: id,option: storeOption,after: storeAfter} = component

    let [option,setOption] = useState('')
    let [after,setAfter] = useState('')

    let updateComponent = useUpdateComponent()

    //初始化state
    let ready = useInitComponent(component,state)

    useEffect(() => {
        setOption(storeOption)
        setAfter(storeAfter)
    },[storeOption,storeAfter])

    if(!ready)
        return null

    function handleOptionChange(option) {
        updateComponent(id,{option})
    }
    function handleAfterChange(after) {
        updateComponent(id,{after})
    }

    return (
        <>
            <span>echarts属性配置函数</span>
            <VscodeEditor
                id={id}
                suggestions={[{label: 'data',insertText: 'data',detail: '数据'}]}
                height={180} header={'option(data)'}
                options={{minimap: {enabled: false}}}
                onBlur={handleOptionChange}
                value={option}
            />
            <Divider/>
            <span>图表渲染之后执行</span>
            <VscodeEditor
                id={id}
                suggestions={[
                    {label: 'echart',insertText: 'echart',detail: 'echart实例'},
                    {label: 'data',insertText: 'data',detail: '数据'},
                    {label: 'publish(key,value)',insertText: 'publish(key,value)',detail: '发布全局变量'}
                ]}
                height={180} header={'after(echart,data,publish)'}
                options={{minimap: {enabled: false}}}
                onBlur={handleAfterChange}
                value={after}
            />
        {/*<TextArea rows={5} value={after} onChange={e => {setAfter(e.target.value)}} onBlur={e => {handleAfterChange(e.target.value)}} />*/}
        </>
    )
}