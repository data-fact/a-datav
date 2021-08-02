import { Col, Row, Switch } from 'antd4';
import React from 'react';
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
export default function LabelLine({ labelLine, onChange }) {
    let { length, length2, smooth, minTurnAngle } = labelLine
    function handleOnChange(key, value) {
        onChange({ '_labelLine': { [key]: { $set: value } } })
    }
    return (
        <>
            <Row>
                <Col span={10}>
                    第一段长度
                </Col>
                <Col span={14}>
                    <AInputNumber
                        unit="px" value={length}
                        options={{ min: 0, max: 1000, size: 'small' }}
                        onBlur={val => handleOnChange('length', val)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={10}>
                    第二段长度
                </Col>
                <Col span={14}>
                    <AInputNumber
                        unit="px" value={length2}
                        options={{ min: 0, max: 1000, size: 'small' }}
                        onBlur={val => handleOnChange('length2', val)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={10}>
                    平滑
                </Col>
                <Col span={14}>
                    <Switch checked={smooth} onChange={val => {
                        handleOnChange('smooth', val)
                    }} />
                </Col>
            </Row>
            <Row>
                <Col span={10}>
                    夹角
                </Col>
                <Col span={14}>
                    <AInputNumber
                        unit="°" value={minTurnAngle || 0}
                        options={{ min: 0, max: 180, size: 'small' }}
                        onBlur={val => handleOnChange('minTurnAngle', val)}
                    />
                </Col>
            </Row>
        </>
    )
}