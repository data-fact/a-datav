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
import useCanvasReducer from "../../reducers/useCanvasReducer";
import {useUpdateComponentData} from "../useUpdateComponent";
import fetch from "../../../common/fetch";
import useHandleData from "./useHandleData";
import {evalVarsStr} from "../../utils/util";

const dataCache = {}
export default function useUpdateApiData(){

    let [canvas] = useCanvasReducer()
    let updateComponentData = useUpdateComponentData()
    let handleData = useHandleData()
    let {variables} = canvas

    return (id,component,vars) => {
        let {_data_api:config} = component
        if(!config.url)
            return
        if(!vars)
            vars = variables
        let {method,url,body,show_loading} = config
        url = evalVarsStr(url,vars)
        body = evalVarsStr(body,vars)
        if(!url)
            return
        if(url.startsWith('//'))
            url = url.replace('//','../../')
        let requestBody = method == 'GET' ? null : {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        }
        let cacheKey = `${url}$${JSON.stringify(requestBody)}`
        if(dataCache[cacheKey]){
            handleData(id,component,dataCache[cacheKey],vars)
        }else{
            show_loading && updateComponentData(id,{_data_status: 3})
            fetch(url,requestBody)
                .then(res => res.json())
                .then(res => {
                    let {success,value} = res
                    if(!success)
                        throw new Error('数据不能为空')
                    if(!Array.isArray(value))
                        throw new Error('数据必须为数组')
                    show_loading && updateComponentData(id,{_data_status: 1})
                    handleData(id,component,value,vars)
                    dataCache[cacheKey] = value
                })
                .catch(err => {
                    console.error(`API数据请求失败 id:${id}`,err)
                    updateComponentData(id,{_data_status: 2})
                    handleData(id,component,[],vars)
                })
        }
    }
}