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
import {Row,Col,Switch} from 'antd4'
import state from "../state";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import CommonChartConfiger from "../../../common/common-chart-configer/CommonChartConfiger";
import Custom from "../../../demo/general-demo/configer/Custom";
import useInitComponent from "../../../../hooks/useInitComponent";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";

export default function Configer({component}){

    let {i: id,_ready,option,symbolSize,scale} = component

    //初始化state
    let ready = useInitComponent(component,state)
    let updateComponent = useUpdateComponent()

    if(!_ready)
        return null

    function handleOptionChange(option) {
        updateComponent(id,{option})
    }
    function handleCustomChange(key,value) {
        updateComponent(id,{[key]: value})
    }

    return (
        <CommonChartConfiger
            custom={
                <>
                    <Row>
                        <Col span={6}>缩小比值</Col>
                        <Col span={10}>
                            <AInputNumber
                                options={{min:0.000001,size:'small'}}
                                value={symbolSize}
                                onBlur={val => handleCustomChange('symbolSize',val)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>脱离零值</Col>
                        <Col span={10}>
                            <Switch
                                size="small" checked={scale}
                                onChange={checked => handleCustomChange('scale',checked)}
                            />
                        </Col>
                    </Row>
                </>

            }
            baseOption={option}
            onChange={handleOptionChange}
        />
    )
}