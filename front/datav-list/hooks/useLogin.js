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

export default function useLogin(callback){

    let [,dispatch] = useMainReducer()
    let [loading,setLoading] = useState(false)
    let fetchList = useFetchList()
    let fetchFolderList = useFetchFolderList()

    function login(user) {
        setLoading(true)
        fetch(`/login`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                setLoading(false)
                if(res.ok){
                    notification.info({message: '登录成功'})
                    let user = getTokenUser()
                    if(user)
                        dispatch({type: 'SET_USER',user})
                    fetchList()
                    fetchFolderList()
                    callback && callback(true)
                }
                else
                    exception(res,true)
            })
            .catch(err => {
                notification.info({message: '登录失败'})
                setLoading(false)
                console.error(err)
            })
    }
    return [login,loading]
}