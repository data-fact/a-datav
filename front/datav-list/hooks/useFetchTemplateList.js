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

export default function useFetchTemplateList(){

    let [main,dispatch] = useMainReducer()

    function setLoading(loading) {
        dispatch({type: 'SET_LOADING',loading})
    }
    function setTemplateList(list) {
        dispatch({type: 'SET_TEMPLATE_LIST',list})
    }

    function fetchTemplateList() {
        setLoading(true)
        fetch(`template/get/all`)
            .then(res => {
                setLoading(false)
                if(res.ok)
                    return res.json()
                else
                    return exception(res,true)
            })
            .then(res => {
                if(res && res.length){
                    setTemplateList(res)
                }
            })
            .catch(err => {
                setLoading(false)
                console.error(err)
            })
    }
    return fetchTemplateList
}