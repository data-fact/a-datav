/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/30.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Row,Col,Switch,Radio,Tooltip} from 'antd4'
import CommonAxis from "./CommonAxis";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";

export default function CategoryAxis({axis,onChange}){

    let {name,nameTextStyle,show,axisLabel,axisLine,axisTick,splitLine,offset} = axis

    return (
        <>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>可见</Col>
                <Col span={6}>
                    <Switch
                        size="small"
                        checked={show}
                        onChange={value => onChange('show',value)}
                    />
                </Col>
            </Row>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>数据类型</Col>
                <Col span={18}>
                    <Radio.Group size="small" value="category">
                        <Radio.Button value="category">类目型</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>位置偏移</Col>
                <Col span={8}>
                    <Tooltip placement="bottom" title="偏移像素">
                        <AInputNumber
                            unit="px"
                            value={offset}
                            onBlur={val => onChange('offset',val)}
                        />
                    </Tooltip>
                </Col>
            </Row>
            <div style={{marginBottom: 4}}>
                <CommonAxis
                    name={name} nameTextStyle={nameTextStyle}
                    axisLabel={axisLabel} axisLine={axisLine}
                    axisTick={axisTick} splitLine={splitLine}
                    onChange={onChange}
                />
            </div>
        </>
    )
}