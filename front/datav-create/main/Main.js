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
import {Row,Col} from 'antd4'
import 'nprogress/nprogress.css'
import Header from "./header";
import useSupportReducer from "../reducers/useSupportReducer";
import useInit, {useAutoCommit, useRegisterChartTheme, useWindowSizeChange} from "../hooks/useInit";
import useShortcutKey from "../hooks/useShortcutKey";
import CanvasEditor from "./canvas-editor";
import ChartConfiger from "./chart-configer";
import ComponentList from "./component-list";
import GlobalVariableList from "./global-variable-list";
import Layer from "./layer";
import {monitorMouse} from "../utils/util";

const headerHeight = 32
export default function Main() {

    useInit()
    //自动提交改变
    useAutoCommit()
    //监听快捷键
    useShortcutKey()
    //监听鼠标位置
    monitorMouse()
    //监听窗体大小改变
    let [,mainHeight] = useWindowSizeChange('main')
    //注册echarts主题
    // useRegisterChartTheme()

    let [support,] = useSupportReducer()
    let {layer,componentList,chartEditor} = support.layout

    let layerWidth = layer.show ? 3 : 0
    let componentListWidth = componentList.show ? 4 : 0
    let chartEditorWidth = chartEditor.show ? 6 : 0
    let canvasWidth = 24 - layerWidth - componentListWidth - chartEditorWidth

    return (
        <div id="main" style={{height: '100%'}}>
            <Row style={{height: headerHeight}}>
                <Col span={24}>
                    <Header/>
                </Col>
            </Row>
            <Row style={{height: mainHeight - headerHeight}}>
                <Col span={layerWidth} style={{height: '100%'}}>
                    <div className={'datav-layer'} style={{height: '100%'}}>
                        <Layer/>
                    </div>
                </Col>
                <Col span={componentListWidth} style={{height: '100%'}}>
                    <div className={'datav-component-list'} style={{height: '100%'}}>
                        <ComponentList/>
                    </div>
                </Col>
                <Col span={canvasWidth} style={{height: '100%'}}>
                    <div className={'datav-canvas'} style={{height: '100%'}}>
                        <CanvasEditor/>
                    </div>
                </Col>
                <Col span={chartEditorWidth} style={{height: '100%'}}>
                    <div className={'datav-chart-editor'} style={{height: '100%',overflow: 'auto'}}>
                        <ChartConfiger/>
                    </div>
                </Col>
            </Row>

            <GlobalVariableList/>
        </div>
    )
}