/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React,{useRef,useEffect,useState} from 'react'
import {Row,Col} from 'antd4'
import useCanvasReducer from "../../reducers/useCanvasReducer";
import useSupportReducer from "../../reducers/useSupportReducer";
import Canvas from "../canvas";
import ScaleEditor from "./ScaleEditor";
import ToolBox from "./ToolBox";
import './canvas-editor.css'

const defHeaderHeight = 50
const footerHeight = 30
const canvasPadding = 60
let containerScroll
const rule1Id = 'datav-canvas-editor-ruler1'
const rule2Id = 'datav-canvas-editor-ruler2'
export default function CanvasEditor(){

    let [canvas,canvasDispatch] = useCanvasReducer()
    let [support,supportDispatch] = useSupportReducer()
    let containerRef = useRef(null)
    let [containerW,setContainerW] = useState(0)
    let [containerH,setContainerH] = useState(0)

    let {screen: canvasScreen} = canvas
    let {screen: supportScreen,layout,viewModel} = support
    let screen = Object.assign({},canvasScreen,supportScreen)
    let {toolbar} = layout
    let {width,height,scale} = screen
    let headerHeight = toolbar.show ? defHeaderHeight : 0

    useEffect(() => {
        let resizeObserver = new ResizeObserver(entries => {
            if(containerRef.current){
                setContainerW(containerRef.current.offsetWidth)
                setContainerH(containerRef.current.offsetHeight)
            }
        })
        resizeObserver.observe(containerRef.current)
    },[containerRef])
    useEffect(() => {
        setTimeout(() => {
            if(containerScroll)
                containerScroll.destroy()
            containerScroll = new IScroll(containerRef.current, {
                scrollbars: true,
                scrollY: true,
                scrollX: true,
                disableMouse: true,
                disablePointer: true,
                // freeScroll: true,
                mouseWheel: true,
                interactiveScrollbars: true,
                // resizeScrollbars: false,
                // shrinkScrollbars: 'clip',
                // fadeScrollbars: true
                indicators: {
                    el: document.getElementById('datav-canvas-scale-editor-minimap'),
                    interactive: true
                }
            });

            //调用刻度尺方法
            ruler.initPlugin({el: rule1Id, scale});
            ruler.initPlugin({el: rule2Id, scale});
        })
    },[containerRef,height,width,scale,containerW,containerH])

    function handleChangeScale(scale) {
        supportDispatch({type: 'CHANGE_SCREEN_SCALE',scale})
    }
    function handleBlankClick() {
        canvasDispatch({type: 'CHANGE_FOCUS_ID',focusId: ['screen']})
    }
    function handleViewModelChange(viewModel) {
        supportDispatch({type: 'CHANGE_VIEW_MODEL',viewModel})
    }
    function handleShowVariables() {
        supportDispatch({type: 'SET_SHOW_VARIABLES',show:true})
    }
    function handleThemeChange(theme) {
        canvasDispatch({type: 'CHANGE_THEME',theme})
    }
    function handleSeriesColorsChange(colors) {
        canvasDispatch({type: 'CHANGE_COLORS',colors})
    }
    function handleFiltersChange(styleFilters) {
        canvasDispatch({type: 'CHANGE_STYLE_FILTERS',styleFilters})
    }

    let marginWidth = width * scale > containerW ? 300 : containerW - width * scale + 500
    let marginHeight =  height * scale > containerH ? 200 : containerH - height * scale + 400
    let outerWidth = canvasPadding + (width + marginWidth)
    let outerHeight = canvasPadding + (height + marginHeight)
    return (
        <Row style={{height: '100%'}}>
            {
                toolbar.show &&
                <Col span={24}>
                    <ToolBox
                        viewModel={viewModel}
                        onViewModelChange={handleViewModelChange}
                        onShowVariables={handleShowVariables}
                        onThemeChange={handleThemeChange}
                        onSeriesColorsChange={handleSeriesColorsChange}
                        onFiltersChange={handleFiltersChange}
                    />
                </Col>
            }
            <Col span={24} style={{height: `calc(100% - (${headerHeight}px + ${footerHeight}px))`}}>
                <div id="datav-canvas-container" ref={containerRef} style={{width: '100%', height: '100%',overflow: 'hidden',position: 'absolute'}}>
                    <div
                        style={{
                            width: outerWidth * scale,
                            height: outerHeight * scale,
                            position: 'absolute'
                        }}
                        onClick={handleBlankClick}
                    >
                        <div className="ruler-wrap" id={rule1Id} style={{
                            width: scale > 1 ? outerWidth * scale : outerWidth, height: 20,
                            lineHeight: 1
                        }}></div>
                        <div className="ruler-wrap" id={rule2Id}
                             style={{
                                 transform: 'rotate(90deg)',transformOrigin: '0 20px',position: 'absolute',
                                 left: 0,top: -20,
                                 width: scale > 1 ? outerHeight * scale : outerHeight, height: 20,
                                 lineHeight: 1
                             }}>
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                left: canvasPadding,
                                top: canvasPadding,
                                width, height,
                                transform: `scale(${scale}) translate(0px, 0px)`,
                                transformOrigin: '0 0',
                            }}
                        >
                            <Canvas width={width} height={height}/>
                        </div>
                    </div>
                </div>
            </Col>
            <Col span={24}>
                <div
                    className={'datav-canvas-footer'}
                    style={{height: footerHeight,display: 'flex',justifyContent:'flex-end'}}
                >
                    <ScaleEditor
                        scale={scale}
                        canvasPadding={canvasPadding}
                        containerW={containerW}
                        containerH={containerH}
                        outerWidth={outerWidth}
                        outerHeight={outerHeight}
                        width={width}
                        height={height}
                        onChange={handleChangeScale}
                    />
                </div>
            </Col>
        </Row>
    )
}