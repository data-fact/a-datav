/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React,{useEffect} from 'react'
import {Spin} from 'antd4'
import {getInstanceByTypeId} from "../../common/common";
import useUpdateData from "../../hooks/use-update-data/useUpdateData";
import {SHOW_HIDE_TYPE} from "../../common/constant";
import useCanvasReducer from "../../reducers/useCanvasReducer";
import {genFunctionStr, getVariableCounter} from "../../utils/util";
import './loader-border.css'
import ErrorBoundary from "../../../common/ErrorBoundary";

const initCount = {}
export default function CommonRenderer({component}){

    let {
        i: id,w,h,_typeId:typeId,_ready:ready,_show,_show_var,_show_eval,
        _data_type:dataType,_data, _data_default_or:dataDefault,_data_status:status
    } = component
    let [canvas] = useCanvasReducer()

    if(!ready){
        if(!initCount[id])
            initCount[id] = 0
        initCount[id] ++
        if(initCount[id] != 1) {
            console.error(`${typeId}组件state异常，或state未初始化`)
        }
        return null
    }

    let instance = getInstanceByTypeId(typeId)
    if(!instance){
        console.error(`${typeId}实例未定义`)
        return null
    }
    let Renderer = instance.renderer
    if(!Renderer){
        console.error(`${typeId}渲染器未定义`)
        return null
    }

    let updateData = useUpdateData()

    useEffect(() => {
        if(dataType == 'static' && !component['_data_static'].data)
            component['_data_static'] = {data:dataDefault}
        updateData(component.i,component)
    },[])
    // useEffect(() => {
    //     if(!_data.length && status == 1)
    //         updateData(component.i,component)
    // },[_data])

    if(_show == SHOW_HIDE_TYPE.hide)
        return null

    // if(status == 3)
    //     return <div style={{height: '100%', width: '100%',textAlign: 'center'}}>
    //         {
    //             w > 150 && h > 150 ?
    //                 <Loading/>
    //                 :
    //                 <Spin indicator={<LoadingOutlined spin />} />
    //         }
    //     </div>

    return (
        <>
            {
                status == 3 &&
                <div id="loader" className="loader loader-border is-active" data-text="" blink=""></div>
            }
            <ErrorBoundary>
                <Renderer component={component} />
            </ErrorBoundary>
        </>
    )
}