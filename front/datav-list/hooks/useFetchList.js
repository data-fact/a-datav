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

export default function useFetchList(){

    let [state,dispatch] = useMainReducer()

    function setLoading(loading) {
        dispatch({type: 'SET_LOADING',loading})
    }
    function setList(list) {
        dispatch({type: 'SET_LIST',list})
    }

    function fetchList() {
        setLoading(true)
        fetch(`get/by-user`)
            .then(res => {
                setLoading(false)
                if(res.ok)
                    return res.json()
                else
                    return exception(res,true)
            })
            .then(res => {
                if(res && Array.isArray(res)){
                    setList(res)
                }
            })
            .catch(err => {
                setLoading(false)
                console.error(err)
            })
    }
    return fetchList
}