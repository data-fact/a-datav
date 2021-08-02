/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/30.
 * Description:
 * Modified By:
 */
import { Col, Radio, Row, Select, Slider, Switch, Tooltip } from 'antd4';
import React from 'react';
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
import { chartPostitions } from "../../../../common/common";

const { Option } = Select

export default function Legend({ legend, onChange }) {

    let {
        orient, itemGap, top, left, textStyle = {},
        type, _is_sld = false, _top_slc, _left_slc, _top_sld, _left_sld
    } = legend
    let { fontFamily, fontSize, color } = textStyle

    function handleChange(key, value) {
        onChange({ legend: { [key]: { $set: value } } })
    }
    function handleTextStyleChange(key, value) {
        handleChange('textStyle', {
            ...textStyle,
            [key]: value
        })
    }
    function handlePositionChange(value) {
        let position = value.split('_')
        let spec = {
            _top_slc: { $set: position[0] },
            _left_slc: { $set: position[1] }
        }
        if (!_is_sld) {
            spec['top'] = { $set: position[0] }
            spec['left'] = { $set: position[1] }
        }
        onChange({ legend: spec })
    }
    function handleTopSldChange(value) {
        let spec = { _top_sld: { $set: value } }
        if (_is_sld)
            spec['top'] = { $set: `${value || 0}%` }
        onChange({ legend: spec })
    }
    function handleLeftSldChange(value) {
        let spec = { _left_sld: { $set: value } }
        if (_is_sld)
            spec['left'] = { $set: `${value || 0}%` }
        onChange({ legend: spec })
    }
    function handleIsSlider(_is_sld) {
        let spec = { _is_sld: { $set: _is_sld } }
        if (_is_sld) {
            spec['top'] = { $set: `${_top_sld || 0}%` }
            spec['left'] = { $set: `${_left_sld || 0}%` }
        } else {
            spec['top'] = { $set: _top_slc }
            spec['left'] = { $set: _left_slc }
        }
        onChange({ legend: spec })
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
                        onSizeChange={value => handleTextStyleChange('fontSize', value)}
                        onColorChange={color => {
                            handleTextStyleChange('color', color)
                        }}
                        onFontChange={value => handleTextStyleChange('fontFamily', value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={6}>布局</Col>
                <Col span={18}>
                    <Row>
                        <Col span={4}>方向</Col>
                        <Col span={20}>
                            <Radio.Group
                                size="small" value={orient}
                                onChange={e => handleChange('orient', e.target.value)}
                            >
                                <Radio.Button value="horizontal">水平</Radio.Button>
                                <Radio.Button value="vertical">竖直</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={6}></Col>
                <Col span={18}>
                    <Row>
                        <Col span={4}>间距</Col>
                        <Col span={18}>
                            <Tooltip placement="bottom" title="水平间距(px)">
                                <div>
                                    <AInputNumber
                                        options={{
                                            size: "small",
                                            min: 0,
                                            max: 200
                                        }}
                                        unit="px"
                                        value={itemGap}
                                        onBlur={value => handleChange('itemGap', value)}
                                    />
                                </div>
                            </Tooltip>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={6}>位置</Col>
                <Col span={18}>
                    <Radio.Group
                        size="small" style={{ fontSize: 14 }}
                        value={_is_sld} onChange={e => handleIsSlider(e.target.value)}
                    >
                        <Row>
                            <Col span={24}>
                                <Radio value={false}></Radio>
                                <Select
                                    size="small" style={{ width: 120 }} placeholder="模糊位置"
                                    value={chartPostitions[`${top}_${left}`] ? `${top}_${left}` : undefined}
                                    onChange={handlePositionChange}
                                >
                                    {
                                        Object.keys(chartPostitions).map(p => (
                                            <Option value={p}>{chartPostitions[p]}</Option>
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
                                    <Col span={8}>
                                        <Slider
                                            style={{ margin: 10 }}
                                            min={0}
                                            max={100}
                                            value={_left_sld}
                                            onChange={value => handleLeftSldChange(value)}
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <AInputNumber
                                            unit="%"
                                            value={_left_sld}
                                            options={{ min: 0, max: 100, size: 'small' }}
                                            onBlur={val => handleLeftSldChange(val)}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6}>上(%)</Col>
                                    <Col span={8}>
                                        <Slider
                                            style={{ margin: 10 }}
                                            min={0}
                                            max={100}
                                            value={_top_sld}
                                            onChange={value => handleTopSldChange(value)}
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <AInputNumber
                                            unit="%"
                                            value={_top_sld}
                                            options={{ min: 0, max: 100, size: 'small' }}
                                            onBlur={val => handleTopSldChange(val)}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Radio.Group>

                </Col>
            </Row>
            <Row>
                <Col span={6}>分页</Col>
                <Col span={6}>
                    <Switch
                        size="small"
                        checked={type == 'scroll'}
                        onChange={value => handleChange('type', value ? 'scroll' : 'plain')}
                    />
                </Col>
            </Row>
        </>
    )
}