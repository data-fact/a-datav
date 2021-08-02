/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Card} from 'antd4'
import Level1 from "./Level1";
import components from "../../components/config";
import useCanvasReducer from "../../reducers/useCanvasReducer";

export default function ComponentList(){

    return (
        <Card
            title="组件列表"
            size="small" bordered={false}
            style={{ height: '100%',overflow: 'scroll',overflowX: 'hidden',width: '100%' }}
            bodyStyle={{padding: 6}}
        >
            <Level1 components={components}/>
        </Card>
    )
}