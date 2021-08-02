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
import {Row,Col,Radio} from 'antd4'
import state from "../state";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import CommonChartConfiger from "../../../common/common-chart-configer/CommonChartConfiger";
import Custom from "../../../demo/general-demo/configer/Custom";
import useInitComponent from "../../../../hooks/useInitComponent";

export default function Configer({component}){

    let {i: id,_ready,option,roseType} = component

    //初始化state
    let ready = useInitComponent(component,state)
    let updateComponent = useUpdateComponent()

    if(!_ready)
        return null

    function handleOptionChange(option) {
        updateComponent(id,{option})
    }
    function handleRoseTypeChange(roseType) {
        updateComponent(id,{roseType})
    }

    return (
        <CommonChartConfiger
            custom={
                <Row>
                    <Col span={6}>模式</Col>
                    <Col>
                        <Radio.Group
                            size="small" value={roseType}
                            onChange={e => handleRoseTypeChange(e.target.value)}
                        >
                            <Radio.Button value="radius">角度模式</Radio.Button>
                            <Radio.Button value="area">面积模式</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
            }
            baseOption={option}
            onChange={handleOptionChange}
        />
    )
}