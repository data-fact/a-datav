/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/29.
 * Description:
 * Modified By:
 */
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Col, Input, Radio, Row, Select, Slider, Tooltip } from 'antd4';
import React, { useState } from 'react';
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
import QuestionTooltip from "../../../../../lib/mini-components/QuestionTooltip";
import AInput from "../../../../../lib/mini-components/AInput";
import {FORMATTER_TEXT} from "../../../../common/constant";
const Option = Select.Option

export default function ValueLabel({ label, guid, yAxisType, onChange }) {
    let { position, fontFamily, fontSize, color, rotate, formatter, _is_sld } = label
    let [selectPosition, setSelectPosition] = useState(position && !Array.isArray(position) ? position : null)
    let [sliderPosition, setSliderPosition] = useState(position && Array.isArray(position) ? position : ['0', '0'])
    function handleChange(key, value) {
        onChange({ label: { [key]: { $set: value } } })
    }
    function setFormatter(value) {
        handleChange('formatter', value || undefined)
    }
    function handleRadioGroupChange(_is_sld) {
        if (_is_sld) {
            onChange({ label: { '_is_sld': { $set: _is_sld }, 'position': { $set: sliderPosition } } })
        }
        else {
            onChange({ label: { '_is_sld': { $set: _is_sld }, 'position': { $set: selectPosition } } })
        }
    }
    function handleSliderChange(key, value) {
        sliderPosition = [...sliderPosition]
        sliderPosition[key] = value + '%'
        setSliderPosition(sliderPosition)
        if (_is_sld === true) {
            onChange({ label: { 'position': { $set: sliderPosition } } })
        }
    }
    function handlePositionChange(value) {
        setSelectPosition(value)
        if (_is_sld === false) {
            onChange({ label: { 'position': { $set: value } } })
        }
    }
    return (
        <>
            <Row>
                <Col span={6}>文本</Col>
                <Col span={18}>
                    <FontConfiger
                        hideSpacing hideExt
                        size={fontSize}
                        color={color}
                        family={fontFamily}
                        onSizeChange={value => handleChange('fontSize', value)}
                        onColorChange={color => {
                            handleChange('color', color)
                        }}
                        onFontChange={value => handleChange('fontFamily', value)}
                    />
                </Col>
            </Row>
            {
                guid.isPie &&

                <Row>
                    <Col span={6}>位置</Col>
                    <Col span={18}>
                        <Radio.Group
                            size="small" value={position}
                            onChange={e => handleChange('position', e.target.value)}
                        >
                            <Radio.Button value="outside">外</Radio.Button>
                            <Radio.Button value="inside">内</Radio.Button>
                            <Radio.Button value="center">中心</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
            }
            {
                !guid.isGauge &&
                <Row>
                    <Col span={6}>旋转</Col>
                    <Col span={18}>
                        <Row>
                            <Col span={12}>
                                <Slider
                                    style={{ margin: 10 }}
                                    min={0}
                                    max={360}
                                    value={rotate}
                                    onChange={value => handleChange('rotate', value)}
                                />
                            </Col>
                            <Col span={12}>
                                <AInputNumber
                                    unit="°" value={rotate}
                                    options={{ min: 0, max: 360, size: 'small' }}
                                    onBlur={val => handleChange('rotate', val)}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            }
            <Row style={{ marginTop: 12, marginBottom: 12 }}>
                <Col span={6}>
                    <span>格式</span>
                    <QuestionTooltip
                        title={
                            <span style={{whiteSpace: 'pre-line'}}>{
                                guid.isGauge ? FORMATTER_TEXT.value : FORMATTER_TEXT.default
                            }</span>
                        }
                    />
                </Col>
                <Col span={18}>
                    <AInput
                        style={{ width: 150 }}
                        placeholder="请输入"
                        value={formatter}
                        onBlur={val => setFormatter(val)}
                    />
                </Col>
            </Row>
            {
                (guid.hasBar) &&
                <Row>
                    <Col span={6}>位置</Col>
                    <Col span={18}>
                        <Radio.Group
                            size="small" style={{ fontSize: 14 }}
                            value={_is_sld} onChange={e => handleRadioGroupChange(e.target.value)}
                        >
                            <Row>
                                <Col span={24}>
                                    <Radio value={false}></Radio>
                                    <Select
                                        size="small" placeholder="模糊位置"
                                        value={selectPosition}
                                        onChange={value => handlePositionChange(value)}
                                    >
                                        {yAxisType !== 'category' &&
                                            [{
                                                value: 'top',
                                                name: '上'
                                            }, {
                                                value: 'inside',
                                                name: '中'
                                            }, {
                                                value: 'bottom',
                                                name: '下'
                                            }, {
                                                value: 'insideTop',
                                                name: '内上'
                                            }, {
                                                value: 'insideBottom',
                                                name: '内下'
                                            }].map((p, i) => (
                                                <Option value={p.value} key={i}>{p.name}</Option>
                                            ))
                                        }
                                        {yAxisType === 'category' &&
                                            [{
                                                value: 'left',
                                                name: '左'
                                            }, {
                                                value: 'inside',
                                                name: '中'
                                            }, {
                                                value: 'right',
                                                name: '右'
                                            }, {
                                                value: 'insideLeft',
                                                name: '内左'
                                            }, {
                                                value: 'insideRight',
                                                name: '内右'
                                            }].map(p => (
                                                <Option value={p.value}>{p.name}</Option>
                                            ))
                                        }
                                    </Select>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Row>
                                        <Col span={24}><Radio value={true}>百分比位置</Radio></Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>左(%)</Col>
                                        <Col span={9}>
                                            <Slider
                                                style={{ margin: 10 }}
                                                min={0}
                                                max={100}
                                                value={sliderPosition[0].replace('%', '')}
                                                onChange={value => handleSliderChange(0, value)}
                                            />
                                        </Col>
                                        <Col span={9}>
                                            <AInputNumber
                                                unit="%"
                                                value={sliderPosition[0].replace('%', '')}
                                                options={{ min: 0, max: 100, size: 'small' }}
                                                onBlur={val => handleSliderChange(0, val)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>上(%)</Col>
                                        <Col span={9}>
                                            <Slider
                                                style={{ margin: 10 }}
                                                min={0}
                                                max={100}
                                                value={sliderPosition[1].replace('%', '')}
                                                onChange={value => handleSliderChange(1, value)}
                                            />
                                        </Col>
                                        <Col span={9}>
                                            <AInputNumber
                                                unit="%"
                                                value={sliderPosition[1].replace('%', '')}
                                                options={{ min: 0, max: 100, size: 'small' }}
                                                onBlur={val => handleSliderChange(1, val)}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Radio.Group>

                    </Col>
                </Row>
            }
        </>
    )
}