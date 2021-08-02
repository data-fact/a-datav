/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Row,Col,Button,Divider} from 'antd4'
import { UndoOutlined } from '@ant-design/icons';
import useCanvasReducer from "../../../reducers/useCanvasReducer";
import WidthHeightConfiger from "./WidthHeightConfiger";
import ScaleTypeConfiger from "./ScaleTypeConfiger";
import GridIntervalConfiger from "./GridIntervalConfiger";
import useSupportReducer from "../../../reducers/useSupportReducer";
import BackgroundConfiger from "../../common/BackgroundConfiger";
import useUploadImage from "../../../hooks/useUploadImage";
import {dataURLtoFile} from "../../../../utils/util";
import CoverConfiger from "./CoverConfiger";
import {BACKGROUND_REPEAT_TYPE} from "../../../common/constant";

export default function Configer(){

    let [canvas,canvasDispatch] = useCanvasReducer()
    let [support,supportDispatch] = useSupportReducer()
    let uploadImage = useUploadImage()
    let {
        width,height,bgType,gradient,color,image,scaleType,
        borderRadius,repeatType = BACKGROUND_REPEAT_TYPE.adapt
    } = canvas.screen
    let {interval} = support.screen

    function handleWidthBlur(value) {
        canvasDispatch({type: 'CHANGE_SCREEN_WIDTH',value})
    }
    function handleHeightBlur(value) {
        canvasDispatch({type: 'CHANGE_SCREEN_HEIGHT',value})
    }
    function handleTypeChange(value) {
        canvasDispatch({type: 'CHANGE_SCREEN_BACKGROUND_TYPE',value})
    }
    function handleColorChange(value) {
        canvasDispatch({type: 'CHANGE_SCREEN_COLOR',value})
    }
    function handleGradientChange(value) {
        canvasDispatch({type: 'CHANGE_SCREEN_GRADIENT',value})
    }
    function handleImageChange(value) {
        canvasDispatch({type: 'CHANGE_SCREEN_IMAGE',value})
    }
    function handleScaleTypeChange(value) {
        canvasDispatch({type: 'CHANGE_SCREEN_SCALE_TYPE',value})
    }
    function handleBorderRadiusChange(value) {
        canvasDispatch({type: 'CHANGE_SCREEN_BORDER_RADIUS',value})
    }
    function handleRepeatTypeChange(repeatType) {
        canvasDispatch({type: 'CHANGE_SCREEN_REPEAT_TYPE',repeatType})
    }
    function handleReset() {
        canvasDispatch({type: 'RESET_SCREEN'})
    }
    function handleGridIntervalChange(value) {
        supportDispatch({type: 'CHANGE_SCREEN_GRID_INTERVAL',value})
    }
    function handleCutCover() {
        html2canvas(document.querySelector("#datav-canvas-main"),{scale: 0.6}).then(img => {
            let file = dataURLtoFile(img.toDataURL("image/png"),'cover.png')
            uploadImage(canvas.id,file)
        });
    }
    function handleChangeCover(image) {
        canvasDispatch({type: 'CHANGE_COVER_IMAGE',image})
    }

    return (
        <>
            <div style={{marginBottom: 8}}>
                <WidthHeightConfiger
                    width={width} height={height}
                    onWidthBlur={handleWidthBlur}
                    onHeightBlur={handleHeightBlur}
                />
            </div>
            <div style={{marginBottom: 8}}>
                <BackgroundConfiger
                    id={canvas.id}
                    type={bgType} onTypeChange={handleTypeChange}
                    gradient={gradient}
                    onGradientChange={handleGradientChange}
                    color={color} onColorChange={handleColorChange}
                    image={image} onImageChange={handleImageChange}
                    borderRadius={borderRadius} onBorderRadiusChange={handleBorderRadiusChange}
                    repeatType={repeatType} onRepeatTypeChange={handleRepeatTypeChange}
                />
            </div>
            <div style={{marginBottom: 8}}>
                <ScaleTypeConfiger scaleType={scaleType} onChange={handleScaleTypeChange}/>
            </div>
            <div style={{marginBottom: 8}}>
                <GridIntervalConfiger interval={interval} onChange={handleGridIntervalChange}/>
            </div>
            <div style={{marginBottom: 8}}>
                <CoverConfiger url={canvas.image} onCut={handleCutCover} onChange={handleChangeCover}/>
            </div>
            <Divider/>
            <div style={{marginBottom: 8}}>
                <Row>
                    <Col span={6}>重置</Col>
                    <Col span={18}>
                        <Button
                            style={{borderColor: '#ff4d4f', color: '#ff4d4f'}}
                            size="small" type="dashed" icon={<UndoOutlined />}
                            onClick={handleReset}
                        >恢复默认页面设置</Button>
                    </Col>
                </Row>
            </div>
        </>
    )
}