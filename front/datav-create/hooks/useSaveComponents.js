/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/24.
 * Description:
 * Modified By:
 */
import React from 'react'
import {notification} from 'antd4'
import {useSetMainLoading} from "./useAction";
import fetch from "../../common/fetch";
import exception from "../../common/exception";
import useCanvasReducer from "../reducers/useCanvasReducer";

export default function useSaveComponents(){

    let setLoading = useSetMainLoading()

    function saveComponents(components) {
        setLoading(true)
        fetch(`../component/update`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(components)
        })
            .then(res => {
                setLoading(false)
                if(res.ok)
                    return res.text()
                else
                    return exception(res)
            })
            .then(res => {
                if(!+res)
                    console.error({message: '保存失败',description: res})
            })
            .catch(err => {
                setLoading(false)
                console.error(err)
            })
    }
    return saveComponents
}