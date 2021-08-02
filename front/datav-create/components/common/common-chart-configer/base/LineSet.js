import { Col, Row, Switch } from 'antd4';
import React from 'react';
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
export default function BarSet({ option, onChange }) {
    let { smooth, symbol, symbolSize } = option.line_series
    function handleBoundaryGapChange(key, value) {
        onChange({ 'xAxis': { 0: { [key]: { $set: value } } } })
    }
    function handleLineSeriesChange(key, value) {
        onChange({ 'line_series': { [key]: { $set: value } } })
    }
    return <>
        <Row>
            <Col span={12}>x轴脱离y轴</Col>
            <Col span={12}>
                <Switch
                    size="small" checked={option.xAxis[0].boundaryGap}
                    onChange={show => handleBoundaryGapChange('boundaryGap', show)}
                />
            </Col>
        </Row>
        <Row>
            <Col span={12}>是否平滑</Col>
            <Col span={12}>
                <Switch
                    size="small" checked={smooth}
                    onChange={show => handleLineSeriesChange('smooth', show)}
                />
            </Col>
        </Row>
        <Row>
            <Col span={12}>折点实心</Col>
            <Col span={12}>
                <Switch
                    size="small" checked={symbol === 'circle' ? true : false}
                    onChange={show => handleLineSeriesChange('symbol', show ? 'circle' : '')}
                />
            </Col>
        </Row>
        <Row>
            <Col span={12}>折点大小</Col>
            <Col span={12}>
                <AInputNumber
                    unit="px"
                    value={symbolSize}
                    options={{ min: 0, max: 1000, size: 'small' }}
                    onBlur={val => handleLineSeriesChange('symbolSize', val)}
                />
            </Col>
        </Row>
    </>
}