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
import {genFunctionStr} from "../../../utils/util";
import useVariablePublish from "../../../hooks/useVariablePublish";
// const echarts = require('echarts')

let chartMap = {}
export default function CustomEchartsRenderer({id,optionExp,afterExp,data,name}){

    let publish = useVariablePublish()

    useEffect(() => {
        chartMap[id] = echarts.init(document.getElementById(id))
        console.info(`echart实例创建成功 id: ${name || id}, echart: `,chartMap[id])

        let resizeObserver = new ResizeObserver(() => {
            if(chartMap[id])
                chartMap[id].resize()
        })
        resizeObserver.observe(document.getElementById(id))
        return () => {
            chartMap[id] && chartMap[id].dispose()
            chartMap[id] = null
        }
    },[])
    useEffect(() => {
        if(chartMap[id]){
            try{
                let optionFunction
                eval(genFunctionStr('optionFunction','data',optionExp || ''))
                let option = optionFunction(data)
                if(option){
                    chartMap[id].setOption(option,true)
                    let echart = chartMap[id]
                    let afterFunction
                    chartMap[id].off()
                    eval(genFunctionStr('afterFunction','echart,data,publish',afterExp || ''))
                    afterFunction(echart,data,publish)
                } else
                    console.error(`${name || id} echarts option不正确`)
            }catch(e){
                console.error(name || id,e)
            }
        }else{
            console.error(`${name || id} echarts实例不存在`)
        }

    },[optionExp,afterExp,data])

    return (
        <div id={id} style={{height: '100%', width: '100%'}}></div>
    )
}