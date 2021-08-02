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
import {Switch,Row,Col,InputNumber} from 'antd4'
import state from "../state";
import useInitComponent from "../../../../hooks/useInitComponent";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";

export default function Configer({component}){
    let {i:id,option,autoRotate,heightTexture,nightLayer,cloudsLayer,ambientLight,mainLight,globeRadius} = component

    //初始化state
    let ready = useInitComponent(component,state)

    let updateComponent = useUpdateComponent()

    if(!ready)
        return null

    function handleChange(key,value) {
        updateComponent(id,{[key]: value})
    }

    return (
        <>
            <Row style={{paddingBottom: 4}}>
                <Col span={6}>旋转</Col>
                <Col span={10}>
                    <Switch
                        size="small"
                        checked={autoRotate}
                        onChange={checked => handleChange('autoRotate',checked)}
                    />
                </Col>
            </Row>
            <Row style={{paddingBottom: 4}}>
                <Col span={6}>地形高度</Col>
                <Col span={10}>
                    <Switch
                        size="small"
                        checked={heightTexture}
                        onChange={checked => handleChange('heightTexture',checked)}
                    />
                </Col>
            </Row>
            <Row style={{paddingBottom: 4}}>
                <Col span={6}>云层特效</Col>
                <Col span={10}>
                    <Switch
                        size="small"
                        checked={cloudsLayer}
                        onChange={checked => handleChange('cloudsLayer',checked)}
                    />
                </Col>
            </Row>
            <Row style={{paddingBottom: 4}}>
                <Col span={6}>夜间特效</Col>
                <Col span={10}>
                    <Switch
                        size="small"
                        checked={nightLayer}
                        onChange={checked => handleChange('nightLayer',checked)}
                    />
                </Col>
            </Row>
            <Row style={{paddingBottom: 4}}>
                <Col span={6}>光源亮度</Col>
                <Col span={18}>
                    <Row>
                        <Col span={6}>主光源</Col>
                        <Col span={18}>
                            <AInputNumber
                                options={{size: 'small',min: 0, max: 10}}
                                value={mainLight}
                                onBlur={value => handleChange('mainLight',value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>环境光源</Col>
                        <Col span={18}>
                            <AInputNumber
                                options={{size: 'small',min: 0, max: 10}}
                                value={ambientLight}
                                onBlur={value => handleChange('ambientLight',value)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={6}>地球半径</Col>
                <Col span={18}>
                    <AInputNumber
                        options={{size: 'small',min: 0, max: 1000}}
                        value={globeRadius}
                        onBlur={value => handleChange('globeRadius',value)}
                    />
                </Col>
            </Row>
        </>
    )
}