/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/1/20.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Button} from 'antd4'

export default function Renderer({component}){

    let {i: id,_ready,backgroundColor,w,h} = component

    if(!_ready)
        return null

    return <div style={{backgroundColor:backgroundColor,width: w,height: h}}></div>
}