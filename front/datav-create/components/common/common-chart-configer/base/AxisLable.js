/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/30.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Row,Col,Input,Tooltip} from 'antd4'
import { QuestionCircleOutlined } from '@ant-design/icons';
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
import AInput from "../../../../../lib/mini-components/AInput";
import QuestionTooltip from "../../../../../lib/mini-components/QuestionTooltip";
import {FORMATTER_TEXT} from "../../../../common/constant";

export default function AxisLable({label,onChange}){

    let {fontSize,color,fontFamily,rotate,formatter} = label

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
                        onSizeChange={value => onChange('fontSize',value)}
                        onColorChange={rgba => {
                            onChange('color',rgba)
                        }}
                        onFontChange={value => onChange('fontFamily',value)}
                    />
                </Col>
            </Row>
            {/*<div style={{marginBottom: 4}}>*/}
            {/*<Row>*/}
            {/*    <Col span={6}>样式</Col>*/}
            {/*    <Col span={18}>*/}
            {/*        <Row>*/}
            {/*            <Col span={6}>偏移量</Col>*/}
            {/*            <Col span={10}>*/}
            {/*                <AInputNumber*/}
            {/*                    options={{*/}
            {/*                        size: "small",*/}
            {/*                        min: 0,*/}
            {/*                        max: 200*/}
            {/*                    }}*/}
            {/*                    unit="px"*/}
            {/*                />*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            {/*</div>*/}
            <div style={{marginBottom: 4}}>
            <Row>
                <Col span={6}>样式</Col>
                <Col span={18}>
                    <Row>
                        <Col span={6}>旋转</Col>
                        <Col span={10}>
                            <AInputNumber
                                options={{
                                    size: "small",
                                    min: 0,
                                    max: 360
                                }}
                                unit="度"
                                value={rotate}
                                onBlur={value => onChange('rotate',value)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            </div>
            {/*<div style={{marginBottom: 4}}>*/}
            {/*<Row>*/}
            {/*    <Col span={6}></Col>*/}
            {/*    <Col span={18}>*/}
            {/*        <Row>*/}
            {/*            <Col span={6}>数量</Col>*/}
            {/*            <Col span={10}>*/}
            {/*                <AInputNumber*/}
            {/*                    options={{*/}
            {/*                        size: "small",*/}
            {/*                        min: 0,*/}
            {/*                        max: 200*/}
            {/*                    }}*/}
            {/*                    unit="个"*/}
            {/*                />*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            {/*</div>*/}
            <div style={{marginBottom: 4}}>
            <Row>
                <Col span={6}></Col>
                <Col span={18}>
                    <Row>
                        <Col span={6}>
                            <span>格式</span>
                            <QuestionTooltip
                                title={
                                    <span style={{whiteSpace: 'pre-line'}}>{
                                        FORMATTER_TEXT.value
                                    }</span>
                                }
                            />
                        </Col>
                        <Col span={10}>
                            <AInput
                                style={{ width: 88 }}
                                placeholder="请输入"
                                value={formatter}
                                onBlur={val => onChange('formatter',val || undefined)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            </div>
        </>
    )
}