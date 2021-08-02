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
import Resizer from "./Resizer";

let layerX = 0,layerY = 0
export default function Block(
    {
        children,position, interval,checked,
        onClick,onDragStop,onResizeStop
    }){

    let [active,setActive] = useState(false)
    let [reference,setReference] = useState(null)
    let [xy,setXY] = useState({x:0,y:0})

    useEffect(() => {
        let {x,y} = position
        if(x != xy.x || y != xy.y)
            setXY({x,y})
    },[position])

    let {i,w = 100,h = 100,_z_index: zIndex} = position
    let {x = 100,y = 100} = xy
    return <div
        ref={setReference}
        className={`dnd-grid-layout-block ${active ? 'active' : ''}`}
        style={{
            width:w, height:h,
            left:x, top:y,
            position: 'absolute',
            zIndex,
            cursor: checked ? 'move': ''
        }}
        draggable={checked}
        onClick={e => {
            e.stopPropagation();
            onClick(e)
        }}
        onDragStart={e => {
            if(e.target != reference){
                return ;
            }
            setActive(true)
            e.dataTransfer.setDragImage(new Image(), 0, 0);
            layerX = e.nativeEvent.offsetX
            layerY = e.nativeEvent.offsetY
        }}
        onDrag={e => {
            if(e.target != reference)
                return ;
            e.preventDefault();
            let {offsetX,offsetY,x:ex,y:ey} = e.nativeEvent
            if(ex <= 0 || ey <= 0)
                return
            let newXY = {
                x: x + offsetX - layerX,
                y: y + offsetY - layerY
            }
            // if(moveX % interval <= 0)
            //     setXY({...xy,x: moveX})
            // if(moveY % interval <= 0)
            //     setXY({...xy,y: moveY})
            setXY(newXY)
        }}
        onDragEnd={e => {
            if(e.target != reference)
                return ;
            e.preventDefault();
            setActive(false)
            // onDragStop({x,y})
            let newXY = {
                x: Math.round(x / interval) * interval,
                y: Math.round(y / interval) * interval
            }
            setXY(newXY)
            onDragStop(newXY)
        }}
    >
        <>
            <div style={{width: '100%',height: '100%',pointerEvents: 'none',cursor: 'move'}}>
                {children}
            </div>
            <Resizer
                checked={checked}
                container={position}
                interval={interval}
                onResizeStop={onResizeStop}
                moving={active}
                xy={xy}
            />
        </>
    </div>
}