/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/30.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import update from 'immutability-helper';
import {Row,Col,Switch,Tooltip,Input,Collapse} from 'antd4'
import { EyeOutlined,EyeInvisibleOutlined,QuestionCircleOutlined } from '@ant-design/icons';
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";
import QuestionTooltip from "../../../../../lib/mini-components/QuestionTooltip";
import {FORMATTER_TEXT} from "../../../../common/constant";
import AInput from "../../../../../lib/mini-components/AInput";
const {Panel} = Collapse

export default function RadarAxis({radar,onChange}){

    let {name,radius:storeRadius,show} = radar
    let {textStyle,formatter} = name

    let [radius,setRadius] = useState('')
    useEffect(() => setRadius(storeRadius),[storeRadius])

    function handleNameChange(key,value) {
        onChange('name',update(name,{[key]: {$set: value}}))
    }
    function handleNameStyleChange(key,value) {
        handleNameChange('textStyle',update(textStyle,{[key]: {$set: value}}))
    }

    return (
        <>
            <div style={{marginBottom: 4}}>
                <Row>
                    <Col span={6}>可见</Col>
                    <Col span={6}>
                        <Switch
                            size="small"
                            checked={show}
                            onChange={value => onChange('show',value)}
                        />
                    </Col>
                </Row>
            </div>
            <div style={{marginBottom: 4}}>
                <Row>
                    <Col span={6}>半径</Col>
                    <Col span={10}>
                        <Tooltip placement="bottom" title="可输入数值或百分比(%)">
                            <Input
                                size="small" placeholder="请输入"
                                value={radius}
                                onChange={e => setRadius(e.target.value)}
                                onBlur={e => onChange('radius',e.target.value)}
                            />
                        </Tooltip>
                    </Col>
                </Row>
            </div>
            <div style={{marginBottom: 4}}>
                <Collapse bordered={false} size="small">
                    <Panel
                        header="指示器名称" key="indicator"
                        disabled={!name.show}
                        extra={
                            name.show ?
                                <EyeOutlined
                                    onClick={e => {
                                        e.stopPropagation()
                                        handleNameChange('show',!name.show)
                                    }}
                                /> :
                                <EyeInvisibleOutlined
                                    onClick={e => {
                                        e.stopPropagation()
                                        handleNameChange('show',!name.show)
                                    }}
                                />
                        }
                    >
                        <Row>
                            <Col span={6}>文本</Col>
                            <Col span={18}>
                                <FontConfiger
                                    hideSpacing hideExt
                                    size={textStyle.fontSize}
                                    color={textStyle.color}
                                    family={textStyle.fontFamily}
                                    onSizeChange={value => handleNameStyleChange('fontSize',value)}
                                    onColorChange={color => {
                                        handleNameStyleChange('color',color)
                                    }}
                                    onFontChange={value => handleNameStyleChange('fontFamily',value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}></Col>
                            <Col span={18}>
                                <Row>
                                    <Col span={6}>
                                        <span>格式</span>
                                        <QuestionTooltip
                                            title={
                                                <span style={{whiteSpace: 'pre-line'}}>{
                                                    FORMATTER_TEXT.value
                                                }</span>
                                            }
                                        />
                                    </Col>
                                    <Col span={10}>
                                        <AInput
                                            style={{ width: 88 }}
                                            placeholder="请输入"
                                            value={formatter}
                                            onBlur={val => handleNameChange('formatter',val || undefined)}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
            </div>
        </>
    )
}