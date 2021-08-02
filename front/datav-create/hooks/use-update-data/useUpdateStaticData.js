/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/29.
 * Description:
 * Modified By:
 */
import React from 'react'
import {useUpdateComponentData} from "../useUpdateComponent";
import useCanvasReducer from "../../reducers/useCanvasReducer";
import useHandleData from "./useHandleData";

export default function useUpdateStaticData(){

    let [canvas] = useCanvasReducer()
    let updateComponentData = useUpdateComponentData()
    let handleData = useHandleData()
    let {variables} = canvas

    return (id,component,vars) => {
        if(!vars)
            vars = variables
        // updateComponentData(id,{_data_status: 3})
        let {_data_static:config} = component
        let {data} = config
        setTimeout(() => {
            let dataJson
            try {
                dataJson = eval(data)
                // dataJson = JSON.parse(data)
                if(!dataJson)
                    throw new Error()
            } catch (err){
                console.error(`静态数据解析失败 id:${id}`,err)
                updateComponentData(id,{_data_status: 2})
                return
            }
            handleData(id,component,dataJson,vars)
        },300)

    }
}