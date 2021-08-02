import React, {useEffect, useState} from 'react'
import update from 'immutability-helper';
import {Row, Col, InputNumber, Switch} from 'antd4'
import {EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
import state from "../state";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import useInitComponent from "../../../../hooks/useInitComponent";
import Palette from "../../../../../lib/palette/Palette";
import GradientColor from "../../../common/common-chart-configer/base/GradientColor";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";


export default function Configer({component}) {

    let {i: id, border_width, border_gap, border_radius, line_width, line_space, text_color, colors,local_gradient,text_color_show} = component

    //更新组件数据接口
    let updateComponent = useUpdateComponent()

    //初始化state
    let ready = useInitComponent(component, state)

    if (!ready)
        return null

    function handleBorderWidthChange(border_width) {
        updateComponent(id, {border_width})
    }

    function handleBorderGapChange(border_gap) {
        updateComponent(id, {border_gap})
    }

    function handleBorderRadiusChange(border_radius) {
        updateComponent(id, {border_radius})
    }

    function handleLineWidthChange(line_width) {
        updateComponent(id, {line_width})
    }

    function handleLineSpaceChange(line_space) {
        updateComponent(id, {line_space})
    }

    function handleTextColorChange(text_color) {
        updateComponent(id, {text_color})
    }
    function handleTextColorShowChange(text_color_show) {
        updateComponent(id, {text_color_show})
    }
    function handlelocalGradientChange(local_gradient) {
        updateComponent(id, {local_gradient})
    }

    function onColorChange(colors) {
        let newColor = [...colors]
        if (colors[0] === "" && colors[1] !== "") {
            // 1.两个颜色只有一个颜色是空的，则设置单一颜色
            newColor = ["", colors[1]]
        }
        if (colors[1] === "" && colors[0] !== "") {
            newColor = [colors[0], ""]
        }

        updateComponent(id, {colors: newColor})
        // updateComponent(id, { colors: { [i]: { colors } } })
    }

    return (
        <>

            <Row style={{marginBottom: 4}}>
                <Col span={6}>边框宽度</Col>
                <Col span={18}>
                    <AInputNumber
                        options={{size: 'small', min: 0, max: 1000}} unit="px"
                        value={border_width}
                        onBlur={value => handleBorderWidthChange(value)}
                    />
                </Col>
            </Row>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>边框半径</Col>
                <Col span={18}>
                    <AInputNumber
                        options={{size: 'small', min: 0, max: 1000}} unit="px"
                        value={border_radius}
                        onBlur={value => handleBorderRadiusChange(value)}
                    />
                </Col>
            </Row>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>边框间隙</Col>
                <Col span={18}>
                    <AInputNumber
                        options={{size: 'small', min: 0, max: 1000}} unit="px"
                        value={border_gap}
                        onBlur={value => handleBorderGapChange(value)}
                    />
                </Col>
            </Row>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>线条宽度</Col>
                <Col span={18}>
                    <AInputNumber
                        options={{size: 'small', min: 0, max: 1000}} unit="px"
                        value={line_width}
                        onBlur={value => handleLineWidthChange(value)}
                    />
                </Col>
            </Row>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>线条间隔</Col>
                <Col span={18}>
                    <AInputNumber
                        options={{size: 'small', min: 0, max: 1000}} unit="px"
                        value={line_space}
                        onBlur={value => handleLineSpaceChange(value)}
                    />
                </Col>
            </Row>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>进度池配色</Col>
                <Col span={18}>

                    <GradientColor colors={colors} onChange={onColorChange}/>
                </Col>
            </Row>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>字体颜色</Col>
                <Col span={18}>

                    <Palette color={text_color}
                             onChange={color => {
                                 handleTextColorChange(color)
                             }}
                             onDelete={color => {
                                 color = ''
                                 handleTextColorChange([...color])
                             }}
                    />
                </Col>
            </Row>
            <Row >
                <Col span={6}>局部渐变</Col>
                <Col span={18}>
                    <Switch
                        size="small" checked={local_gradient}
                        onChange={handlelocalGradientChange}
                    />
                </Col>
            </Row>
            <Row >
                <Col span={6}>文字显示</Col>
                <Col span={18}>
                    <Switch
                        size="small" checked={text_color_show}
                        onChange={handleTextColorShowChange}
                    />
                </Col>
            </Row>
        </>
    )
}