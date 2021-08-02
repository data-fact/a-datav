/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/8.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Collapse,Row,Col,Input,Switch,Radio} from 'antd4'
import { EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';
import Palette from "../../../../../lib/palette/Palette";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
const {Panel} = Collapse

export default function ColumnsConfiger({columns,onChange}){

    return (
        <>
            <div style={{marginBottom: 8}}>
                <Collapse bordered={false} size="small">
                    {
                        columns.map((column,i) => {
                            return (
                                <Panel
                                    header={column.dataIndex} key={column.dataIndex}
                                    disabled={!column._show}
                                    extra={
                                        column._show ?
                                            <EyeOutlined onClick={e => {
                                                e.stopPropagation()
                                                onChange(i,'_show',false)
                                            }}/> :
                                            <EyeInvisibleOutlined onClick={e => {
                                                e.stopPropagation()
                                                onChange(i,'_show',true)
                                            }}/>
                                    }
                                >
                                    <ColumnConfiger column={column} onChange={(key,value) => onChange(i,key,value)}/>
                                </Panel>
                            )
                        })
                    }
                </Collapse>
            </div>
        </>
    )
}
function ColumnConfiger({column,onChange}) {

    let {title:storeTitle,_color,_fixed,_align,width} = column

    let [title,setTitle] = useState('')
    useEffect(() => setTitle(storeTitle),[storeTitle])

    return (
        <>
            <Row>
                <Col span={6}>列名</Col>
                <Col span={16}>
                    <Input
                        size="small" value={title}
                        onChange={e => setTitle(e.target.value)}
                        onBlur={e => onChange('title',e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={6}>列宽</Col>
                <Col span={16}>
                    <AInputNumber
                        unit="px" options={{size:'small',min:0}}
                        value={width}
                        onBlur={val => onChange('width',val)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={6}>列固定</Col>
                <Col span={16}>
                    <Switch size="small" checked={_fixed} onChange={checked => onChange('_fixed',checked)}/>
                </Col>
            </Row>
            <Row>
                <Col span={6}>颜色</Col>
                <Col span={16}>
                    <Palette color={_color} onChange={color => onChange('_color',color)}/>
                </Col>
            </Row>
            <Row>
                <Col span={6}>排列</Col>
                <Col span={10}>
                    <Radio.Group
                        size="small" value={_align}
                        onChange={e => onChange('_align',e.target.value)}
                    >
                        <Radio.Button value="left">左</Radio.Button>
                        <Radio.Button value="center">中</Radio.Button>
                        <Radio.Button value="right">右</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
        </>
    )
}