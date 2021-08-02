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
import {Tooltip,Collapse} from 'antd4'
import { GlobalOutlined } from '@ant-design/icons';
import EventEditor from "./EventEditor";
import './event-configer.css'
import useUpdateComponent from "../../../hooks/useUpdateComponent";
import {useCreateVariable, useUpdateVariable} from "../../../hooks/useAction";
import useSupportReducer from "../../../reducers/useSupportReducer";
import VariableList from "./VariableList";
import {VARIABLE_TYPE} from "../../../common/constant";

const { Panel } = Collapse

export default function EventConfiger({component}){

    let {i:id,_events_or:events,_variables:variables,_ready:ready} = component

    if(!ready)
        return null

    let [,supportDispatch] = useSupportReducer()
    let updateComponent = useUpdateComponent()
    let updateVariables = useUpdateVariable()

    function handleChange(key,fields,variable) {
        let newEvents = update(events,{[key]: {fields: {$set: fields}}})
        updateComponent(id,{_events_or: newEvents})
        if(variable)
            updateVariables(variable,'')
    }
    function handleCheck(key,checked) {
        let newEvents = update(events,{[key]: {enabled: {$set: checked}}})
        updateComponent(id,{_events_or: newEvents})
    }
    function handleExecChange(key,exec) {
        let newEvents = update(events,{[key]: {exec: {$set: exec}}})
        updateComponent(id,{_events_or: newEvents})
    }
    function setShowVariables(show) {
        supportDispatch({type: 'SET_SHOW_VARIABLES',show})
    }

    function handleVariableCreate() {
        let newVariable = update(variables,{
            "": {$set: {value: '',type: VARIABLE_TYPE.data,custom: true}}
        })
        updateComponent(id,{_variables: newVariable})
    }
    function handleVariableChange(record,oldKey) {
        let {variable,value,type} = record
        if(oldKey || oldKey === '')
            delete variables[oldKey]
        let newVariable = update(variables,{[variable]: {$set: {value,type}}})
        updateComponent(id,{_variables: newVariable})
    }
    function handleVariableDelete(key) {
        let newVariable = {...variables}
        delete newVariable[key]
        updateComponent(id,{_variables: newVariable})
    }

    return (
        <Collapse
            className={'datav-event-configer'}
            bordered={false}
            defaultActiveKey={['1','2']}
        >
            <Panel header="交互事件" key="1">
                <EventEditor
                    component={component}
                    onFieldChange={handleChange}
                    onCheck={handleCheck}
                    onExecChange={handleExecChange}
                />
            </Panel>
            <Panel
                header="变量列表" key="2"
                extra={
                    <Tooltip placement="bottom" title="查看全局变量列表">
                        <GlobalOutlined
                            onClick={e => {
                                e.stopPropagation();
                                setShowVariables(true)
                            }}
                        />
                    </Tooltip>
                }
            >
                <VariableList
                    variables={variables}
                    onCreate={handleVariableCreate}
                    onChange={handleVariableChange}
                    onDelete={handleVariableDelete}
                />
            </Panel>
        </Collapse>
    )
}