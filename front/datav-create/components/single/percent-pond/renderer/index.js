import React, {useState, useEffect, useRef} from 'react'
import useHandleEvent from "../../../../hooks/useHandleEvent";
import {PercentPond} from '@jiaminghi/data-view-react'
import useGetColors from "../../../../hooks/useGetColors";

export default function Renderer({component}) {
    let handleEvent = useHandleEvent()
    let {i: id, _ready, w, h, border_width, border_gap, border_radius, line_width, line_space, text_color, colors, _data: data,local_gradient,text_color_show} = component
    let [colorObj, setColorObj] = useState(null)
    let getColors = useGetColors()
    useEffect(() => {

        let arr = null
        if (colors[0] === '' && colors[1]) {
            arr = [
                colors[1],
                colors[1],
            ]
        }
        if (colors[1] === '' && colors[0]) {
            arr = [
                colors[0],
                colors[0],
            ]
        }
        if (colors[1] && colors[0]) {
            arr = [
                colors[0],
                colors[1],
            ]
        }
        if (colors[1] === '' && colors[0] === '') {
            arr = [
                getColors[0],
                getColors[getColors.length - 1],
            ]
        }
        setColorObj(arr)
    }, [colors, getColors])

    function handleClick() {
        let value = data && data[0] ? data[0].value : 0
        handleEvent(id, 'click', {value})
    }

    if (!(_ready && data[0] && data[0].value))
        return null

    return <div onClick={handleClick}>
        <PercentPond
            config={{
                value: data[0].value * 100,
                borderWidth: border_width,
                borderGap: border_gap,
                lineDash: [line_width, line_space],
                borderRadius: border_radius,
                localGradient: local_gradient,
                textColor:text_color_show?text_color:"rgba(0,0,0,0)",
                colors:colorObj,
            }}
            style={{width: w, height: h}}
        />
    </div>
}