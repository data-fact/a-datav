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
import {Button,Collapse,Tooltip,Switch} from 'antd4'
import EventMapList from "./EventMapList";
import ExecEditor from "./ExecEditor";
const { Panel } = Collapse

export default function EventEditor({component,onFieldChange,onCheck,onExecChange}){

    let {i:id,_events_or:events} = component

    let eventKeys = Object.keys(events)
    return (
        <Collapse bordered={false} size="small">
            {
                eventKeys && eventKeys.length ?
                    eventKeys.map((key,i) => {
                        let event = events[key]
                        let {name,descr,enabled,fields,exec,isIndex} = event
                        return (
                            <Panel
                                header={
                                    <Tooltip placement="bottom" title={descr}>
                                        {name}
                                    </Tooltip>
                                }
                                disabled={!enabled}
                                extra={
                                    <Switch
                                        size="small" checkedChildren="禁用" unCheckedChildren="启用"
                                        checked={enabled}
                                        onChange={(val,e) => {
                                            e.stopPropagation()
                                            onCheck(key,val)
                                        }}
                                    />
                                }
                                key={''+i}>
                                    <EventMapList isIndex={isIndex} fields={fields} onChange={(fields, variable) => onFieldChange(key,fields,variable)}/>
                                    <ExecEditor id={id} exec={exec} onExecChange={exec => onExecChange(key,exec)}/>
                            </Panel>
                        )
                    })
                    :
                    <span>无交互事件</span>
            }
        </Collapse>
    )
}