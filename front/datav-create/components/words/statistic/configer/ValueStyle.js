/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/1/4.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Row,Col,Input} from 'antd4'
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";

export default function ValueStyle({valueStyle,onChange}){

    let {size,color,family,precision,suffix:storeSuffix,groupSeparator:storeGroupSeparator} = valueStyle
    let [suffix,setSuffix] = useState(storeSuffix)
    useEffect(() => setSuffix(storeSuffix),[storeSuffix])
    let [groupSeparator,setGroupSeparator] = useState(storeGroupSeparator)
    useEffect(() => setGroupSeparator(storeGroupSeparator),[storeGroupSeparator])

    return (
        <>
            <Row style={{paddingBottom: 4}}>
                <Col span={6}>后缀</Col>
                <Col span={6}>
                    <Input
                        size="small" value={suffix}
                        onChange={e => setSuffix(e.target.value)}
                        onBlur={e => onChange('suffix',e.target.value)}
                    />
                </Col>
            </Row>
            <Row style={{paddingBottom: 4}}>
                <Col span={6}>千分位</Col>
                <Col span={6}>
                    <Input
                        size="small" value={groupSeparator}
                        onChange={e => setGroupSeparator(e.target.value)}
                        onBlur={e => onChange('groupSeparator',e.target.value)}
                    />
                </Col>
            </Row>
            <Row style={{paddingBottom: 4}}>
                <Col span={6}>数值精度</Col>
                <Col span={6}>
                    <AInputNumber
                        options={{size: 'small',min: 0,max: 1000}}
                        value={precision}
                        onBlur={value => onChange('precision',value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={6}>字体</Col>
                <Col span={18}>
                    <FontConfiger
                        hideSpacing hideExt
                        color={color}
                        size={size}
                        family={family}
                        onColorChange={value => onChange('color',value)}
                        onSizeChange={value => onChange('size',value)}
                        onFontChange={value => onChange('family',value)}
                    />
                </Col>
            </Row>
        </>
    )
}