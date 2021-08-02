/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/15.
 * Description:
 * Modified By:
 */
import React,{useEffect} from 'react'
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import state from "../state";
import useInitComponent from "../../../../hooks/useInitComponent";
import BackgroundConfiger from "../../../common/BackgroundConfiger";
import useCanvasReducer from "../../../../reducers/useCanvasReducer";
import {BACKGROUND_REPEAT_TYPE} from "../../../../common/constant";

export default function Configer({component}){

    let {i: id,bgType,gradient,color,image,borderRadius,repeatType = BACKGROUND_REPEAT_TYPE.adapt} = component

    let [canvas] = useCanvasReducer()
    let updateComponent = useUpdateComponent()

    //初始化state
    let ready = useInitComponent(component,state)

    if(!ready)
        return null

    function handleTypeChange(bgType) {
        updateComponent(id,{bgType})
    }
    function handleGradientChange(gradient) {
        updateComponent(id,{gradient})
    }
    function handleColorChange(color) {
        updateComponent(id,{color})
    }
    function handleImageChange(image) {
        updateComponent(id,{image})
    }
    function handleBorderRadiusChange(borderRadius) {
        updateComponent(id,{borderRadius})
    }
    function handleRepeatTypeChange(repeatType) {
        updateComponent(id,{repeatType})
    }

    return (
        <>
            <BackgroundConfiger
                id={canvas.id}
                type={bgType} onTypeChange={handleTypeChange}
                gradient={gradient} onGradientChange={handleGradientChange}
                color={color} onColorChange={handleColorChange}
                image={image} onImageChange={handleImageChange}
                borderRadius={borderRadius} onBorderRadiusChange={handleBorderRadiusChange}
                repeatType={repeatType} onRepeatTypeChange={handleRepeatTypeChange}
            />
        </>
    )
}