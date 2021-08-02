/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/15.
 * Description:
 * Modified By:
 */
import { Col, Collapse, Input, Row, Select } from 'antd4';
import React, { useEffect, useState } from 'react';
import BorderConfiger from "../../../../../lib/border-configer/BorderConfiger";
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";
import useInitComponent from "../../../../hooks/useInitComponent";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import GradientColor from "../../../common/common-chart-configer/base/GradientColor";
import state from "../state";

const {Panel} = Collapse
const {Option} = Select
const borderKeyMap = {
    "width": "borderWidth",
    "type": "borderType",
    "radius":"borderRadius",
    "colors": "borderColors",
}
export default function Configer({component}) {
    let {
        i: id, placeholder: storePlaceholder,
        colors, borderType, borderColors, borderWidth,borderRadius,
        size, color, family, align, spacing
    } = component

    let updateComponent = useUpdateComponent()

    //初始化state
    let ready = useInitComponent(component, state)

    let [placeholder, setPlaceholder] = useState('')

    useEffect(() => setPlaceholder(storePlaceholder), [storePlaceholder])

    if (!ready)
        return null


    function handlePlaceholderBlur() {
        updateComponent(id, {placeholder})
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

    function handleChange(key, value) {
        key = borderKeyMap[key]
        updateComponent(id, {[key]: value})
    }

    function handleSizeChange(size) {
        updateComponent(id, {size})
    }

    function handleSpacingChange(spacing) {
        updateComponent(id, {spacing})
    }


    function handleFontChange(family) {
        updateComponent(id, {family})
    }


    function handleAlignChange(align) {
        updateComponent(id, {align})
    }

    function handleTextColorChange(color) {
        updateComponent(id, {color: color})
    }

    return (
        <>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>背景颜色</Col>
                <Col span={18}>

                    <GradientColor colors={colors} onChange={onColorChange}/>
                </Col>
            </Row>

            <Row style={{marginBottom: 8}}>
                <Col span={6}>按钮内容</Col>
                <Col span={14}>
                    <Input
                        placeholder="按钮内容" size="small"
                        value={placeholder}
                        onChange={e => setPlaceholder(e.target.value)}
                        onBlur={handlePlaceholderBlur}
                    />
                </Col>
            </Row>
            <Collapse bordered={false} size="small">
                {

                    <Panel
                        header="边框" key="1"
                    >
                        <BorderConfiger
                            showRadius
                            gradient type={borderType} color={borderColors} width={borderWidth} radius={borderRadius}
                            onChange={handleChange}
                        />
                    </Panel>

                }
                {

                    <Panel
                        header="文字" key="2"
                    >

                        <FontConfiger
                            showAlign hideExt
                            color={color} size={size} spacing={spacing}
                            align={align} family={family}
                            onSizeChange={handleSizeChange}
                            onSpacingChange={handleSpacingChange}
                            onFontChange={handleFontChange}
                            onAlignChange={handleAlignChange}
                            onColorChange={handleTextColorChange}
                        />
                    </Panel>

                }
            </Collapse>


        </>
    )
}