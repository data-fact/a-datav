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
import useLogout from "./useLogout";

export default function useChangePwd(callback){

    let [loading,setLoading] = useState(false)
    let logout = useLogout()

    function changePwd(user) {
        setLoading(true)
        fetch(`/user/update-pwd`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                setLoading(false)
                if(res.ok){
                    notification.info({message: `密码修改成功`,description: '请重新登录'})
                    callback && callback(true)
                    logout()
                }else{
                    exception(res,true)
                }
            })
            .catch(err => {
                setLoading(false)
                console.error(err)
                notification.info({message: `密码修改失败`})
            })
    }
    return [changePwd,loading]
}