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
import update from 'immutability-helper';
import {Button} from 'antd4'
import StaticDataConfiger from "./StaticDataConfiger";
import ApiDataConfiger from "./ApiDataConfiger";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import useUpdateData from "../../../../hooks/use-update-data/useUpdateData";
import {getVariableArr} from "../../../../utils/util";
import {VARIABLE_TYPE} from "../../../../common/constant";
import useCanvasReducer from "../../../../reducers/useCanvasReducer";

export default function DataSourceConfiger({component,variables}){

    let [canvas] = useCanvasReducer()
    let {i:id,_data_type,_variables} = component
    let dataType = `_data_${_data_type}`
    let config = component[dataType]

    let updateComponent = useUpdateComponent()
    let updateData = useUpdateData()

    function handleChange(config,variables) {
        updateComponent(id,{[dataType]: {...config}})
        updateData(id,update(component,{[dataType]: {$set: config}}),variables)
    }
    function handleApiChange(config) {
        let {url,body} = config
        let str = url + body
        updateVariables(str)
        handleChange(config)
    }
    function updateVariables(value) {
        let variableArr = getVariableArr(value)
        let variables = {..._variables}
        variableArr.forEach(v => {
            if(!variables[v])
                variables[v] = {value: '', type: VARIABLE_TYPE.data}
        })
        updateComponent(id,{_variables: variables})
        return variables
    }

    switch (_data_type) {
        case 'static':
            return <StaticDataConfiger id={id} config={config} onChange={handleChange}/>
        case 'api':
            return <ApiDataConfiger id={id} config={config} variables={variables} onChange={handleApiChange}/>
        default :
            return <span style={{color: 'red'}}>{`未知数据源类型: ${dataType}`}</span>
    }
}