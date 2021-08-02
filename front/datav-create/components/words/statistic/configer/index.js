/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/19.
 * Description:
 * Modified By:
 */
import React,{useEffect,useState} from 'react'
import update from 'immutability-helper';
import {Collapse,Row,Col,Radio} from 'antd4'
import { EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';
import state from "../state";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import useInitComponent from "../../../../hooks/useInitComponent";
import TitleStyle from "./TitleStyle";
import ValueStyle from "./ValueStyle";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
const { Panel } = Collapse

export default function Configer({component}){

    let {i: id,titleStyle,valueStyle,orient,padding} = component

    let updateComponent = useUpdateComponent()

    //初始化state
    let ready = useInitComponent(component,state)

    if(!ready)
        return null

    function handleChange(key,value) {
        updateComponent(id,{[key]: value})
    }
    function handleTitleChange(key,value) {
        updateComponent(id,{titleStyle: update(titleStyle,{[key]: {$set: value}})})
    }
    function handleValueChange(key,value) {
        updateComponent(id,{valueStyle: update(valueStyle,{[key]: {$set: value}})})
    }

    return (
        <>
            <Row style={{paddingBottom: 4}}>
                <Col span={6}>布局</Col>
                <Col span={18}>
                    <Radio.Group
                        size="small" value={orient}
                        onChange={e => handleChange('orient',e.target.value)}
                    >
                        <Radio.Button value="vertical">竖直</Radio.Button>
                        <Radio.Button value="horizontal">水平</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
            {
                orient == 'horizontal' &&
                <Row style={{paddingBottom: 4}}>
                    <Col span={6}>间距</Col>
                    <Col span={18}>
                        <AInputNumber
                            options={{size: 'small',min: 0,max: 1000}}
                            unit="px" value={padding}
                            onBlur={value => handleChange('padding',value)}
                        />
                    </Col>
                </Row>
            }
            <Collapse bordered={false} size="small" defaultActiveKey={['1']}>
                <Panel header="数值样式" key="1">
                    <ValueStyle valueStyle={valueStyle} onChange={handleValueChange}/>
                </Panel>
                <Panel
                    header="标题" key="2"
                    disabled={!titleStyle.show}
                    extra={
                        titleStyle.show ?
                            <EyeOutlined onClick={() => handleTitleChange('show',!titleStyle.show)}/> :
                            <EyeInvisibleOutlined onClick={() => handleTitleChange('show',!titleStyle.show)}/>
                    }
                >
                    <TitleStyle titleStyle={titleStyle} onChange={handleTitleChange}/>
                </Panel>
            </Collapse>
        </>
    )
}