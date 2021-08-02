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
import {Modal} from 'antd4'
import useCanvasReducer from "../../reducers/useCanvasReducer";
import GlobalVariableTable from "./GlobalVariableTable";
import useSupportReducer from "../../reducers/useSupportReducer";
import {useCreateVariable, useDeleteVariable, useUpdateVariable} from "../../hooks/useAction";
import useVariablePublish from "../../hooks/useVariablePublish";

export default function GlobalVariableList(){

    let [canvas] = useCanvasReducer()
    let [support,supportDispatch] = useSupportReducer()
    let variablePublish = useVariablePublish()
    let createVariable = useCreateVariable()
    let updateVariable = useUpdateVariable()
    let deleteVariable = useDeleteVariable()
    let {variables} = canvas
    let {showVariables} = support

    function setShowVariables(show) {
        supportDispatch({type: 'SET_SHOW_VARIABLES',show})
    }

    function handleCreate() {
        createVariable()
    }
    function handleChange(record,oldKey) {
        let {variable,value} = record
        variablePublish(variable,value)
        updateVariable(variable,value,oldKey)
    }
    function handleDelete(variable) {
        deleteVariable(variable)
    }

    return (
        <Modal
            title="全局变量列表"
            visible={showVariables}
            footer={null}
            onCancel={() => setShowVariables(false)}
        >
            <GlobalVariableTable
                variables={variables}
                onCreate={handleCreate}
                onChange={handleChange}
                onDelete={handleDelete}
            />
        </Modal>
    )
}