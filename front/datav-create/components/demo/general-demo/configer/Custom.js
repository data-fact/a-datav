/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/11/9.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import update from 'immutability-helper';
import {Input,Row,Col} from 'antd4'

export default function Custom({option,onChange}){

    let [title,setTitle] = useState('')
    useEffect(() => {
        setTitle(option.title && option.title.text ? option.title.text : '')
    },option)

    function handleTitleBlur(e) {
        let {value} = e.target
        onChange(update(option,{title: {text: {$set: value}}}))
    }

    return (
        <>
           <Row>
               <Col span={6}>标题</Col>
               <Col span={10}>
                   <Input
                       size="small"
                       value={title}
                       onChange={e => setTitle(e.target.value)}
                       onBlur={handleTitleBlur}
                   />
               </Col>
           </Row>
        </>
    )
}