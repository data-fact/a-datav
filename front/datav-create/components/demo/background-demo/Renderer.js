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

export default function Renderer({component}){

    //component为组件状态，组件状态改变会触发渲染器重新渲染
    let {i: id,_ready,backgroundColor,w,h} = component
    //固定写法，组件非ready时很多属性为空值，如果继续执行可能导致空指针
    if(!_ready)
        return null
    //返回一个简单的div，背景色是在state.js中定义的backgroundColor属性，Configer中可以对该属性进行修改
    return <div style={{backgroundColor:backgroundColor,width: w,height: h}}></div>
}