/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/2.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Row,Col,Switch,Radio} from 'antd4'
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";

export default function Label({show,position,fontSize,fontFamily,color,onChange}){

    return (
        <>
            <Row>
                <Col span={4}>显示</Col>
                <Col span={10}>
                    <Switch
                        size="small" checked={show}
                        onChange={show => onChange('show',show)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={4}>字体</Col>
                <Col span={20}>
                    <FontConfiger
                        hideSpacing hideExt
                        size={fontSize}
                        color={color}
                        family={fontFamily}
                        onSizeChange={value => onChange('fontSize',value)}
                        onColorChange={color => {onChange('color',color)}}
                        onFontChange={value => onChange('fontFamily',value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={4}>位置</Col>
                <Col span={20}>
                    <Radio.Group
                        size="small" value={position}
                        onChange={e => onChange('position',e.target.value)}
                    >
                        <Radio.Button value="top">上</Radio.Button>
                        <Radio.Button value="middle">中</Radio.Button>
                        <Radio.Button value="bottom">下</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
        </>
    )
}