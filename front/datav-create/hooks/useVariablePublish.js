/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/10.
 * Description:
 * Modified By:
 */
import React from 'react'
import update from 'immutability-helper';
import { useDebounceFn } from 'ahooks';
import useCanvasReducer from "../reducers/useCanvasReducer";
import {useUpdateVariable} from "./useAction";
import {VARIABLE_TYPE} from "../common/constant";
import useUpdateData from "./use-update-data/useUpdateData";
import useFilterData from "./useFilterData";

const dataVariableCache = {}
const filterVariableCache = {}
export default function useVariablePublish(){

    let [canvas] = useCanvasReducer()
    let updateVariable = useUpdateVariable()
    let updateData = useUpdateData()
    let filterData = useFilterData()
    let {variables,components} = canvas

    const { run } = useDebounceFn(() => {
        Object.keys(dataVariableCache).forEach(id => {
            let component = canvas.components[id]
            if(component && dataVariableCache[id]){
                let newVariables = update(variables,{$merge: dataVariableCache[id]})
                updateData(id,component,newVariables)
                delete dataVariableCache[id]
            }
        })
        Object.keys(filterVariableCache).forEach(id => {
            let component = canvas.components[id]
            if(component && filterVariableCache[id]){
                let newVariables = update(variables,{$merge: filterVariableCache[id]})
                filterData(id,component,newVariables)
                delete filterVariableCache[id]
            }
        })
    },{wait: 100});

    return (variable,value) => {
        updateVariable(variable,value)
        Object.keys(components).forEach(id => {
            let {_variables} = components[id]
            if(_variables && _variables[variable]){
                let component = components[id]
                let {type} = _variables[variable]
                switch (type) {
                    case VARIABLE_TYPE.data:
                        if(!dataVariableCache[id])
                            dataVariableCache[id] = {}
                        dataVariableCache[id][variable] = value
                        break ;
                    case VARIABLE_TYPE.filter:
                        if(!filterVariableCache[id])
                            filterVariableCache[id] = {}
                        filterVariableCache[id][variable] = value
                        break ;
                }
                run()
            }
        })
    }
}