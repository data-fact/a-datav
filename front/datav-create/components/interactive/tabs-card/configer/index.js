/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/15.
 * Description:
 * Modified By:
 */
import React,{useEffect,useState} from 'react'
import update from 'immutability-helper';
import {Row,Col,Select,Card,Tabs} from 'antd4'
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import state from "../state";
import useInitComponent from "../../../../hooks/useInitComponent";
import Palette from "../../../../../lib/palette/Palette";
import SelectedStyle from "./SelectedStyle";
import DefaultStyle from "./DefaultStyle";
const {Option} = Select
const {TabPane} = Tabs

export default function Configer({component}){

    let {i: id,indicator,defaultStyle,selectedStyle} = component

    let updateComponent = useUpdateComponent()

    //初始化state
    let ready = useInitComponent(component,state)

    if(!ready)
        return null

    function handleIndicatorChange(key,value) {
        updateComponent(id,{indicator: update(indicator,{[key]: {$set: value}})})
    }
    function handleSelectedStyleChange(key,value) {
        updateComponent(id,{selectedStyle: update(selectedStyle,{[key]: {$set: value}})})
    }
    function handleDefaultStyleChange(key,value) {
        updateComponent(id,{defaultStyle: update(defaultStyle,{[key]: {$set: value}})})
    }

    return (
        <>
            <Card
                size="small"
                bordered={false} style={{ width: '100%',height: '100%' }}
            >
                <Tabs size="small" style={{ width: '100%',height: '100%' }}>
                    <TabPane
                        key="1"
                        tab="默认样式"
                    >
                        <DefaultStyle
                            style={defaultStyle}
                            onChange={handleDefaultStyleChange}
                        />
                    </TabPane>
                    <TabPane
                        key="2"
                        tab="选中样式"
                    >
                        <SelectedStyle
                            indicator={indicator} style={selectedStyle}
                            onChange={handleSelectedStyleChange}
                            onIndicatorChange={handleIndicatorChange}
                        />
                    </TabPane>
                </Tabs>
            </Card>

        </>
    )
}