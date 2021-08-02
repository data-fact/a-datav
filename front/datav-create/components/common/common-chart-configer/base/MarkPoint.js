import { DeleteOutlined } from '@ant-design/icons';
import update from 'immutability-helper';
import { Col, Collapse, Row, Select } from 'antd4';
import React from 'react';
const { Panel } = Collapse
const { Option } = Select;

export default function MarkPoint({ marks, onChange }) {
    function handleChangeType(index, value) {
        onChange(update(marks,{[index]: {markType: {$set: value}}}))
    }
    function handleChangeStyle(index, value) {
        onChange(update(marks,{[index]: {type: {$set: value}}}))
    }
    function handleDeleteMark(event, index) {
        event.stopPropagation()
        onChange(update(marks,{$splice: [[index,1]]}))
    }
    return (

        <Row>
            <Col span={24}>
                <Collapse bordered={false} size="small">
                    {
                        marks.map((mark, i) => {
                            return <Panel
                                header={`标注${i + 1}`} key={i}
                                extra={<DeleteOutlined onClick={(e) => handleDeleteMark(e, i)} />}
                            >
                                <Row>
                                    <Col span={10}>类型</Col>
                                    <Col span={14}>
                                        <Select size='small' defaultValue={mark.markType} style={{ width: 120 }} onChange={(value) => {
                                            handleChangeType(i, value)
                                        }}>
                                            <Option value="point">气泡</Option>
                                            <Option value="line">标线</Option>
                                        </Select>
                                    </Col>
                                </Row>
                                {
                                    <Row>
                                        <Col span={10}>位置</Col>
                                        <Col span={14}>
                                            <Select size='small' defaultValue={mark.type} style={{ width: 120 }} onChange={(value) => {
                                                handleChangeStyle(i, value)
                                            }}>
                                                <Option value="max">最大值</Option>
                                                <Option value="min">最小值</Option>
                                                <Option value="average">平均值</Option>
                                            </Select>
                                        </Col>
                                        {/* <Col span={10}>样式</Col>
                                        <Col span={14}>
                                            <Select defaultValue={mark.symbol} style={{ width: 120 }} onChange={(value) => {
                                                handleChangeStyle(i, 'symbol', value, 'markPoint')
                                            }}>
                                                <Option value="pin">气泡</Option>
                                                <Option value="arrow">箭头</Option>
                                                <Option value="triangle">三角形</Option>
                                            </Select>
                                        </Col> */}
                                    </Row>

                                }
                            </Panel>
                        })
                    }
                </Collapse>
            </Col>
        </Row>

    )
}