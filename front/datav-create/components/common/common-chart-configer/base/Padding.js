/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/29.
 * Description:
 * Modified By:
 */
import { Col, Input, Row, Switch, Tooltip } from 'antd4';
import React, { useEffect, useState } from 'react';

export default function Padding({ showAuto, grid: storeGrid, onChange }) {


    let [grid, setGrid] = useState({})
    useEffect(() => setGrid(storeGrid || {}), [storeGrid])
    function handleChange(key, value) {
        onChange(key, value)
    }
    function thisPageChange(key, value) {
        grid = { ...grid }
        grid[key] = value
        setGrid(grid)
    }
    return (
        <>
            <Row>
                <Col span={8}>
                    <span>上下边距</span>
                </Col>
                <Col span={8}>
                    <Tooltip placement="bottom" title="上边距，可输入数值或百分比(%)">
                        <Input
                            size="small" placeholder="上边距"
                            value={grid.top}
                            onChange={e => {
                                thisPageChange('top', e.target.value)
                            }}
                            onBlur={e => {
                                handleChange('top', e.target.value)
                            }}
                        />
                    </Tooltip>
                </Col>
                <Col span={8}>
                    <Tooltip placement="bottom" title="下边距，可输入数值或百分比(%)">
                        <Input
                            size="small" placeholder="下边距"
                            value={grid.bottom}
                            onChange={e => {
                                thisPageChange('bottom', e.target.value)
                            }}
                            onBlur={e => {
                                handleChange('bottom', e.target.value)
                            }}
                        />
                    </Tooltip>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <span>左右边距</span>
                </Col>
                <Col span={8}>
                    <Tooltip placement="bottom" title="左边距，可输入数值或百分比(%)">
                        <Input
                            size="small" placeholder="左边距"
                            value={grid.left}
                            onChange={e => {
                                thisPageChange('left', e.target.value)
                            }}
                            onBlur={e => {
                                handleChange('left', e.target.value)
                            }}
                        />
                    </Tooltip>
                </Col>
                <Col span={8}>
                    <Tooltip placement="bottom" title="右边距，可输入数值或百分比(%)">
                        <Input
                            size="small" placeholder="右边距"
                            value={grid.right}
                            onChange={e => {
                                thisPageChange('right', e.target.value)
                            }}
                            onBlur={e => {
                                handleChange('right', e.target.value)
                            }}
                        />
                    </Tooltip>
                </Col>
            </Row>
            {
                showAuto &&
                <Row>
                    <Col span={4}></Col>
                    <Col span={4}>自动</Col>
                    <Col span={10}>
                        <Switch size="small" checked={grid.auto} onChange={checked => handleChange('auto', checked)} />
                    </Col>
                </Row>
            }
        </>
    )
}