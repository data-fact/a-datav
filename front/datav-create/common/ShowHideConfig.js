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
import {Radio,Row,Col,Select,Tooltip} from 'antd4'
import { QuestionCircleOutlined } from '@ant-design/icons';
import {SHOW_HIDE_TYPE} from "./constant";
import VscodeEditor from "../../lib/vscode-editor/VscodeEditor";
const {Option} = Select

export default function ShowHideConfig({i:id,_show,_show_var,_show_eval,variables,onChange}){

    return (
        <Radio.Group
            size="small" value={_show} style={{fontSize: 14,width: '100%'}}
            onChange={e => onChange('_show',e.target.value)}
        >
            <Row style={{marginBottom: 4}}>
                <Col span={8}>
                    <Radio
                        value={SHOW_HIDE_TYPE.show}
                    >显示</Radio>
                </Col>
            </Row>
            <Row style={{marginBottom: 4}}>
                <Col span={8}>
                    <Radio
                        value={SHOW_HIDE_TYPE.hide}
                    >隐藏</Radio>
                </Col>
            </Row>
            <Row style={{marginBottom: 4}}>
                <Col span={12}>
                    <Radio
                        value={SHOW_HIDE_TYPE.custom}
                    >绑定全局变量</Radio>
                </Col>
                <Col span={12}>
                    <Select
                        placeholder="请选择变量"
                        size="small"
                        style={{width: '100%'}}
                        value={_show_var}
                        onChange={value => onChange('_show_var',value)}
                    >
                        {
                            Object.keys(variables).map(variable => (
                                <Option value={variable}>{variable}</Option>
                            ))
                        }
                    </Select>
                </Col>
            </Row>
            <Row style={{marginBottom: 4}}>
                <Col span={2}></Col>
                <Col span={6}>
                    表达式
                    <Tooltip placement="top" title={
                        <Row>
                            <Col span={24}>表达式执行结果为true则显示,否则隐藏;</Col>
                            <Col span={24}>value: 已绑定全局变量的值;</Col>
                            <Col span={24}>counter: 表达式执行计数</Col>
                        </Row>
                    }>
                        <QuestionCircleOutlined />
                    </Tooltip>
                </Col>
            </Row>
            <Row style={{marginBottom: 4}}>
                <Col span={2}></Col>
                <Col span={22}>
                    <VscodeEditor
                        id={id}
                        height={180}
                        suggestions={[
                            {label:'value',insertText: 'value',detail:'变量值'},
                            {label:'counter',insertText: 'counter',detail:'执行次数'}
                        ]}
                        header="eval(value,counter)"
                        options={{language: 'javascript',minimap: {enabled: false}}}
                        value={_show_eval}
                        onBlur={code => onChange('_show_eval',code)}
                    />
                </Col>
            </Row>
        </Radio.Group>
    )
}