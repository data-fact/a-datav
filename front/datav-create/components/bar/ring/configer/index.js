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
import update from 'immutability-helper';
import {Row,Col,Switch} from 'antd4'
import state from "../state";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import CommonChartConfiger from "../../../common/common-chart-configer/CommonChartConfiger";
import Custom from "../../../demo/general-demo/configer/Custom";
import useInitComponent from "../../../../hooks/useInitComponent";

export default function Configer({component}){

    let {i: id,_ready,option} = component

    //初始化state
    let ready = useInitComponent(component,state)
    let updateComponent = useUpdateComponent()

    if(!_ready)
        return null

    function handleOptionChange(option) {
        updateComponent(id,{option})
    }

    return (
        <CommonChartConfiger
            baseOption={option}
            onChange={handleOptionChange}
        />
    )
}