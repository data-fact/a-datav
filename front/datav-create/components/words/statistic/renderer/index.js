/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/19.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Statistic} from 'antd4'
import useHandleEvent from "../../../../hooks/useHandleEvent";
import useCanvasReducer from "../../../../reducers/useCanvasReducer";
import {getInstanceByTypeId} from "../../../../common/common";
import './statistic.css'

export default function Renderer({component}){

    let {i:id,_ready,_data:data,titleStyle,valueStyle,orient,padding,_child_ids} = component
    let [canvas] = useCanvasReducer()
    let {components} = canvas

    let handleEvent = useHandleEvent()

    if(!_ready)
        return null

    function handleClick(value){
        handleEvent(id,'click',{value})
    }

    if(!(data && data[0] && data[0].value))
        return null

    return (
        <div onClick={() => handleClick(data[0].value)}>
        <Statistic
            className="datav-antd-component datav-antd-statistic"
            style={{display: orient == 'vertical' ? '' : 'flex'}}
            title={
                <span style={{
                    paddingRight: orient == 'vertical' ? 0 : padding,
                    display: titleStyle.show ? 'inline' : 'none',
                    color: titleStyle.color,
                    fontSize: titleStyle.size,
                    fontFamily: titleStyle.family
                }}>
                    {titleStyle.title}
                </span>
            }
            value={data[0].value}
            precision={valueStyle.precision}
            valueStyle={{
                color: valueStyle.color,
                fontSize: valueStyle.size,
                fontFamily: valueStyle.family
            }}
            groupSeparator={valueStyle.groupSeparator}
            prefix={
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
                            return <Renderer component={cc}/>
                        })
                    }
                </>
            }
            suffix={valueStyle.suffix}
        />
        </div>
    )
}