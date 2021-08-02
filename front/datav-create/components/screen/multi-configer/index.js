/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/1/8.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Card,Tabs,Tooltip} from 'antd4'
import { SlidersOutlined } from '@ant-design/icons';
import useCanvasReducer from "../../../reducers/useCanvasReducer";
import Operation from "./Operation";
import ShowHideWarp from "./ShowHideWarp";
const {TabPane} = Tabs
const { Meta } = Card

export default function MultiConfiger(){

    let [canvas,canvasDispatch] = useCanvasReducer()
    let {focusId,components} = canvas

    function updateComponents(components) {
        canvasDispatch({ type: 'UPDATE_COMPONENTS', components })
    }
    function handleMoveOrSize(key,opt,val) {
        let newComponents = {}
        focusId.forEach(id => {
            if (id == 'screen') return
            let value = components[id][key]
            value = opt == '+' ? value + val : value - val
            newComponents[id] = { [key]: value }
        })
        updateComponents(newComponents)
    }
    function handleZIndex(opt,val) {
        let newComponents = {}
        focusId.forEach(id => {
            if (id == 'screen') return
            let value = components[id]['_z_index']
            if (value <= 0 && opt == '-')
                return
            value = opt == '+' ? value + val : value - val
            newComponents[id] = { '_z_index': value }
        })
        updateComponents(newComponents)
    }
    function handleMarkColor(color) {
        let newComponents = {}
        focusId.forEach(id => {
            if (id == 'screen') return
            newComponents[id] = { '_mark_color': color }
        })
        updateComponents(newComponents)
    }
    function handleShowHideChange(key,value,defEval) {
        let newComponents = {}
        focusId.forEach(id => {
            if (id == 'screen') return
            newComponents[id] = { [key]: value }
            if(defEval)
                newComponents[id]['_show_eval'] = defEval
        })
        updateComponents(newComponents)
    }

    return (
        <Card
            size="small" style={{ width: '100%',height: '100%' }}
            bodyStyle={{heigth: '100%'}} bordered={false}
        >
            <Tabs
                size="small" className={"datav-common-chart-configer-tabs"}
                style={{ width: '100%',height: '100%' }}
                activeKey={"1"}
            >
                <TabPane
                    key="1"
                    style={{height: '100%'}}
                    tab={
                        <Tooltip placement="bottom" title="多组件操作">
                            <SlidersOutlined style={{fontSize: "large"}} />
                        </Tooltip>
                    }
                >
                    <Card
                        size="small"
                        style={{overflow: 'hidden scroll'}}
                        title={
                            <Meta
                                title={"多选组件"}
                                description={<span>{`已选中${focusId.length}个组件`}</span>}
                            />
                        }
                    >
                        <Operation onMoveOrSize={handleMoveOrSize} onZIndex={handleZIndex} onMarkColor={handleMarkColor}/>
                        <ShowHideWarp variables={canvas.variables} onChange={handleShowHideChange}/>
                    </Card>
                </TabPane>
            </Tabs>
        </Card>
    )
}