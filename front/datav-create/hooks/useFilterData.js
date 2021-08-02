/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/9.
 * Description:
 * Modified By:
 */
import React from 'react'
import {useUpdateComponentData} from "./useUpdateComponent";
import useCanvasReducer from "../reducers/useCanvasReducer";
import {execDataFilter, updateDataAndFieldStatus} from "../utils/util";

export default function useFilterData(){

    let [canvas] = useCanvasReducer()
    let {filters} = canvas
    let updateComponentData = useUpdateComponentData()
    let {variables:storeVariables} = canvas

    return (id,component,variables) => {
        if(!variables)
            variables = storeVariables
        variables = {...variables}
        if(component && component._data_cache){
            let {_data_cache,_variables,_data_filters:dataFilters} = component
            dataFilters = dataFilters.map(id => filters[id])
            let data = JSON.parse(JSON.stringify(_data_cache))
            Object.keys(_variables).forEach(key => {
                if(variables[key] == undefined || variables[key] == null)
                    variables[key] = _variables[key].value
            })
            component._data = execDataFilter(data,dataFilters,variables)
            let {
                dataFieldMap: _data_fields_or,
                data: _data,ok
            } = updateDataAndFieldStatus(component._data_fields_or,component._data)

            updateComponentData(id,{
                _data_cache: component._data_cache,
                _data, _data_fields_or,
                _data_status: ok ? 1 : 2
            })
        }else{
            updateComponentData(id,{
                _data_cache: [],
                _data: [],
                _data_status: 2
            })
        }
    }
}