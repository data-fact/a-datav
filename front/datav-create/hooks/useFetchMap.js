/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/23.
 * Description:
 * Modified By:
 */
import React from 'react'
import fetch from "../../common/fetch";
import exception from "../../common/exception";

const geoMap = {}
export default function useFetchMap(){

    function fetchMap(region,callback) {
        if(geoMap[region])
            callback && callback(geoMap[region])
        else{
            fetch(`../../json/map/${region}.json`)
                .then(res => {
                    if(res.ok)
                        return res.json()
                    else
                        return exception(res)
                })
                .then(res => {
                    geoMap[region] = res
                    callback && callback(res)
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }
    return fetchMap
}