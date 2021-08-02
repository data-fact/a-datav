/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/11/17.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Collapse,Checkbox,Typography} from 'antd4'
import { SelectOutlined,ImportOutlined } from '@ant-design/icons';
import {getInstanceByTypeId} from "../../common/common";

const { Panel } = Collapse
const { Text } = Typography

export default function ChildNav({component,onAddChild,onCheck,onEdit}){

    let {_support_children_or,_child_ids} = component

    function handleChecked(type,descr,nav,checked) {
        if(_child_ids[type])
            onCheck(type,checked)
        else
            onAddChild(type,descr,nav)
    }
    function handleEdit(type) {
        if(_child_ids[type] && _child_ids[type].enabled){
            onEdit(_child_ids[type].id)
        }
    }

    return (
        <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header="子组件列表" key="1">
                {
                    _support_children_or.map(type => {
                        let instance = getInstanceByTypeId(type)
                        if(!instance){
                            console.error(`子组件不存在 type:${type}`)
                            return <></>
                        }
                        let checked = _child_ids[type] && _child_ids[type].enabled
                        let style = checked ?
                            {color: '#1890ff',cursor: 'pointer'} :
                            {color: '#333',cursor: 'no-drop'}
                        let {descr,nav} = instance
                        return <span style={{display: 'block'}}>
                            <Checkbox
                                checked={checked}
                                onChange={e => handleChecked(type,descr,nav,e.target.checked)}
                            >{instance.descr}</Checkbox>
                            <SelectOutlined
                                style={style}
                                onClick={() => handleEdit(type)}
                            />
                        </span>
                    })
                }
            </Panel>
        </Collapse>
    )
}

export function BackParent({onChangeFocusId}) {
    return (
        <span
            onClick={onChangeFocusId}
            style={{cursor: 'pointer',fontSize: 18}}
        >
            <ImportOutlined
                style={{color: '#1890ff', paddingLeft: '10px'}}
            />
            <Text strong>返回父组件</Text>
        </span>
    )
}