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
import fetch from "../../common/fetch";
import exception from "../../common/exception";
import useMainReducer from "../reducers/useMainReducer";

export default function useUpdateDatav(callback){

    let [state,dispatch] = useMainReducer()

    function setLoading(loading) {
        dispatch({type: 'SET_LOADING',loading})
    }

    function updateDatav(datav) {
        setLoading(true)
        fetch(`update`,{
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
                    return exception(res,true)
            })
            .then(res => {
                if(res){
                    callback && callback(true)
                    notification.info({message: '更新成功'})
                }else{
                    callback && callback(false)
                }
            })
            .catch(err => {
                callback && callback(false)
                setLoading(false)
                console.error(err)
            })
    }
    return updateDatav
}