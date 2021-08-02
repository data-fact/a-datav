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
import fetch from "../../common/fetch";
import exception from "../../common/exception";
import useMainReducer from "../reducers/useMainReducer";

export default function useFetchFolderList(){

    let [main,dispatch] = useMainReducer()

    function setLoading(loading) {
        dispatch({type: 'SET_LOADING',loading})
    }
    function setFolderList(list) {
        dispatch({type: 'SET_FOLDER_LIST',list})
    }

    function fetchFolderList() {
        setLoading(true)
        fetch(`folder/get/by-user`)
            .then(res => {
                setLoading(false)
                if(res.ok)
                    return res.json()
                else
                    return exception(res,true)
            })
            .then(res => {
                if(res && Array.isArray(res)){
                    setFolderList(res)
                }
            })
            .catch(err => {
                setLoading(false)
                console.error(err)
            })
    }
    return fetchFolderList
}