/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/23.
 * Description:
 * Modified By:
 */
import React,{useState} from 'react'
import fetch from "../../common/fetch";
import exception from "../../common/exception";
import {useSetMainLoading} from "./useAction";

export default function useFetchComponents(callback){

    let setLoading = useSetMainLoading()

    function fetchComponents(id) {
        setLoading(true)
        fetch(`../component/get/by-datav?datavId=${id}`)
            .then(res => {
                setLoading(false)
                if(res.ok)
                    return res.json()
                else
                    return exception(res)
            })
            .then(res => {
                if(res && res.length && callback){
                    callback(res)
                }
            })
            .catch(err => {
                setLoading(false)
                console.error(err)
            })
    }
    return fetchComponents
}