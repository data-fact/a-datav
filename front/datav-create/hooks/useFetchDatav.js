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

export default function useFetchDatav(callback){

    let setLoading = useSetMainLoading()

    function fetchDatav(id) {
        setLoading(true)
        fetch(`../get/${id}`)
            .then(res => {
                setLoading(false)
                if(res.ok)
                    return res.json()
                else
                    return exception(res)
            })
            .then(res => {
                if(res && callback){
                    if(!res.data)
                        res.data = {id: res.id, name: res.name}
                    else
                        res.data = JSON.parse(res.data)
                    callback(res)
                }
            })
            .catch(err => {
                setLoading(false)
                console.error(err)
            })
    }
    return fetchDatav
}