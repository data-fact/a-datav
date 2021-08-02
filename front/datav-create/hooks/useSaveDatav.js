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

export default function useSaveDatav(){

    let [canvas] = useCanvasReducer()
    let setLoading = useSetMainLoading()

    function saveDatav(_canvas) {
        canvas = _canvas || canvas
        let {id,screen,image} = canvas
        setLoading(true)
        let data = {...canvas}
        delete data.components
        data.focusId = ['screen']
        let datav = {
            id: id,
            image,
            width: screen.width,
            height: screen.height,
            data: JSON.stringify(data)
        }
        fetch(`../update`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(datav)
        })
            .then(res => {
                setLoading(false)
                if(res.ok)
                    return res.text()
                else
                    return exception(res)
            })
            .then(res => {
                if(res != 'true')
                    console.error({message: '保存失败',description: res})
            })
            .catch(err => {
                setLoading(false)
                console.error(err)
            })
    }
    return saveDatav
}