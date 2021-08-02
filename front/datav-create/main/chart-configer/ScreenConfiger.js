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
import Configer from "../../components/screen/configer";

export default function ScreenConfiger(){
    
    return (
        <Card
            size="small" title="页面设置" bordered={false}
            style={{ height: '100%',overflow: 'scroll',overflowX: 'hidden',width: '100%' }}
        >
            <Configer/>
        </Card>
    )
}