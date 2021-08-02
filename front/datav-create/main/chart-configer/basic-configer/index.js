/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Row,Col,Input,Tooltip,InputNumber,Button,Collapse} from 'antd4'
import { DeleteOutlined } from '@ant-design/icons';
import useUpdateComponent from "../../../hooks/useUpdateComponent";
import RotateConfig from "./RotateConfig";
import useCanvasReducer from "../../../reducers/useCanvasReducer";
import StyleFilterConfig from "../../../../lib/style-filter-config/StyleFilterConfig";
import Palette from "../../../../lib/palette/Palette";
import ShowHideConfig from "../../../common/ShowHideConfig";
const { Panel } = Collapse

export default function BasicConfiger({component,isChild}){

    let {
        i:id,x,y,w,h,_show,_mark_color,
        _name:storeName,_typeId:typeId,_typeNav:typeNav,_ready:ready,_z_index,
        _rotate_x:rotateX,_rotate_y:rotateY,_rotate_z:rotateZ,
        _style_filters:styleFilters
    } = component
    if(!ready)
        return null

    let [canvas,canvasDispatch] = useCanvasReducer()
    let updateComponent = useUpdateComponent()

    let [name,setName] = useState('')
    let [left,setLeft] = useState(0)
    let [top,setTop] = useState(0)
    let [width,setWidth] = useState(0)
    let [height,setHeight] = useState(0)
    let [zIndex,setZIndex] = useState(0)

    useEffect(() => setName(storeName),[storeName])
    useEffect(() => setLeft(x),[x])
    useEffect(() => setTop(y),[y])
    useEffect(() => setWidth(w),[w])
    useEffect(() => setHeight(h),[h])
    useEffect(() => setZIndex(_z_index),[_z_index])

    function handleNameBlur(_name) {
        updateComponent(id,{_name})
    }
    function handleMarkColorChange(_mark_color) {
        updateComponent(id,{_mark_color})
    }
    function handleLeftBlur(x) {
        updateComponent(id,{x})
    }
    function handleTopBlur(y) {
        updateComponent(id,{y})
    }
    function handleWidthBlur(w) {
        updateComponent(id,{w})
    }
    function handleHeightBlur(h) {
        updateComponent(id,{h})
    }
    function handleZIndexBlur(_z_index) {
        updateComponent(id,{_z_index})
    }
    function handleRotateChange(type,rotate) {
        type = `_rotate_${type}`
        updateComponent(id,{[type]: rotate})
    }
    function handleStyleFiltersChange(filters) {
        updateComponent(id,{_style_filters: filters})
    }
    function handleShowChange(key,value) {
        updateComponent(id,{[key]:value})
    }
    function handleDelete() {
        canvasDispatch({type: 'DELETE_COMPONENT'})
    }

    return (
        <>
            {
                !isChild &&
                <div style={{marginBottom: 8}}>
                    <Row>
                        <Col span={6}>
                            组件标记
                        </Col>
                        <Col span={18}>
                            <Palette
                                color={_mark_color}
                                onChange={handleMarkColorChange}
                                onDelete={() => handleMarkColorChange('')}
                            />
                        </Col>
                    </Row>
                </div>
            }
            <div style={{marginBottom: 8}}>
                <Row>
                    <Col span={6}>
                        组件ID
                    </Col>
                    <Col span={18}>
                        <Tooltip placement="bottom" title={id}>
                            <Input size="small" disabled={true} value={id} />
                        </Tooltip>
                    </Col>
                </Row>
            </div>
            <div style={{marginBottom: 8}}>
                <Row>
                    <Col span={6}>
                        组件类型
                    </Col>
                    <Col span={18}>
                        <Tooltip placement="bottom" title={typeId}>
                            <Input size="small" disabled={true} value={typeNav} />
                        </Tooltip>
                    </Col>
                </Row>
            </div>
            <div style={{marginBottom: 8}}>
                <Row>
                    <Col span={6}>
                        组件名称
                    </Col>
                    <Col span={18}>
                        <Tooltip placement="bottom" title={name}>
                            <Input
                                size="small"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                onBlur={e => handleNameBlur(e.target.value)}
                            />
                        </Tooltip>
                    </Col>
                </Row>
            </div>
            {
                !isChild &&
                <>
                    <div style={{marginBottom: 8}}>
                        <Row>
                            <Col span={6}>组件宽高</Col>
                            <Col span={9}>
                                <Tooltip placement="bottom" title="宽度(px)">
                                    <InputNumber
                                        size="small" min={1} max={100000}
                                        value={width}
                                        onChange={value => setWidth(value)}
                                        onBlur={e => handleWidthBlur(+e.target.value)}
                                    />
                                </Tooltip>
                            </Col>
                            <Col span={9}>
                                <Tooltip placement="bottom" title="高度(px)">
                                    <InputNumber
                                        size="small" min={1} max={100000}
                                        value={height}
                                        onChange={value => setHeight(value)}
                                        onBlur={e => handleHeightBlur(+e.target.value)}
                                    />
                                </Tooltip>
                            </Col>
                        </Row>
                    </div>
                    <div style={{marginBottom: 8}}>
                        <Row>
                            <Col span={6}>组件布局</Col>
                            <Col span={9}>
                                <Tooltip placement="bottom" title="左边距(px)">
                                    <InputNumber
                                        size="small" min={-10000} max={100000}
                                        value={left}
                                        onChange={value => setLeft(value)}
                                        onBlur={e => handleLeftBlur(+e.target.value)}
                                    />
                                </Tooltip>
                            </Col>
                            <Col span={9}>
                                <Tooltip placement="bottom" title="上边距(px)">
                                    <InputNumber
                                        size="small" min={-10000} max={100000}
                                        value={top}
                                        onChange={value => setTop(value)}
                                        onBlur={e => handleTopBlur(+e.target.value)}
                                    />
                                </Tooltip>
                            </Col>
                        </Row>
                    </div>
                    <div style={{marginBottom: 8}}>
                        <Row>
                            <Col span={6}>组件层级</Col>
                            <Col span={9}>
                                <InputNumber
                                    size="small" min={0}
                                    value={zIndex}
                                    onChange={value => setZIndex(value)}
                                    onBlur={e => handleZIndexBlur(+e.target.value)}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div style={{marginBottom: 8}}>
                        <Collapse bordered={false} size="small">
                            <Panel key="RotateConfig" header="旋转">
                                <RotateConfig
                                    rotateX={rotateX}
                                    rotateY={rotateY}
                                    rotateZ={rotateZ}
                                    onChange={handleRotateChange}
                                />
                            </Panel>
                            <Panel key="StyleFilterConfig" header="滤镜">
                                <StyleFilterConfig
                                    filters={styleFilters}
                                    onChange={handleStyleFiltersChange}
                                />
                            </Panel>
                            <Panel key="show-hide" header="显示/隐藏">
                                <ShowHideConfig
                                    {...component}
                                    variables={canvas.variables}
                                    onChange={handleShowChange}
                                />
                                {/*<Button*/}
                                {/*    style={{width: '100%',borderColor: '#40a9ff', color: '#40a9ff'}}*/}
                                {/*    size="small" type="dashed" icon={_show ? <EyeInvisibleOutlined /> : <EyeOutlined />}*/}
                                {/*    onClick={() => handleShowChange(!_show)}*/}
                                {/*>{_show ? '隐藏' : '显示'}组件</Button>*/}
                            </Panel>
                        </Collapse>
                    </div>
                    <div style={{marginBottom: 8}}>
                        <Row>
                            <Col span={24}>
                                <Tooltip placement="top" title="可按退格键删除">
                                    <Button
                                        style={{width: '100%',borderColor: '#ff4d4f', color: '#ff4d4f'}}
                                        size="small" type="dashed" icon={<DeleteOutlined />}
                                        onClick={handleDelete}
                                    >删除组件</Button>
                                </Tooltip>
                            </Col>
                        </Row>
                    </div>
                </>
            }
        </>
    )
}