/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/2.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Row,Col,Input,Switch,Radio} from 'antd4'
import Palette from "../../../../../lib/palette/Palette";

export default function Series({inc,dec,total,onChange}){

    let [incName,setIncName] = useState('')
    let [decName,setDecName] = useState('')
    let [totalName,setTotalName] = useState('')
    useEffect(() => setIncName(inc.name),[inc.name])
    useEffect(() => setDecName(dec.name),[dec.name])
    useEffect(() => setTotalName(total.name),[total.name])

    function handleIncChange(key,value) {
        onChange('inc',{...inc,[key]: value})
    }
    function handleDecChange(key,value) {
        onChange('dec',{...dec,[key]: value})
    }
    function handleTotalChange(key,value) {
        onChange('total',{...total,[key]: value})
    }

    return (
        <>
            <Row>
                <Col span={4}>增加</Col>
                <Col span={20}>
                    <Row>
                        <Col span={4}>描述</Col>
                        <Col span={16}>
                            <Input
                                size="small" value={incName}
                                onChange={e => setIncName(e.target.value)}
                                onBlur={e => handleIncChange('name',e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>颜色</Col>
                        <Col span={16}>
                            <Palette color={inc.color} onChange={color => handleIncChange('color',color)}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={4}>减少</Col>
                <Col span={20}>
                    <Row>
                        <Col span={4}>描述</Col>
                        <Col span={16}>
                            <Input
                                size="small" value={decName}
                                onChange={e => setDecName(e.target.value)}
                                onBlur={e => handleDecChange('name',e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>颜色</Col>
                        <Col span={16}>
                            <Palette color={dec.color} onChange={color => handleDecChange('color',color)}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={4}>总计</Col>
                <Col span={20}>
                    <Row>
                        <Col span={4}>描述</Col>
                        <Col span={16}>
                            <Input
                                size="small" value={totalName}
                                onChange={e => setTotalName(e.target.value)}
                                onBlur={e => handleTotalChange('name',e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>颜色</Col>
                        <Col span={16}>
                            <Palette color={total.color} onChange={color => handleTotalChange('color',color)}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}