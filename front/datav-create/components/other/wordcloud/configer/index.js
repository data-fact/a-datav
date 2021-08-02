
import { EyeInvisibleOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Collapse, Row, Select } from 'antd4';
import update from 'immutability-helper';
import React, { useEffect, useState } from 'react';
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
import Palette from "../../../../../lib/palette/Palette";
import useInitComponent from "../../../../hooks/useInitComponent";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import Title from '../../../common/common-chart-configer/base/Title';
import state from "../state";
const { Option } = Select
const { Panel } = Collapse
const fontFamilys = [
    { name: '微软雅黑', value: '"Microsoft Yahei", Arial, sans-serif' },
    { name: '宋体', value: 'SimSun, Arial, sans-serif' },
    { name: '黑体', value: 'SimHei, Arial, sans-serif' },
    { name: '隶书', value: 'LiSu, Arial, sans-serif' },
    { name: '幼圆', value: 'YouYuan, Arial, sans-serif' },
    { name: 'tahoma', value: 'tahoma, Arial, sans-serif' },
    { name: 'arial', value: 'arial, Arial, sans-serif' },
    { name: 'sans-serif', value: 'sans-serif, Arial, sans-serif' },
    { name: '方正书宋简体', value: 'fzss' },
    { name: '方正仿宋', value: 'fzfs' },
    { name: '方正楷体', value: 'fzkt' },
    { name: '方正黑体简体', value: 'fzht' },
    { name: '站酷高端黑', value: 'zkgdh' },
    { name: '站酷庆科黄油体', value: 'kzqkhyt' },
    { name: '站酷快乐体', value: 'kzklt' },
    { name: '站酷文艺体', value: 'kzwyt' },
    { name: '站酷酷黑体', value: 'kzkht' }
]
export default function Configer({ component }) {
    const type = [
        {
            value: 'rect',
            name: '矩形',
        }, {
            value: 'circle',
            name: '圆形',
        }, {
            value: 'cardioid',
            name: '心形',
        }, {
            value: 'diamond',
            name: '菱形',
        }, {
            value: 'triangle',
            name: '三角形',
        }, {
            value: 'triangle-forward',
            name: '倒三角形',
        }, {
            value: 'star',
            name: '五角星',
        }
    ]
    let { i: id, option } = component
    let [title, setTitle] = useState('')
    let [family, setFontFamily] = useState('')
    let [serColor, setSerColor] = useState('')
    let ready = useInitComponent(component, state)

    let updateComponent = useUpdateComponent()
    useEffect(() => {
        if (option) {
            setTitle(option.title)
            setFontFamily(option.series[0].textStyle.fontFamily)
            setSerColor(option._color)
        }
    }, [option])
    if (!ready)
        return null
    function handChangeTile(value) {
        updateComponent(id, { option: update(option, value) })
    }
    function handleTitleShow(e) {
        e.stopPropagation()
        updateComponent(id, { option: update(option, { title: { show: { $set: !title.show } } }) })
    }
    function gridSize(value) {
        updateComponent(id, { option: update(option, { series: { 0: { gridSize: { $set: value } } } }) })
    }
    function shape(value) {
        updateComponent(id, { option: update(option, { series: { 0: { shape: { $set: value } } } }) })
    }
    function changeFontSize(key, value) {
        updateComponent(id, { option: update(option, { series: { 0: { sizeRange: { [key]: { $set: value } } } } }) })
    }
    function changeRotationRange(value) {
        updateComponent(id, { option: update(option, { series: { 0: { rotationRange: { $set: [value, value] } } } }) })
    }
    function onFontChange(value) {
        updateComponent(id, { option: update(option, { series: { 0: { textStyle: { fontFamily: { $set: value } } } } }) })
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
                <Col span={10}>
                    间隔
                </Col>
                <Col span={14}>
                    <AInputNumber
                        unit="px" value={option.series[0].gridSize}
                        options={{ min: 0, max: 1000, size: 'small' }}
                        onBlur={gridSize}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={10}>形状</Col>
                <Col span={14}>
                    <Select size='small' defaultValue={option.series[0].shape} style={{ width: 80 }} onChange={shape}>
                        {
                            type.map(v => {
                                return <Option value={v.value}>{v.name}</Option>
                            })
                        }
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col span={10}>字体大小范围</Col>
                <Col span={14}>
                    <Row>
                        <Col span={12}>
                            <AInputNumber
                                unit="px" value={option.series[0].sizeRange[0]}
                                options={{ min: 0, max: 1000, size: 'small' }}
                                style={{ width: 80 }}
                                onBlur={value => {
                                    changeFontSize(0, value)
                                }}
                            />
                        </Col>
                        <Col span={12}>
                            <AInputNumber
                                unit="px" value={option.series[0].sizeRange[1]}
                                style={{ width: 80 }}
                                options={{ min: 0, max: 1000, size: 'small' }}
                                onBlur={value => {
                                    changeFontSize(1, value)
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={10}>旋转角度</Col>
                <Col span={14}>
                    <Row>
                        <Col span={12}>
                            <AInputNumber
                                unit="°" value={option.series[0].rotationRange[0]}
                                options={{ min: 0, max: 1000, size: 'small' }}
                                style={{ width: 80 }}
                                onBlur={value => {
                                    changeRotationRange(value)
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={10}>字体</Col>
                <Col span={14}>
                    <Select
                        placeholder="字体" size="small" style={{ width: 120 }}
                        value={family || undefined}
                        onChange={value => onFontChange(value)}
                    >
                        {
                            fontFamilys.map(family => (
                                <Option value={family.value}>{family.name}</Option>
                            ))
                        }
                    </Select>
                </Col>
            </Row>
            <Collapse bordered={false} size="small" style={{ margin: '14px 0px' }}>
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