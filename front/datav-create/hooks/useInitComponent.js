/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/31.
 * Description:
 * Modified By:
 */
import React,{useEffect} from 'react'
import useUpdateComponent from "./useUpdateComponent";
const cloneDeep = require('lodash/cloneDeep')
export default function useInitComponent(component,state){

    let {i: id,_ready} = component

    let updateComponent = useUpdateComponent()

    //初始化state
    useEffect(() => {
        !_ready && updateComponent(id,cloneDeep(state))
    },[id])

    return _ready
}