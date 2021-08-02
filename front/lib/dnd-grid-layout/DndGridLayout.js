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
import Block from "./components/Block";

export default function DndGridLayout(
    {
        children,layout,interval,checkedIds, onBlockClick,
        onLayoutChange,onDragStop,onResizeStop
    }){

    // resizeHandles = validResizeHandles(resizeHandles)

    function handleDragStop(e,position){
        let {i,w,h} = position
        e = {...e,i,w,h}
        onDragStop && onDragStop(e)
        onLayoutChange && onLayoutChange(e)
    }
    function handleResizeStop(e,position) {
        let {i,x,y} = position
        x += e.x || 0
        y += e.y || 0
        e = {...e,i,x,y}
        onResizeStop && onResizeStop(e)
        onLayoutChange && onLayoutChange(e)
    }

    return (
        <div
            className={"dnd-grid-layout-container"}
            style={{width: '100%',height: '100%'}}
        >
            {
                React.Children.map(children,element => {
                    if(!element)
                        return null
                    let {key} = element
                    let position = layout[key]
                    if(!position) return null
                    return <Block
                        position={position}
                        interval={interval}
                        // resizeHandles={resizeHandles}
                        checked={checkedIds.indexOf(key) >= 0}
                        onClick={e => onBlockClick(e,key)}
                        onDragStop={e => handleDragStop(e,position)}
                        onResizeStop={e => handleResizeStop(e,position)}
                    >
                        {element}
                    </Block>
                })
            }
        </div>
    )
}
// let rightResizeHandles = ['sw','nw','se','ne']
// let defautResizeHandles = ['se']
// function validResizeHandles(resizeHandles) {
//     if(!Array.isArray(resizeHandles))
//         return [...defautResizeHandles]
//     resizeHandles = [...resizeHandles]
//     resizeHandles = resizeHandles.filter(rh => rightResizeHandles.indexOf(rh) >= 0)
//     if(!resizeHandles.length)
//         return [...defautResizeHandles]
//     return resizeHandles;
// }