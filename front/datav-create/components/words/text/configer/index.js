/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/19.
 * Description:
 * Modified By:
 */
import React, {useEffect, useState} from 'react'
import {Button, Row, Col, Input, InputNumber, Tooltip, Select} from 'antd4'
import state from "../state";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";
import useInitComponent from "../../../../hooks/useInitComponent";
import Palette from "../../../../../lib/palette/Palette";

const {Option} = Select

const textOverflow = [
    {name: '换行', value: 'unset'},
    {name: '省略', value: 'ellipsis'},
    {name: '隐藏', value: 'clip'},
]
export default function Configer({component}) {

    let {i: id, value: storeValue, size, spacing, colors, family, align, underline, deleteline, italic, strong, text_overflow} = component

    let updateComponent = useUpdateComponent()

    //初始化state
    let ready = useInitComponent(component, state)

    let [value, setValue] = useState('')

    useEffect(() => setValue(storeValue), [storeValue])

    if (!ready)
        return null

    function handleValueBlur(value) {
        updateComponent(id, {value})
    }

    function handleSizeChange(size) {
        updateComponent(id, {size})
    }

    function handleSpacingChange(spacing) {
        updateComponent(id, {spacing})
    }

    function handleColorChange(index, color) {
        colors = [...colors]
        colors[index] = color
        updateComponent(id, {colors})
    }

    function handleFontChange(family) {
        updateComponent(id, {family})
    }

    function handleTextOverflowChange(text_overflow) {
        updateComponent(id, {text_overflow})
    }

    function handleAlignChange(align) {
        updateComponent(id, {align})
    }

    function handleExtChange(key, value) {
        updateComponent(id, {[key]: value})
    }

    return (
        <>
            <Row style={{marginBottom: 8}}>
                <Col span={6}>文字</Col>
                <Col span={18}>
                    <Tooltip placement="bottom" title="数据中的值会覆盖此值">
                        <Input
                            placeholder="支持数据中获取"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            onBlur={e => handleValueBlur(e.target.value)}
                        />
                    </Tooltip>
                </Col>
            </Row>
            <Row style={{marginBottom: 8}}>
                <Col span={6}>文字超出</Col>
                <Col span={18}>
                    <Select
                        placeholder="无" size="small" style={{width: 120}}
                        value={text_overflow || undefined}
                        onChange={value => handleTextOverflowChange(value)}
                    >
                        {
                            textOverflow.map(text => (
                                <Option value={text.value}>{text.name}</Option>
                            ))
                        }
                    </Select>
                </Col>
            </Row>
            <Row style={{marginBottom: 8}}>
                <Col span={6}>渐变色</Col>
                <Col span={7}>
                    <Palette
                        color={colors[0]}
                        onChange={color => handleColorChange(0, color)}
                        onDelete={() => handleColorChange(0, '')}
                    />
                </Col>
                <Col span={7}>
                    <Palette
                        color={colors[1]}
                        onChange={color => handleColorChange(1, color)}
                        onDelete={() => handleColorChange(1, '')}
                    />
                </Col>
            </Row>
            <FontConfiger
                hideColor showAlign
                size={size} spacing={spacing} align={align}
                family={family} italic={italic} strong={strong}
                underline={underline} deleteline={deleteline}
                onSizeChange={handleSizeChange}
                onSpacingChange={handleSpacingChange}
                onFontChange={handleFontChange}
                onAlignChange={handleAlignChange}
                onExtChange={handleExtChange}
            />
        </>
    )
}