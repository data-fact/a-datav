/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Button,Tooltip} from 'antd4'
import { BlockOutlined,ProjectOutlined,ControlOutlined,ToolOutlined } from '@ant-design/icons';

export default function HiddenControl({layer,componentList,chartEditor,toolbar,onChange}){

    return (
        <Button.Group size="small" style={{marginTop: 3}}>
            <Tooltip placement="bottom" title="图层">
            <Button
                ghost={!layer.show}
                type="primary" style={{width: 50}}
                onClick={() => {
                    if(layer.disabled) return
                    onChange('layer')
                }}
            >
                <BlockOutlined />
            </Button>
            </Tooltip>
            <Tooltip placement="bottom" title="组件列表">
            <Button
                ghost={!componentList.show}
                type="primary" style={{width: 50}}
                onClick={() => {
                    if(componentList.disabled) return
                    onChange('componentList')
                }}
            >
                <ProjectOutlined />
            </Button>
            </Tooltip>
            <Tooltip placement="bottom" title="图表编辑器">
            <Button
                ghost={!chartEditor.show}
                type="primary" style={{width: 50}}
                onClick={() => {
                    if(chartEditor.disabled) return
                    onChange('chartEditor')
                }}
            >
                <ControlOutlined />
            </Button>
            </Tooltip>
            <Tooltip placement="bottom" title="工具栏">
            <Button
                ghost={!toolbar.show}
                type="primary" style={{width: 50}}
                onClick={() => {
                    if(toolbar.disabled) return
                    onChange('toolbar')
                }}
            >
                <ToolOutlined />
            </Button>
            </Tooltip>
        </Button.Group>
    )
}