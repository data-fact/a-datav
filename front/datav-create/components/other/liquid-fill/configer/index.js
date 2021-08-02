
import { EyeInvisibleOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Collapse, Input, Row, Select, Switch } from 'antd4';
import update from 'immutability-helper';
import React, { useEffect, useState } from 'react';
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
import Palette from "../../../../../lib/palette/Palette";
import useInitComponent from "../../../../hooks/useInitComponent";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import Title from '../../../common/common-chart-configer/base/Title';
import state from "../state";
const { Option } = Select;
const { Panel } = Collapse
const type = [
    {
        value: 'circle',
        name: '圆形',
    }, {
        value: 'rect',
        name: '矩形',
    }, {
        value: 'roundRect',
        name: '圆矩形',
    }, {
        value: 'triangle',
        name: '三角形',
    }, {
        value: 'diamond',
        name: '菱形',
    }, {
        value: 'pin',
        name: '气泡',
    }, {
        value: 'arrow',
        name: '箭头',
    }
]
export default function Configer({ component }) {
    let { i: id, option } = component
    let ready = useInitComponent(component, state)
    let updateComponent = useUpdateComponent()
    let [radius, setRadius] = useState('')
    let [amplitude, setAmplitude] = useState('')
    let [fontSize, setFontSize] = useState('')
    let [color, setColor] = useState('')
    let [serColor, setSerColor] = useState('')
    let [fontFamily, setFontFamily] = useState('')
    let [showLabel, setShowLabel] = useState('')
    let [title, setTitle] = useState('')
    useEffect(() => {
        if (option) {
            setRadius(option.series[0].radius)
            setAmplitude(option.series[0].amplitude)
            setFontSize(option.series[0].label.fontSize)
            setColor(option.series[0].label.insideColor)
            setFontFamily(option.series[0].label.fontFamily)
            setShowLabel(option.series[0].label.show)
            setTitle(option.title)
            setSerColor(option._color)
        }
    }, [option])
    if (!ready)
        return null
    function handleLableShow(e) {
        e.stopPropagation()
        updateComponent(id, { option: update(option, { series: { 0: { label: { show: { $set: !showLabel } } } } }) })
    }
    function handleTitleShow(e) {
        e.stopPropagation()
        updateComponent(id, { option: update(option, { title: { show: { $set: !title.show } } }) })
    }
    function outline(value) {
        updateComponent(id, { option: update(option, { series: { 0: { outline: { show: { $set: value } } } } }) })
    }
    function borderWidth(value) {
        updateComponent(id, { option: update(option, { series: { 0: { backgroundStyle: { borderWidth: { $set: value } } } } }) })
    }
    function outlineBorderWidth(value) {
        updateComponent(id, { option: update(option, { series: { 0: { outline: { itemStyle: { borderWidth: { $set: value } } } } } }) })
    }
    function borderColor(value) {
        updateComponent(id, { option: update(option, { series: { 0: { backgroundStyle: { borderColor: { $set: value } } } } }) })
    }
    function outlineBorderColor(value) {
        updateComponent(id, { option: update(option, { series: { 0: { outline: { itemStyle: { borderColor: { $set: value } } } } } }) })
    }
    function waveAnimation(value) {
        updateComponent(id, { option: update(option, { series: { 0: { waveAnimation: { $set: value } } } }) })
    }
    function shape(value) {
        updateComponent(id, { option: update(option, { series: { 0: { shape: { $set: value } } } }) })
    }
    function changeAmplitude(value) {
        updateComponent(id, { option: update(option, { series: { 0: { amplitude: { $set: value } } } }) })
    }
    function changeRadius(value) {
        updateComponent(id, { option: update(option, { series: { 0: { radius: { $set: value } } } }) })
    }
    function handleChange(key, value) {
        updateComponent(id, { option: update(option, { series: { 0: { label: { [key]: { $set: value } } } } }) })
    }
    function handChangeTile(value) {
        updateComponent(id, { option: update(option, value) })
    }
    function handleAddGradientColor() {
        serColor = [...serColor]
        serColor.push('')
        updateComponent(id, {
            option: update(option, { _color: { $set: serColor } })
        })
    }
    function handleUpdateGradientColor(i, color) {
        updateComponent(id, { option: update(option, { _color: { [i]: { $set: color } } }) })
    }
    function handleDeleteGradientColor(i) {
        let colors = [...serColor]
        colors.splice(i, 1)
        updateComponent(id, { option: update(option, { _color: { $set: colors } }) })
    }
    return (
        <>
            <Row>
                <Col span={8}>外边框</Col>
                <Col span={16}>
                    <Row>
                        <Col span={24}>
                            <Switch
                                size="small" checked={option.series[0].outline.show}
                                onChange={outline}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={8}>宽度</Col>
                        <Col span={16}>
                            <AInputNumber
                                unit="px" value={option.series[0].outline.itemStyle.borderWidth}
                                options={{ min: 0, max: 1000, size: 'small' }}
                                onBlur={outlineBorderWidth}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>颜色</Col>
                        <Col span={16}>
                            <Palette color={option.series[0].outline.itemStyle.borderColor} onChange={outlineBorderColor} />
                        </Col>
                    </Row>

                </Col>
            </Row>
            <Row>
                <Col span={8}>内边框</Col>
                <Col span={16}>
                    <Row>
                        <Col span={8}>
                            宽度
                       </Col>
                        <Col span={16}>
                            <AInputNumber
                                unit="px" value={option.series[0].backgroundStyle.borderWidth}
                                options={{ min: 0, max: 1000, size: 'small' }}
                                onBlur={borderWidth}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            颜色
                       </Col>
                        <Col span={16}>
                            <Palette color={option.series[0].backgroundStyle.borderColor} onChange={borderColor} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    动画
                </Col>
                <Col span={16}>
                    <Switch checked={option.series[0].waveAnimation} onChange={waveAnimation} />
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    形状
                </Col>
                <Col span={16}>
                    <Select size='small' defaultValue={option.series[0].shape} style={{ width: 120 }} onChange={shape}>
                        {
                            type.map(v => {
                                return <Option value={v.value}>{v.name}</Option>
                            })
                        }
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    振幅
                </Col>
                <Col span={16}>
                    <Input
                        value={amplitude}
                        size='small'
                        onChange={e => { setAmplitude(e.target.value) }}
                        onBlur={e => changeAmplitude(e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    半径
                </Col>
                <Col span={16}>
                    <Input
                        value={radius}
                        size='small'
                        onChange={e => {
                            setRadius(e.target.value)
                        }}
                        onBlur={e => changeRadius(e.target.value)}
                    />
                </Col>
            </Row>
            <Collapse bordered={false} size="small" style={{ margin: '14px 0px' }}>
                <Panel
                    header="值标签"
                    disabled={!showLabel}
                    extra={
                        showLabel ?
                            <EyeOutlined onClick={handleLableShow} /> :
                            <EyeInvisibleOutlined onClick={handleLableShow} />
                    }
                >
                    <Row>
                        <Col span={8}>文本</Col>
                        <Col span={16}>
                            <FontConfiger
                                hideSpacing hideExt
                                size={fontSize}
                                color={color}
                                family={fontFamily}
                                onSizeChange={value => handleChange('fontSize', value)}
                                onColorChange={color => {
                                    handleChange('insideColor', color)
                                }}
                                onFontChange={value => handleChange('fontFamily', value)}
                            />
                        </Col>
                    </Row>
                </Panel>
                <Panel
                    header="标题"
                    disabled={!title.show}
                    extra={
                        title.show ?
                            <EyeOutlined onClick={handleTitleShow} /> :
                            <EyeInvisibleOutlined onClick={handleTitleShow} />
                    }
                >
                    <Title title={title} onChange={handChangeTile} />
                </Panel>
            </Collapse>
            <Row>

                <Col span={24} style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {
                        serColor && serColor.map((color, i) => (
                            <Palette
                                color={color}
                                onChange={color => handleUpdateGradientColor(i, color)}
                                onDelete={() => handleDeleteGradientColor(i)}
                            />
                        ))
                    }
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Button
                        style={{ width: '100%', margin: '10px 0 10px 0' }}
                        size="small" type="dashed" icon={<PlusOutlined />}
                        onClick={handleAddGradientColor}
                    >添加颜色</Button>
                </Col>
            </Row>
        </>
    )
}