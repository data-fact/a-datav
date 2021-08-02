/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/19.
 * Description:
 * Modified By:
 */
import React from 'react'
import CommonRenderer from "./CommonRenderer";
import DndGridLayout from "../../../lib/dnd-grid-layout/DndGridLayout";
import useCanvasReducer from "../../reducers/useCanvasReducer";
import {componentShouldShow} from "../../utils/util";

export default function EditModel(
    {
        components,interval,focusId,onComponentClick,onLayoutChange
    }){

    let [canvas] = useCanvasReducer()

    //不显示子组件
    focusId = focusId.map(id => components[id] && components[id]._parent_id ? components[id]._parent_id : id)

    return (
        <DndGridLayout
            margin={[0,0]}
            layout={components}
            interval={interval}
            checkedIds={focusId}
            onBlockClick={onComponentClick}
            onLayoutChange={onLayoutChange}
            isDroppable={true}
        >
            {
                Object.keys(components).map(id=> {
                    //不显示子组件
                    if(components[id]._parent_id)
                        return null

                    let {
                        _ready,x,y,w,h,_rotate_x:rotateX, _rotate_y:rotateY,
                        _rotate_z:rotateZ, _style_filters:styleFilters
                    } = components[id]
                    if(!_ready)
                        return <div key={id}></div>
                    let filterStr = canvas.styleFilters.concat(styleFilters)
                        .filter(f => !!f.type)
                        .map(f => `${f.type}(${f.persent}%)`)
                        .join(' ')
                    let show = componentShouldShow(components[id],canvas.variables)
                    return <div
                        className={`datav-canvas-component ${focusId.indexOf(id) >= 0 ? 'action' : ''}`}
                        style={{
                            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
                            filter: filterStr,
                            display: show ? '' : 'none'
                        }}
                        key={id}
                    >
                        <CommonRenderer key={id} component={components[id]}/>
                    </div>
                })
            }
        </DndGridLayout>
    )
}