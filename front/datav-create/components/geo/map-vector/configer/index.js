/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import update from 'immutability-helper';
import {Row,Col,Switch,Collapse} from 'antd4'
import { EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';
import state from "../state";
import useInitComponent from "../../../../hooks/useInitComponent";
import RegionSelect from "./RegionSelect";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import Palette from "../../../../../lib/palette/Palette";
import ItemStyle from "./ItemStyle";
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";
const { Panel } = Collapse

export default function Configer({component}){

    let {i:id,option} = component

    //初始化state
    let ready = useInitComponent(component,state)

    let updateComponent = useUpdateComponent()

    if(!ready)
        return null

    let {map,roam,label,itemStyle} = option.geo

    function handleRegionChange(region) {
        updateComponent(id,{option: update(option,{geo: {map: {$set: region}}})})
    }
    function handleRoamChange(checked) {
        updateComponent(id,{option: update(option,{geo: {roam: {$set: checked}}})})
    }
    function handleItemStyleChange(key,value) {
        updateComponent(id,{option: update(option,{geo: {itemStyle: {[key]: {$set: value}}}})})
    }
    function handleLabelChange(key,value) {
        updateComponent(id,{option: update(option,{geo: {label: {[key]: {$set: value}}}})})
    }

    return (
        <>
            <RegionSelect region={map} onChange={handleRegionChange}/>
            {/*<Row>*/}
            {/*    <Col span={8}>鼠标缩放</Col>*/}
            {/*    <Col span={10}><Switch size="small" checked={roam} onChange={handleRoamChange}/></Col>*/}
            {/*</Row>*/}
            <Collapse bordered={false} size="small" defaultActiveKey={['1']}>
                <Panel header="地图样式" key="1">
                    <ItemStyle itemStyle={itemStyle} onChange={handleItemStyleChange}/>
                </Panel>
                <Panel
                    header="标签" key="2"
                    disabled={!label.show}
                    extra={
                        label.show ?
                            <EyeOutlined onClick={() => handleLabelChange('show',!label.show)}/> :
                            <EyeInvisibleOutlined onClick={() => handleLabelChange('show',!label.show)}/>
                    }
                >
                    <Row>
                        <Col span={6}>文本</Col>
                        <Col span={18}>
                            <FontConfiger
                                hideSpacing hideExt
                                size={label.fontSize}
                                color={label.color}
                                family={label.fontFamily}
                                onSizeChange={value => handleLabelChange('fontSize',value)}
                                onColorChange={color => {
                                    handleLabelChange('color',color)
                                }}
                                onFontChange={value => handleLabelChange('fontFamily',value)}
                            />
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
        </>
    )
}