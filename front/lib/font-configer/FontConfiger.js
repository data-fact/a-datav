/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/29.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Button,Row,Col,Tooltip,Select,Radio}from 'antd4'
import {
    AlignLeftOutlined,AlignCenterOutlined,AlignRightOutlined,
    BoldOutlined,ItalicOutlined,UnderlineOutlined,StrikethroughOutlined
} from '@ant-design/icons';
import Palette from "../palette/Palette";
import FontSize from "./FontSize";
import AInputNumber from "../input-number/AInputNumber";

const {Option} = Select

const fontFamilys = [
    {name: '微软雅黑', value: '"Microsoft Yahei", Arial, sans-serif'},
    {name: '宋体', value: 'SimSun, Arial, sans-serif'},
    {name: '黑体', value: 'SimHei, Arial, sans-serif'},
    {name: '隶书', value: 'LiSu, Arial, sans-serif'},
    {name: '幼圆', value: 'YouYuan, Arial, sans-serif'},
    {name: 'tahoma', value: 'tahoma, Arial, sans-serif'},
    {name: 'arial', value: 'arial, Arial, sans-serif'},
    {name: 'sans-serif', value: 'sans-serif, Arial, sans-serif'},
    {name:'方正书宋简体',value:'fzss'},
    {name:'方正仿宋',value:'fzfs'},
    {name:'方正楷体',value:'fzkt'},
    {name:'方正黑体简体',value:'fzht'},
    {name:'站酷高端黑',value:'zkgdh'},
    {name:'站酷庆科黄油体',value:'kzqkhyt'},
    {name:'站酷快乐体',value:'kzklt'},
    {name:'站酷文艺体',value:'kzwyt'},
    {name:'站酷酷黑体',value:'kzkht'}
]
export default function FontConfiger(
    {
        size,spacing,color,family,align,underline,deleteline,italic,strong,hideSpacing,hideExt,hideColor,showAlign,
        onSizeChange,onSpacingChange,onColorChange,onFontChange,onExtChange,onAlignChange
    }){

    return (
        <>
            <Row style={{marginBottom: 4}}>
                <Col span={6}>字号</Col>
                <Col span={12}>
                    <FontSize size={size} onChange={onSizeChange}/>
                </Col>
            </Row>
            {
                !hideSpacing &&
                <Row style={{marginBottom: 4}}>
                    <Col span={6}>字间隔</Col>
                    <Col span={12}>
                        <AInputNumber
                            options={{
                                size: "small",
                                min: 0,
                                max: 200
                            }}
                            unit="px"
                            value={spacing}
                            onBlur={onSpacingChange}
                        />
                    </Col>
                </Row>
            }
            {
                !hideColor &&
                <Row style={{marginBottom: 4}}>
                    <Col span={6}>颜色</Col>
                    <Col span={14}>
                        <Palette title="字体颜色" color={color} onChange={onColorChange} onDelete={() => onColorChange('')}/>
                    </Col>
                </Row>
            }
            {
                showAlign &&
                <Row style={{marginBottom: 4}}>
                    <Col span={6}>对齐方式</Col>
                    <Col span={14}>
                        <Radio.Group size="small" value={align} onChange={e => onAlignChange(e.target.value)}>
                            <Radio.Button value="left"><AlignLeftOutlined /></Radio.Button>
                            <Radio.Button value="center"><AlignCenterOutlined /></Radio.Button>
                            <Radio.Button value="right"><AlignRightOutlined /></Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
            }
            <div style={{marginBottom: 4}}>
            <Row>
                <Col span={6}>字体</Col>
                <Col span={18}>
                    <Select
                        placeholder="字体" size="small" style={{width: 120}}
                        value={family || undefined}
                        onChange={value => onFontChange(value)}
                    >
                        {
                            fontFamilys.map(family => (
                                <Option value={family.value}>{family.name}</Option>
                            ))
                        }
                    </Select>
                </Col>
            </Row>
            {
                !hideExt &&
                <Row>
                    <Col span={6}></Col>
                    <Col span={18}>
                        <Tooltip placement="bottom" title="加粗">
                            <Button
                                type={strong ? 'primary' : 'dashed'} icon={<BoldOutlined/>} size="small"
                                onClick={() => onExtChange('strong',!strong)}
                            />
                        </Tooltip>
                        <Tooltip placement="bottom" title="倾斜">
                            <Button
                                type={italic ? 'primary' : 'dashed'} icon={<ItalicOutlined/>} size="small"
                                onClick={() => onExtChange('italic',!italic)}
                            />
                        </Tooltip>
                        <Tooltip placement="bottom" title="下划线">
                            <Button
                                type={underline ? 'primary' : 'dashed'} icon={<UnderlineOutlined/>} size="small"
                                onClick={() => onExtChange('underline',!underline)}
                            />
                        </Tooltip>
                        <Tooltip placement="bottom" title="删除线">
                            <Button
                                type={deleteline ? 'primary' : 'dashed'} icon={<StrikethroughOutlined/>} size="small"
                                onClick={() => onExtChange('deleteline',!deleteline)}
                            />
                        </Tooltip>
                    </Col>
                </Row>
            }
            </div>
        </>
    )
}