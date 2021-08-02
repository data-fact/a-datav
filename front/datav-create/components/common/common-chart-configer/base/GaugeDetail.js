/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/11/24.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Row,Col,Tooltip,Input} from 'antd4'
import { QuestionCircleOutlined } from '@ant-design/icons';
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
import Palette from "../../../../../lib/palette/Palette";
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";

export default function GaugeDetail({gaugeDetail,onChange}){

    let {fontSize,color,fontFamily,formatter:storeFormatter} = gaugeDetail

    let [formatter,setFormatter] = useState(undefined)
    useEffect(() => setFormatter(storeFormatter),[storeFormatter])

    function handleChange(key,value) {
        onChange({gaugeDetail: {[key]: {$set: value}}})
    }

    return (
        <>
            <Row>
                <Col span={6}>文本</Col>
                <Col span={18}>
                    <FontConfiger
                        hideSpacing hideExt
                        size={fontSize}
                        color={color}
                        family={fontFamily}
                        onSizeChange={value => handleChange('fontSize',value)}
                        onColorChange={color => {
                            handleChange('color',color)
                        }}
                        onFontChange={value => handleChange('fontFamily',value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={6}></Col>
                <Col span={18}>
                    <Row>
                        <Col span={6}>
                            格式
                            <Tooltip placement="top" title="例: {value} kg">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </Col>
                        <Col span={10}>
                            <Input
                                size="small" style={{width: 88}}
                                placeholder="请输入"
                                value={formatter}
                                onChange={e => setFormatter(e.target.value)}
                                onBlur={e => handleChange('formatter',e.target.value || undefined)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}