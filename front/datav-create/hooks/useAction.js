/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/30.
 * Description:
 * Modified By:
 */
import React from 'react'
import useCanvasReducer from "../reducers/useCanvasReducer";
import useSupportReducer from "../reducers/useSupportReducer";
import {getInstanceByTypeId} from "../common/common";

export function useAddFilter(){

    let [,canvasDispatch] = useCanvasReducer()

    return (id,filter) => {
        canvasDispatch({type: 'ADD_FILTER',id, filter})
    }
}

export function useUpdateFilter(){

    let [,canvasDispatch] = useCanvasReducer()

    return (id,filter) => {
        canvasDispatch({type: 'UPDATE_FILTER',id, filter})
    }
}

export function useCreateVariable() {

    let [,canvasDispatch] = useCanvasReducer()

    return () => {
        canvasDispatch({type: 'CREATE_VARIABLE',key: '',value: ''})
    }
}
export function useUpdateVariable() {

    let [,canvasDispatch] = useCanvasReducer()

    return (key,value,oldKey) => {
        canvasDispatch({type: 'UPDATE_VARIABLE',oldKey,key,value})
    }
}
export function useDeleteVariable() {

    let [,canvasDispatch] = useCanvasReducer()

    return (key) => {
        canvasDispatch({type: 'DELETE_VARIABLE',key})
    }
}
export function useSetMainLoading() {
    let [,supportDispatch] = useSupportReducer()

    return loading => {
        supportDispatch({type: 'SET_LOADING',loading})
    }
}
export function useAddComponent() {

    let [,canvasDispatch] = useCanvasReducer()

    return (initComponent = {},configer,renderer) => {
        let {_typeId,_typeNav,_typeName} = initComponent
        if(!configer || !renderer){
            let instance = getInstanceByTypeId(_typeId)
            configer = configer || instance.configer
            renderer = renderer || instance.renderer
        }
        if(!configer){
            console.error(`${_typeNav} 未定义配置模版`)
            return
        }
        if(!renderer){
            console.error(`${_typeNav} 未定义渲染器`)
            return
        }
        let id = UUID.generate()
        let _name = _typeName + '-' + id.substr(0,8)
        canvasDispatch({
            type: 'ADD_COMPONENT',id,
            component: {...initComponent,_typeNav,_name,_descr: '',i:id}
        })
        return id
    }
}