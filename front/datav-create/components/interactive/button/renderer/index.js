/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/15.
 * Description:
 * Modified By:
 */
import React, {useEffect, useState} from 'react'
import {Button} from 'antd4'
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import useHandleEvent from "../../../../hooks/useHandleEvent";
import useGetColors from "../../../../hooks/useGetColors";
import {genColorStyle} from "../../../../utils/util";

export default function Renderer({component}) {

    let {
        i: id, _ready, w, h, placeholder, colors, borderColors, borderType, borderWidth, borderRadius,
        size, color, spacing, family, align
    } = component

    let seriesColors = useGetColors()
    let [style, setStyle] = useState({})
    useEffect(() => {
        let borderColorStyle = genColorStyle(borderColors,seriesColors,1)
        let backgroundColorStyle = genColorStyle(colors,seriesColors)
        let style = {
            borderStyle: borderType,
            borderColor: borderColorStyle.color,
            borderImage: borderColorStyle.gradientColor,
            borderWidth: borderWidth,
            borderRadius:borderRadius,
            backgroundColor: backgroundColorStyle.color,
            backgroundImage: backgroundColorStyle.gradientColor
        }

        setStyle(style)
    }, [borderType,borderRadius, borderColors, borderWidth, seriesColors, colors])


    let handleEvent = useHandleEvent()

    if (!_ready)
        return null

    function handleClick() {
        handleEvent(id, 'click', {id, event_id: UUID.generate()})
    }

    return (
        <div className={'datav-antd-component'} style={{width: w}}>
            <Button
                style={{
                    ...style,
                    width: w,
                    height: h,
                    color: color,
                    fontSize: size,
                    fontFamily: family,
                    letterSpacing: spacing,
                    textAlign: align,
                }}
                type={borderType}
                onClick={handleClick}
            >
                {placeholder}
            </Button>
        </div>
    )
}
