/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import { LaptopOutlined, LayoutOutlined } from '@ant-design/icons';
import { Col, InputNumber, Popover, Row, Slider } from 'antd4';
import React, { useState } from 'react';
import { getOsInfo } from "../../../utils/util";
import useCanvasReducer from "../../reducers/useCanvasReducer";
import AInputNumber from "../../../lib/input-number/AInputNumber";

let osInfo = getOsInfo()
let command = osInfo.name == 'Mac' ? 'command' : 'ctrl'
export default function ScaleEditor(
    {
        scale, canvasPadding, containerW, containerH, outerWidth, outerHeight, width, height, onChange
    }) {

    // containerW = 700;
    // containerH = 500;
    let [canvas] = useCanvasReducer()
    let { focusId, components } = canvas
    let [minimapVisible, setMinimapVisible] = useState(true)

    function handleChange(val) {
        onChange(val / 100)
    }

    let persentScale = Math.floor(scale * 100)
    if (containerW === 0) {
        containerW = 1
    }
    if (containerH === 0) {
        containerH = 1
    }
    let minimapScale = 200 / containerW
    let innerWidth = width / outerWidth * containerW
    let innerHeight = height / outerHeight * containerH
    let innerWidthScale = innerWidth / width
    let innerHeightScale = innerHeight / height

    return (
        <>
            <Popover
                placement="top"
                title="快捷键"
                content={
                    <div style={{ width: 350 }}>
                        <Row>
                            <Col span={18} style={{ textAlign: 'center' }}>退格键</Col>
                            <Col span={6}>组件删除</Col>
                        </Row>
                        <Row>
                            <Col span={18} style={{ textAlign: 'center' }}>{command} + z</Col>
                            <Col span={6}>撤销</Col>
                        </Row>
                        <Row>
                            <Col span={18} style={{ textAlign: 'center' }}>{command} + shift + z</Col>
                            <Col span={6}>反撤销</Col>
                        </Row>
                        <Row>
                            <Col span={18} style={{ textAlign: 'center' }}>方向键</Col>
                            <Col span={6}>组件移动</Col>
                        </Row>
                        <Row>
                            <Col span={18} style={{ textAlign: 'center' }}>shift + 方向键</Col>
                            <Col span={6}>调整组件大小</Col>
                        </Row>
                        <Row>
                            <Col span={18} style={{ textAlign: 'center' }}>alt + 方向键</Col>
                            <Col span={6}>调整组件层级</Col>
                        </Row>
                        {
                            navigator.clipboard &&
                            <>
                                <Row>
                                    <Col span={18} style={{ textAlign: 'center' }}>{command} + c</Col>
                                    <Col span={6}>组件复制</Col>
                                </Row>
                                <Row>
                                    <Col span={18} style={{ textAlign: 'center' }}>{command} + v</Col>
                                    <Col span={6}>组件粘贴</Col>
                                </Row>
                            </>
                        }
                    </div>
                }
            >
                <LaptopOutlined
                    style={{ margin: 10, cursor: 'pointer' }}
                />
            </Popover>
            <AInputNumber
                options={{style:{ width: 80,margin: 5 },min:18,max:175}}
                value={persentScale}
                unit="%"
                onBlur={handleChange}
            />
            <Slider
                style={{ margin: 10, width: 100 }}
                min={18}
                max={175}
                value={persentScale}
                onChange={handleChange}
            />
            <Popover
                placement="topRight"
                overlayClassName={'datav-canvas-scale-editor-popover'}
                overlayStyle={{
                    display: minimapVisible ? 'block' : 'none',
                    transform: `scale(${minimapScale})`
                }}
                content={
                    <div
                        id="datav-canvas-scale-editor-minimap"
                        style={{ width: containerW, height: containerH, backgroundColor: 'rgba(0,0,0,0.6)' }}
                    >
                        <div style={{ zIndex: 1, position: 'absolute', border: '5px solid rgba(10,115,255,1)' }}></div>
                        <div
                            style={{
                                left: canvasPadding * minimapScale,
                                top: canvasPadding * minimapScale,
                                width: innerWidth,
                                height: innerHeight,
                                position: 'absolute',
                                border: '2px solid rgba(61,171,255,1)'
                            }}
                        >
                            {
                                Object.values(components).map(component => {
                                    let { i, _ready, w, h, x, y, _parent_id } = component
                                    if (!_ready || _parent_id)
                                        return null
                                    return (
                                        <div
                                            style={{
                                                background: focusId.indexOf(i) >= 0 ? 'rgba(0,186,255,.5)' : 'rgb(132, 132, 132,.8)',
                                                zIndex: focusId.indexOf(i) >= 0 ? 10 : 0,
                                                left: x * innerWidthScale,
                                                top: y * innerHeightScale,
                                                width: w / outerWidth * containerW,
                                                height: h / outerHeight * containerH,
                                                position: 'absolute'
                                            }}
                                        ></div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
                // title="Title"
                // trigger="click"
                visible={true}
            // onVisibleChange={this.handleVisibleChange}
            >
                <LayoutOutlined
                    style={{ margin: 10, cursor: 'pointer' }}
                    onClick={() => setMinimapVisible(!minimapVisible)}
                />
            </Popover>
        </>
    )
}