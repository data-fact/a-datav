/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React,{useRef} from 'react'
import { useDrop, useDrag } from 'ahooks';
import useCanvasReducer from "../../reducers/useCanvasReducer";
import {genImageUrl} from "../../../utils/util";
import useSupportReducer from "../../reducers/useSupportReducer";
import {BACKGROUND_REPEAT_TYPE, BACKGROUND_TYPE, GRADIENT_TYPE} from "../../common/constant";
import EditModel from "./EditModel";
import ViewModel from "./ViewModel";
import {useAddComponent} from "../../hooks/useAction";
import {getBackgroundImageStyle, getMousePosition} from "../../utils/util";

export default function Canvas({view}){

    let [canvas,canvasDispatch] = useCanvasReducer()
    let [support] = useSupportReducer()
    let {scale,interval} = support.screen
    let addComponent = useAddComponent()
    let {focusId,screen,components} = canvas
    let {bgType,color,gradient,image,borderRadius,repeatType = BACKGROUND_REPEAT_TYPE.adapt} = screen
    let {viewModel} = support
    viewModel = viewModel || view

    const [props, { isHovering }] = useDrop({
        onDom: (content, e) => {
            let position = getMousePosition(scale,interval,e)
            let {_typeId,_typeNav,_typeName,configer,renderer} = content
            let initComponent = {_typeId,_typeNav,_typeName,...position}
            addComponent(initComponent,configer,renderer)
        }
    });

    function handleLayoutChange(position) {
        let {i:id,x,y,w,h} = position
        canvasDispatch({type: 'UPDATE_COMPONENT',id,component: {x,y,w,h}})
    }

    function handleComponentClick(e,fId) {
        if(e.metaKey || e.ctrlKey){
            let ids = [...focusId]
            let index = focusId.indexOf(fId)
            if(index >= 0)
                ids.splice(index,1)
            else
                ids.push(fId)
            canvasDispatch({type: 'CHANGE_FOCUS_ID', focusId: ids})
        }else{
            canvasDispatch({type: 'CHANGE_FOCUS_ID', focusId: [fId]})
        }
    }

    let style = getBackgroundImageStyle({bgType,gradient,color,image,borderRadius,repeatType,size: 'cover'})
    return (
        <div
            id="datav-canvas-main"
            className={"datav-canvas-main datav-background"}
            style={{...style,position: 'relative'}}>
            {
                viewModel ?
                    <ViewModel components={components}/>
                    :
                    <div style={{height: '100%',width: '100%'}} {...props}>
                    <EditModel
                        components={components}
                        interval={interval}
                        focusId={focusId}
                        onComponentClick={handleComponentClick}
                        onLayoutChange={handleLayoutChange}
                    />
                    </div>
            }
        </div>
    )
}