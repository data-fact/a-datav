import { Col, Row, Switch } from 'antd4';
import React from 'react';
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
import Palette from "../../../../../lib/palette/Palette";
export default function BarSet({ option, onChange }) {
    let { barMaxWidth, barWidth, barMinWidth, _barBackground } = option
    function handleOptionChange(key, value) {
        onChange({ [key]: { $set: value } })
    }
    function handleColorChange(key, value) {
        onChange({ '_barBackground': { 'backgroundStyle': { [key]: { $set: value } } } })
    }
    function handleShowColorChange(value) {
        onChange({ '_barBackground': { 'showBackground': { $set: value } } })
    }
    return <>
        <Row>
            <Col span={6}>柱宽</Col>
            <Col span={18}>
                <Row>
                    <Col span={6}>默认值</Col>
                    <Col span={18}>
                        <AInputNumber
                            unit="px"
                            value={barWidth}
                            options={{ min: 0, max: 1000, size: 'small' }}
                            onBlur={val => handleOptionChange('barWidth', val)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>最大值</Col>
                    <Col span={18}>
                        <AInputNumber
                            unit="px"
                            value={barMaxWidth}
                            options={{ min: 0, max: 1000, size: 'small' }}
                            onBlur={val => handleOptionChange('barMaxWidth', val)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>最小值</Col>
                    <Col span={18}>
                        <AInputNumber
                            unit="px"
                            value={barMinWidth}
                            options={{ min: 0, max: 1000, size: 'small' }}
                            onBlur={val => handleOptionChange('barMinWidth', val)}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col span={6}>背景</Col>
            <Col span={18}>
                <Row>
                    <Col span={24}>
                        <Switch size="small" checked={_barBackground.showBackground} onChange={handleShowColorChange} />
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>颜色</Col>
                    <Col span={14}>
                        <Palette
                            color={_barBackground.backgroundStyle.color}
                            onChange={color => handleColorChange('color', color)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>边框颜色</Col>
                    <Col span={14}>
                        <Palette
                            color={_barBackground.backgroundStyle.borderColor}
                            onChange={color => handleColorChange('borderColor', color)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>边框宽度</Col>
                    <Col span={14}>
                        <AInputNumber
                            unit="px"
                            value={_barBackground.backgroundStyle.borderWidth}
                            options={{ min: 0, max: 100, size: 'small' }}
                            onBlur={val => handleColorChange('borderWidth', val)}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    </>
}