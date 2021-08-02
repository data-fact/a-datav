/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/15.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Row,Col,Radio,Input,Tooltip} from 'antd4'
import {QuestionCircleOutlined} from '@ant-design/icons'
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import state, {ICON_TYPE} from "../state";
import useInitComponent from "../../../../hooks/useInitComponent";
import useCanvasReducer from "../../../../reducers/useCanvasReducer";
import FontSize from "../../../../../lib/font-configer/FontSize";
import Palette from "../../../../../lib/palette/Palette";
import DefaultIconsSelect from "./DefaultIconsSelect";

export default function Configer({component}){

    let {i: id,fontSize,color,type,icon,iconText:storeIconText} = component
    let [iconText,setIconText] = useState(storeIconText)
    useEffect(() => setIconText(storeIconText),[storeIconText])

    let [canvas] = useCanvasReducer()
    let updateComponent = useUpdateComponent()

    //初始化state
    let ready = useInitComponent(component,state)

    if(!ready)
        return null

    function handleChange(key,value) {
        updateComponent(id,{[key]: value})
    }

    return (
        <>
            <Row style={{paddingBottom: 4}}>
                <Col span={6}>大小</Col>
                <Col span={18}>
                    <FontSize size={fontSize} onChange={size => handleChange('fontSize',size)}/>
                </Col>
            </Row>
            <Row style={{paddingBottom: 4}}>
                <Col span={6}>颜色</Col>
                <Col span={18}>
                    <Palette
                        color={color}
                        onChange={color => handleChange('color',color)}
                        onDelete={() => handleChange('color','')}
                    />
                </Col>
            </Row>
            <Radio.Group
                size="small" value={type} style={{fontSize: 14}}
                onChange={e => handleChange('type',e.target.value)}
            >
                <Row>
                    <Col span={10}>
                        <Radio
                            value={ICON_TYPE.DEFAULT}
                        >常用</Radio>
                    </Col>
                    <Col span={14}>
                        <DefaultIconsSelect icon={icon} onChange={value => handleChange('icon',value)}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>
                        <Radio
                            value={ICON_TYPE.CUSTOM}
                        >自定义
                            <Tooltip
                                placement="bottom"
                                title={<>
                                    支持<a href="https://ant.design/components/icon-cn/" target="_blank">antd图标</a>
                                </>}
                            >
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </Radio>
                    </Col>
                    <Col span={14}>
                        <Input
                            size="small" placeholder="请输入antd图标"
                            value={iconText}
                            onChange={e => setIconText(e.target.value)}
                            onBlur={e => handleChange('iconText',e.target.value)}
                        />
                    </Col>
                </Row>
            </Radio.Group>
        </>
    )
}