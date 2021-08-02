/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/16.
 * Description:
 * Modified By:
 */
import React from 'react'
import {notification} from 'antd4'
import fetch from "../../common/fetch";
import exception from "../../common/exception";
import useMainReducer from "../reducers/useMainReducer";

export default function useCreateNew(callback){

    let [main,dispatch] = useMainReducer()

    function setLoading(loading) {
        dispatch({type: 'SET_SAVE_LOADING',loading})
    }

    function createNew(datav) {

        fetch(`post`,{
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
                    callback && callback(res)
                    notification.info({message: '创建成功'})
                }
            })
            .catch(err => {
                setLoading(false)
                callback && callback(false)
                console.error(err)
            })
    }
    return createNew
}