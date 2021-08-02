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
import useCanvasReducer from "../../../../reducers/useCanvasReducer";
import {getInstanceByTypeId} from "../../../../common/common";
import seriesColors from "../../../../common/style/series_colors";
import {genOption} from "./util";

const subTypePrefix = 'hidden&geo&'
export default function Renderer({component}){

    let {
        i:id,_ready,_data,_child_ids,option:storeOption,globeRadius,
        autoRotate,heightTexture,nightLayer,cloudsLayer,ambientLight,mainLight
    } = component

    let [canvas] = useCanvasReducer()
    let {components,colors} = canvas

    let [option,setOption] = useState(storeOption)
    let [childOptions,setChildOptions] = useState([])
    let [tmpChild,setTmpChild] = useState(null)

    useEffect(() => {
        updateOption(genOption(
            _data,storeOption,autoRotate,heightTexture,nightLayer,
            cloudsLayer,ambientLight,mainLight,globeRadius
        ),childOptions)
    },[_data,storeOption,autoRotate,heightTexture,nightLayer,cloudsLayer,ambientLight,mainLight,globeRadius])
    useEffect(() => {
        if(tmpChild)
            handleChildChange(tmpChild)
    },[tmpChild])

    if(!_ready)
        return null

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
                co.data = co.data.map(d => ([d.start,d.end]))
                option.series.push({...co,type: 'lines3D',coordinateSystem: 'globe',blendMode: 'lighter'})
            }
            if(co.type == 'map'){
                let color
                if(co.colors && co.colors.length)
                    color = co.colors
                else
                    color = seriesColors[colors].value
                option.visualMap = color && color.length ?
                    [{show: co.show, inRange: {color}, seriesIndex: i}] :
                    [{show: co.show, seriesIndex: i}]
            }
        })
        setOption({...option})
    }

    return (
        <>
            {
                Object.keys(_child_ids).map(typeId => {
                    let {id,enabled} = _child_ids[typeId]
                    if(!enabled) return null
                    let cc = components[id]
                    let instance = getInstanceByTypeId(typeId)
                    if(!instance){
                        console.error(`${typeId}实例未定义`)
                        return null
                    }
                    let Renderer = instance.renderer
                    return <Renderer component={cc} onRender={(index,childOption) => setTmpChild({index,childOption})}/>
                })
            }
            <CommonEchartsRenderer id={id} option={option}/>
        </>
    )
}