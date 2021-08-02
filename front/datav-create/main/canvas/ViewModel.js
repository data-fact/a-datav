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
import {Button} from 'antd4'
import CommonRenderer from "./CommonRenderer";
import useCanvasReducer from "../../reducers/useCanvasReducer";
import {componentShouldShow} from "../../utils/util";

export default function ViewModel({components}){

    let [canvas] = useCanvasReducer()

    return (
        <>
            {
                Object.keys(components).map(id=> {
                    //不显示子组件
                    if(components[id]._parent_id)
                        return null

                    let {
                        _ready,x,y,w,h,_z_index:zIndex,
                        _rotate_x:rotateX, _rotate_y:rotateY, _rotate_z:rotateZ, _style_filters:styleFilters
                    } = components[id]
                    if(!_ready)
                        return <div key={id}></div>

                    let style = {
                        width:w, height:h,
                        top:y,left:x,
                        position: 'absolute',
                        zIndex
                    }
                    if(!componentShouldShow(components[id],canvas.variables))
                        style.display = 'none'

                    let filterStr = canvas.styleFilters.concat(styleFilters)
                        .filter(f => !!f.type)
                        .map(f => `${f.type}(${f.persent}%)`)
                        .join(' ')
                    return <div style={style}>
                        <div
                            className={`datav-canvas-component`}
                            style={{
                                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
                                filter: filterStr
                            }}
                            key={id}
                        >
                            <CommonRenderer key={id} component={components[id]}/>
                        </div>
                    </div>
                })
            }
        </>
    )
}