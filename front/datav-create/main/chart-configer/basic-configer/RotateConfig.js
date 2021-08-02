/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/16.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Row,Col,Slider,InputNumber}  from 'antd4'

export default function RotateConfig({rotateX:storeRotateX,rotateY:storeRotateY,rotateZ:storeRotateZ,onChange}){

    let [rotateX,setRotateX] = useState(0)
    let [rotateY,setRotateY] = useState(0)
    let [rotateZ,setRotateZ] = useState(0)

    useEffect(() => setRotateX(storeRotateX),[storeRotateX])
    useEffect(() => setRotateY(storeRotateY),[storeRotateY])
    useEffect(() => setRotateZ(storeRotateZ),[storeRotateZ])

    function handleChange(type,rotate) {
        let value = rotate.replace('度','')
        onChange(type,+value)
    }

    return (
        <>
            <Row>
                <Col style={{marginTop: 5}} span={4}>绕x轴</Col>
                <Col span={12}>
                    <Slider
                        style={{margin: 10}}
                        min={0}
                        max={360}
                        value={rotateX}
                        onChange={value => setRotateX(value)}
                        onAfterChange={value => onChange('x',value)}
                    />
                </Col>
                <Col span={8}>
                    <InputNumber
                        style={{margin: 5}}
                        size="small"
                        min={0}
                        max={360}
                        formatter={value => `${value}度`}
                        parser={value => value.replace('度', '')}
                        value={rotateX}
                        onChange={value => setRotateX(value)}
                        onBlur={e => handleChange('x',e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={4}>绕y轴</Col>
                <Col span={12}>
                    <Slider
                        style={{margin: 10}}
                        min={0}
                        max={360}
                        value={rotateY}
                        onChange={value => setRotateY(value)}
                        onAfterChange={value => onChange('y',value)}
                    />
                </Col>
                <Col span={8}>
                    <InputNumber
                        style={{margin: 5}}
                        size="small"
                        min={0}
                        max={360}
                        formatter={value => `${value}度`}
                        parser={value => value.replace('度', '')}
                        value={rotateY}
                        onChange={value => setRotateY(value)}
                        onBlur={e => handleChange('y',e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={4}>绕z轴</Col>
                <Col span={12}>
                    <Slider
                        style={{margin: 10}}
                        min={0}
                        max={360}
                        value={rotateZ}
                        onChange={value => setRotateZ(value)}
                        onAfterChange={value => onChange('z',value)}
                    />
                </Col>
                <Col span={8}>
                    <InputNumber
                        style={{margin: 5}}
                        size="small"
                        min={0}
                        max={360}
                        formatter={value => `${value}度`}
                        parser={value => value.replace('度', '')}
                        value={rotateZ}
                        onChange={value => setRotateZ(value)}
                        onBlur={e => handleChange('z',e.target.value)}
                    />
                </Col>
            </Row>
        </>
    )
}