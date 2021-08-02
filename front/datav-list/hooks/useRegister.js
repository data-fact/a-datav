/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/16.
 * Description:
 * Modified By:
 */
import React,{useState} from 'react'
import {notification} from 'antd4'
import fetch from "../../common/fetch";
import exception from "../../common/exception";
import {getTokenUser} from "../../utils/token.util";
import useMainReducer from "../reducers/useMainReducer";
import useFetchList from "./useFetchList";
import useFetchFolderList from "./useFetchFolderList";

export default function useRegister(callback){

    let [loading,setLoading] = useState(false)

    function register(user) {
        setLoading(true)
        fetch(`/user/create`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                setLoading(false)
                if(res.ok){
                    notification.info({message: `注册成功`})
                    callback && callback(true)
                }else{
                    exception(res,true)
                }
            })
            .catch(err => {
                setLoading(false)
                console.error(err)
                notification.info({message: `注册失败`})
            })
    }
    return [register,loading]
}