/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/19.
 * Description:
 * Modified By:
 */
import React,{useEffect,useState} from 'react'
import {Button,Row,Col,Input,InputNumber,Tooltip} from 'antd4'
import { QuestionCircleOutlined } from '@ant-design/icons';
import state from "../state";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";
import useInitComponent from "../../../../hooks/useInitComponent";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
import QuestionTooltip from "../../../../../lib/mini-components/QuestionTooltip";

export default function Configer({component}){

    let {
        i: id,formatter:storeFormatter,cycle,size,spacing,color,align,
        family,underline,deleteline,italic,strong} = component

    let updateComponent = useUpdateComponent()

    //初始化state
    let ready = useInitComponent(component,state)

    let [value,setValue] = useState('')

    useEffect(() => setValue(storeFormatter),[storeFormatter])

    if(!ready)
        return null

    function handleValueBlur(value) {
        updateComponent(id,{formatter: value})
    }
    function handleCycleBlur(value) {
        updateComponent(id,{cycle: value})
    }
    function handleSizeChange(size) {
        updateComponent(id,{size})
    }
    function handleSpacingChange(spacing) {
        updateComponent(id,{spacing})
    }
    function handleColorChange(color) {
        updateComponent(id,{color})
    }
    function handleFontChange(family) {
        updateComponent(id,{family})
    }
    function handleAlignChange(align) {
        updateComponent(id,{align})
    }
    function handleExtChange(key,value) {
        updateComponent(id,{[key]: value})
    }

    return (
        <>
            <div style={{marginBottom: 8}}>
                <Row>
                    <Col span={6}>
                        格式化
                        <QuestionTooltip title={
                            <>
                                YYYY: 年<br/>MM: 月<br/>DD: 日<br/>HH: 时<br/>mm: 分<br/>ss: 秒<br/>
                                x: 13位时间戳<br/>X: 10位时间戳<br/>a: am/pm
                            </>
                        }/>
                    </Col>
                    <Col span={18}>
                        <Tooltip placement="bottom" title="日期格式化字符串">
                            <Input
                                placeholder={state.formatter}
                                value={value}
                                onChange={e => setValue(e.target.value)}
                                onBlur={e => handleValueBlur(e.target.value)}
                            />
                        </Tooltip>
                    </Col>
                </Row>
            </div>
            <FontConfiger
                showAlign
                size={size} spacing={spacing} color={color} align={align}
                family={family} italic={italic} strong={strong}
                underline={underline} deleteline={deleteline}
                onSizeChange={handleSizeChange}
                onColorChange={handleColorChange}
                onSpacingChange={handleSpacingChange}
                onFontChange={handleFontChange}
                onAlignChange={handleAlignChange}
                onExtChange={handleExtChange}
            />
            <div style={{marginBottom: 8}}>
                <Row>
                    <Col span={6}>
                        事件周期
                        <Tooltip placement="top" title={`每间隔${cycle}秒发布值改变事件，0则不发布`}>
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </Col>
                    <Col span={18}>
                        <AInputNumber
                            options={{size: 'small',min: 0}}
                            unit="秒"
                            value={cycle}
                            onBlur={handleCycleBlur}
                        />
                    </Col>
                </Row>
            </div>
        </>
    )
}