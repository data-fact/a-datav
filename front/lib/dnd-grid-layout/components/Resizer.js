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
import {Badge} from 'antd4'

const resizerWidth = 20
const resizerHeight = 20
let layerX = 0,layerY = 0
let resizeHandles = ['sw','nw','se','ne']
export default function Resizer({container,interval,checked,onResizeStop,moving,xy}){

    let {i:id,w:containerWidth,h:containerHeight,x:containerX,y:containerY,_mark_color} = container

    let [width,setWidth] = useState(0)
    let [height,setHeight] = useState(0)
    let [x,setX] = useState(0)
    let [y,setY] = useState(0)
    let [active,setActive] = useState(false)

    useEffect(() => {
        setWidth(containerWidth)
        setHeight(containerHeight)
    },[containerWidth,containerHeight])
    useEffect(() => setX(0),[containerX])
    useEffect(() => setY(0),[containerY])

    function handleNWDrag(e) {
        let {offsetX,offsetY} = e.nativeEvent
        let moveW = width - (offsetX - layerX)
        let moveH = height - (offsetY - layerY)
        let moveX = x + offsetX - layerX
        let moveY = y + offsetY - layerY
        if(moveW > 0 && moveH > 0){
            setWidth(moveW)
            setX(moveX)
            setHeight(moveH)
            setY(moveY)
        }
    }
    function handleNEDrag(e) {
        let {offsetX,offsetY} = e.nativeEvent
        let moveW = width + offsetX - layerX
        let moveH = height - (offsetY - layerY)
        let moveY = y + offsetY - layerY
        if(moveW > 0 && moveH > 0){
            setWidth(moveW)
            setHeight(moveH)
            setY(moveY)
        }
    }
    function handleSWDrag(e) {
        let {offsetX,offsetY} = e.nativeEvent
        let moveW = width - (offsetX - layerX)
        let moveH = height + offsetY - layerY
        let moveX = x + offsetX - layerX
        if(moveW > 0 && moveH > 0){
            setWidth(moveW)
            setX(moveX)
            setHeight(moveH)
        }
    }
    function handleSEDrag(e) {
        let {offsetX,offsetY} = e.nativeEvent
        let moveW = width + offsetX - layerX
        let moveH = height + offsetY - layerY
        if(moveW > 0 && moveH > 0){
            setWidth(moveW)
            setHeight(moveH)
        }
    }

    return (
        <>
        {
            checked &&
            <span
                style={{
                    display: 'block',
                    position: 'absolute',
                    left: x - 50, top: y - 60
                }}
            >
                {
                    _mark_color ?
                        <Badge dot offset={[5,0]} color={_mark_color}>
                            <PositionMark x={xy.x + x} y={xy.y + y} zIndex={container._z_index} interval={interval}/>
                        </Badge>
                        :
                        <PositionMark x={xy.x + x} y={xy.y + y} zIndex={container._z_index} interval={interval}/>
                }

            </span>

        }
        <div
            className={`dnd-grid-layout-resizer-border ${active ? 'active' : ''} ${checked ? 'checked' : ''}`}
            style={{position: 'absolute',width,height,top: y,left: x}}
        >
            {
                checked || active ?
                    resizeHandles.map(placement => {
                        let style = getStyle(placement,width,height,x,y)
                        return <div
                            key={`${id}-${placement}`}
                            className={`dnd-grid-layout-resizer-${placement}`}
                            style={{...style,width:resizerWidth,height:resizerHeight,position: 'absolute'}}
                            draggable="true"
                            onDragStart={e => {
                                setActive(placement)
                                e.dataTransfer.setDragImage(new Image(), 0, 0);
                                layerX = e.nativeEvent.offsetX
                                layerY = e.nativeEvent.offsetY
                            }}
                            onDrag={e => {
                                e.preventDefault();
                                switch (placement) {
                                    case 'nw':
                                        return handleNWDrag(e)
                                    case 'ne':
                                        return handleNEDrag(e)
                                    case 'sw':
                                        return handleSWDrag(e)
                                    case 'se':
                                        return handleSEDrag(e)
                                }

                            }}
                            onDragEnd={e => {
                                e.preventDefault();
                                setActive(false)
                                // let {offsetX,offsetY} = e.nativeEvent
                                // let wh = {
                                //     w: Math.round((width + offsetX - layerX) / interval) * interval,
                                //     h: Math.round((height + offsetY - layerY) / interval) * interval
                                // }
                                let wh = {
                                    w: Math.round(width / interval) * interval,
                                    h: Math.round(height / interval) * interval,
                                    x: Math.round(x / interval) * interval,
                                    y: Math.round(y / interval) * interval
                                }
                                if(wh.w < 10) wh.w = 10
                                if(wh.h < 10) wh.h = 10
                                onResizeStop(wh)
                            }}
                        >
                            {
                                active == placement &&
                                <span
                                    style={{
                                        display: 'block',
                                        position: 'absolute',
                                        color: 'red', fontSize: 20,
                                        minWidth: 180,
                                        left: 50,top: 30,
                                    }}
                                >
                                    {`大小:${Math.round(width / interval) * interval}x${Math.round(height / interval) * interval}`}
                                </span>
                            }
                        </div>
                    })
                    :
                    null
            }
        </div>
        </>
    )
}
function getStyle(placement,width = 0,height = 0,x = 0,y = 0) {
    switch (placement) {
        case 'nw':
            return {left: -2, top: -2}
        case 'ne':
            return {left: width - resizerWidth - 2, top: -2}
        case 'sw':
            return {left: -2, top: height - resizerHeight - 2}
        case 'se':
        default:
            return {left: width - resizerWidth - 2, top: height - resizerHeight - 2}
    }
}
function PositionMark({x,y,zIndex,interval}) {
    return (
        <span style={{color: 'red', fontSize: 20}}>
            {`坐标:${Math.round(x / interval) * interval},${Math.round(y / interval) * interval}`}
            <br/>{`层级:${zIndex}`}
        </span>
    )
}