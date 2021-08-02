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
import useMainReducer from "../reducers/useMainReducer";
import {clearToken} from "../../utils/token.util";
import useFetchList from "./useFetchList";
import useFetchFolderList from "./useFetchFolderList";

export default function useLogout(){

    let [state,dispatch] = useMainReducer()
    let fetchList = useFetchList()
    let fetchFolderList = useFetchFolderList()

    function setLoading(loading) {
        dispatch({type: 'SET_LOADING',loading})
    }

    function logout() {
        setLoading(true)
        fetch(`/logout`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
        })
            .then(res => {
                setLoading(false)
                if(res.ok){
                    notification.info({message: '注销成功'})
                    clearToken()
                    dispatch({type: 'SET_USER',user: null})
                    fetchList()
                    fetchFolderList()
                }
                else
                    notification.info({message: '注销失败'})
            })
            .catch(err => {
                setLoading(false)
                console.error(err)
                notification.info({message: '注销失败'})
            })
    }
    return logout
}