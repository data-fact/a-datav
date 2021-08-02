/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/29.
 * Description:
 * Modified By:
 */
import React from 'react'
import useUpdateStaticData from "./useUpdateStaticData";
import useUpdateApiData from "./useUpdateApiData";

export default function useUpdateData(){

    let updateStaticData = useUpdateStaticData()
    let updateApiData = useUpdateApiData()

    return (id,component,variables) => {
        let {_data_type} = component
        switch (_data_type){
            case 'static':
                return updateStaticData(id,component,variables)
            case 'api':
                return updateApiData(id,component,variables)
            default :
                console.error(`未知数据源类型: _data_${_data_type}`)
        }
    }
}