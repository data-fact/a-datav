/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/10.
 * Description: 前两个参数 component,key 必填。第三个参数 record 如果不填，则用第四个参数 index 查找数据
 * Modified By:
 */
import React from 'react'
import useVariablePublish from "./useVariablePublish";
import useCanvasReducer from "../reducers/useCanvasReducer";
import {genFunctionStr} from "../utils/util";

export default function useHandleEvent(){

    let [canvas] = useCanvasReducer()
    let variablePublish = useVariablePublish()

    return (id,key,record,index) => {
        let component = canvas.components[id]
        if(!component){
            console.error(`组件不存在，id:${id}`)
            return
        }
        if (!record && isNaN(index)) {
            console.error(`事件参数异常，record:${record},index:${index},组件id:${id}`)
            return
        }
        let {_data,_events_or:events} = component
        let data = {}
        if(record)
            data = {...record}
        if(!isNaN(index)){
            data = Object.assign({},_data[index],data)
            data['_index'] = index
        }
        data['_id'] = id
        data['_event_id'] = UUID.generate()

        let event = events[key]
        if(!event){
            console.error(`不支持的事件类型: ${key}`)
            return
        }
        if(event.enabled){
            let {fields,exec} = event
            fields.forEach(f => {
                let {field,variable} = f
                if(field && variable && data[field] != undefined){
                    variablePublish(variable,data[field])
                }
            })
            //执行自定义逻辑
            if(exec && exec.enabled && exec.code){
                try{
                    let evalFunction
                    // let value = eval('`'+exec.code+'`')
                    eval(genFunctionStr('evalFunction','record,publish',exec.code))
                    evalFunction(data,variablePublish)
                }catch(e){
                    console.error("过滤器执行失败 id:" + id,e)
                }
            }
        }
    }
}