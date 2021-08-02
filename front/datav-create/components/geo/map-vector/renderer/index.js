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
import update from 'immutability-helper';
import useHandleEvent from "../../../../hooks/useHandleEvent";
import CommonEchartsRenderer from "../../../common/CommonEchartsRenderer";
import {genOption} from "./util";
import useCanvasReducer from "../../../../reducers/useCanvasReducer";
import {getInstanceByTypeId} from "../../../../common/common";

const subTypePrefix = 'hidden&geo&'
export default function Renderer({component}){

    let {i:id,_data,_ready,option:storeOption,_child_ids} = component
    let [canvas] = useCanvasReducer()
    let [option,setOption] = useState(storeOption)
    let {components,colors} = canvas

    let [childOptions,setChildOptions] = useState([])
    let [tmpChild,setTmpChild] = useState(null)
    let [clickValue,setClickValue] = useState(null)
    let handleEvent = useHandleEvent()

    useEffect(() => {
        if(clickValue == null) return
        let {type,region,data} = clickValue
        if(!type) return
        let child
        switch (type) {
            case 'geo':
                if(region)
                    handleEvent(id,'click',{region})
                break ;
            case 'map':
                if(!data) return
                child = _child_ids[`${subTypePrefix}visual`]
                if(child && child.enabled && child.id){
                    let {_index} = data
                    handleEvent(child.id,'click',null,_index)
                }
                break ;
            case 'lines':
                if(!data) return
                child = _child_ids[`${subTypePrefix}lines`]
                if(child && child.enabled && child.id){
                    let _index = data[2]
                    // if(coords && coords[0] && coords[1])
                    //     handleEvent(child.id,'click',{start:coords[0].join(','),end:coords[1].join(',')})
                    handleEvent(child.id,'click',null,_index)
                }
                break ;
        }

    },[clickValue])

    useEffect(() => {
        updateOption(storeOption,childOptions)
    },[storeOption])
    useEffect(() => {
        updateOption(option,childOptions)
    },[colors])
    useEffect(() => {
        if(tmpChild)
            handleChildChange(tmpChild)
    },[tmpChild])

    if(!_ready)
        return null

    function handleInit(echart) {
        echart.off()
        echart.on('click',e => {
            let {name:region,data,componentType,componentSubType} = e
            let type = componentType == 'geo' ? 'geo' :  componentSubType
            setClickValue({type,region,data})
        })
    }

    function handleChildChange({index,childOption}){
        let newChildOptions = update(childOptions,{
                [index]: {$set: childOption}
            })
        setChildOptions(newChildOptions)
        updateOption(option,newChildOptions)
    }
    function updateOption(option,childOptions){
        option.series = []
        option.visualMap = null
        childOptions.forEach((co,i) => {
            if(!co) return
            co = {...co}
            if(co.type == 'lines'){
                co.data = co.data.map(d => ([d.start,d.end,d._index]))
                option.series.push(co)
            }
            if(co.type == 'map'){
                option.visualMap = co.visualMap
                co.map = option.geo.map
                option.series.push(co)
                // let color
                // if(co.colors && co.colors.length)
                //     color = co.colors
                // else
                //     color = seriesColors[colors].value
                // option.visualMap = color && color.length ?
                //     [{show: co.show, inRange: {color}, seriesIndex: i}] :
                //     [{show: co.show, seriesIndex: i}]
            }
        })
        setOption({...option})
    }

    let region = _data && _data[0] && _data[0].region ? _data[0].region : null
    if(region)
        option.geo.map = region

    return (
        <>
            {
                Object.keys(_child_ids).map(typeId => {
                    let {id,enabled} = _child_ids[typeId]
                    if(!enabled) return null
                    let cc = components[id]
                    let instance = getInstanceByTypeId(typeId)
                    if(!instance || !instance.renderer){
                        console.error(`${typeId}实例未定义`)
                        return null
                    }
                    let Renderer = instance.renderer
                    return <Renderer component={cc} onRender={(index,childOption) => setTmpChild({index,childOption})}/>
                })
            }
            <CommonEchartsRenderer id={id} option={option} getInstance={handleInit}/>
        </>
    )
}

// function CommonSubRenderer({id,enabled,components,onRender}) {
//
//     if(!enabled) return null
//     let cc = components[id]
//     let instance = getInstanceByTypeId(typeId)
//     if(!instance){
//         console.error(`${typeId}实例未定义`)
//         return null
//     }
//     let Renderer = instance.renderer
//     return <Renderer component={cc} onRender={onRender}/>
// }