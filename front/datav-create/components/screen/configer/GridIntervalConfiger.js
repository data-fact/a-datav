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
import {Row,Col,Tooltip} from 'antd4'
import AInputNumber from "../../../../lib/input-number/AInputNumber";

export default function GridIntervalConfiger({interval,onChange}){

    return (
        <Row>
            <Col span={6}>栅格间距</Col>
            <Col span={18}>
                <Tooltip placement="bottom" title="栅格间距(px)">
                    <AInputNumber
                        options={{min:0,max:1000}}
                        value={interval}
                        onBlur={val => onChange(val)}
                    />
                </Tooltip>
            </Col>
        </Row>
    )
}