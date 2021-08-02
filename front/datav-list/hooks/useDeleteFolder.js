/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/14.
 * Description:
 * Modified By:
 */
import React from 'react'
import {notification} from 'antd4'
import fetch from "../../common/fetch";
import exception from "../../common/exception";
import useMainReducer from "../reducers/useMainReducer";

export default function useDeleteFolder(callback){

    let [state,dispatch] = useMainReducer()

    function setLoading(loading) {
        dispatch({type: 'SET_LOADING',loading})
    }

    function doDeleteFolder(id) {
        setLoading(true)
        fetch(`folder/delete/${id}`)
            .then(res => {
                setLoading(false)
                if(res.ok)
                    return res.json()
                else
                    return exception(res,true)
            })
            .then(res => {
                if(res){
                    callback && callback(res)
                    notification.info({message: '删除成功'})
                }else
                    notification.warn({message: '删除失败'})
            })
            .catch(err => {
                setLoading(false)
                console.error(err)
            })
    }
    return doDeleteFolder
}