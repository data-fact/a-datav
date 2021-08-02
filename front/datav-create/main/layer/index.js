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
import {Card,List,Badge} from 'antd4'
import useCanvasReducer from "../../reducers/useCanvasReducer";
import {getInstanceByTypeId} from "../../common/common";
import {sortComponentsToKey} from "../../utils/util";
import ComponentImage from "../component-list/ComponentImage";

export default function Layer(){

    let [canvas,canvasDispatch] = useCanvasReducer()
    let {focusId,components} = canvas
    let [componentIds,setComponentIds] = useState([])
    useEffect(() => {
        setComponentIds(sortComponentsToKey(components))
    },[components])

    function handleClick(e,fId) {
        if(e.metaKey || e.ctrlKey){
            let ids = [...focusId]
            let index = focusId.indexOf(fId)
            if(index >= 0)
                ids.splice(index,1)
            else
                ids.push(fId)
            canvasDispatch({type: 'CHANGE_FOCUS_ID', focusId: ids})
        }else if(e.shiftKey){
            let ids = [...focusId]
            if(!ids.length || ids[0] == 'screen')
                ids = [fId]
            else{
                let allIds = [...componentIds]
                let start = allIds.indexOf(ids[ids.length - 1])
                let end = allIds.indexOf(fId)
                if(end >= start)
                    ids = allIds.slice(start,end + 1)
                else
                    ids = allIds.slice(end,start + 1)
            }
            canvasDispatch({type: 'CHANGE_FOCUS_ID', focusId: ids})
        }else{
            canvasDispatch({type: 'CHANGE_FOCUS_ID', focusId: [fId]})
        }
    }

    return (
        <Card
            title="图层"
            size="small" bordered={false}
            style={{ height: '100%',overflow: 'scroll',overflowX: 'hidden',width: '100%' }}
            bodyStyle={{padding: 6}}
        >
            <List
                size="small"
                dataSource={componentIds}
                renderItem={id => {
                    if(!components[id]) return null
                    let {_name,_typeId,_parent_id,_mark_color} = components[id]
                    if(_parent_id) return null
                    let instance = getInstanceByTypeId(_typeId)
                    let {icon,descr,configer,renderer,tooltip,image} = instance || {}
                    let focus = focusId.indexOf(id) >= 0
                    return <List.Item style={{padding: '0 0 4px 0'}}>
                        <div
                            title={_name}
                            style={{
                                width: '100%', cursor: 'pointer',
                                display: 'flex', alignItems: 'center',
                                backgroundColor: focus ? '#165996' : '#333',
                                border: focus ? '1px solid' : ''
                            }}
                            onClick={e => handleClick(e,id)}
                        >
                            {
                                _mark_color ?
                                    <Badge dot color={_mark_color}>
                                        <ComponentImage image={image} icon={icon} descr={descr}/>
                                    </Badge>
                                    :
                                    <ComponentImage image={image} icon={icon} descr={descr}/>
                            }
                            <span className="span-ellipsis" style={{marginLeft: 6,width: '50%'}}>
                            {_name}
                            </span>
                        </div>

                    </List.Item>
                }}
            />
        </Card>
    )
}