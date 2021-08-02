/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/1/12.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Button,Collapse,Switch} from 'antd4'
import VscodeEditor from "../../../../lib/vscode-editor/VscodeEditor";

const { Panel } = Collapse

export default function ExecEditor({id,exec = {enabled: false,code: ''},onExecChange}){

    return (
        <Collapse bordered={false} size="small">
            <Panel
                header="自定义逻辑" key="1"
                disabled={!exec.enabled}
                extra={<Switch
                    size="small" checked={exec.enabled}
                    onChange={(enabled,e) => {
                        e.stopPropagation()
                        onExecChange({...exec,enabled})
                    }}
                />}
            >
                <VscodeEditor
                    id={id}
                    height={180}
                    suggestions={[{label:'record',insertText: 'record',detail:'数据记录'}]}
                    header="eval(record,publish)"
                    options={{language: 'javascript',minimap: {enabled: false}}}
                    value={exec.code}
                    onBlur={code => onExecChange({...exec,code})}
                />
            </Panel>
        </Collapse>
    )
}