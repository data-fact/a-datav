/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React from 'react'
import useCanvasReducer from "../reducers/useCanvasReducer";

export default function useUpdateComponent(){

    let [,canvasDispatch] = useCanvasReducer()

    return (id,component) => {
        canvasDispatch({type: 'UPDATE_COMPONENT',id, component})
    }
}
export function useUpdateComponentData(){

    let [,canvasDispatch] = useCanvasReducer()

    return (id,component) => {
        canvasDispatch({type: 'UPDATE_COMPONENT_DATA',id, component})
    }
}