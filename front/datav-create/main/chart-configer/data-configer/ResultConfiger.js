/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/29.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Row,Col,Typography,Divider,Timeline,Button} from 'antd4'
import ResultViewer from "./ResultViewer";
import {dataSourceTypes} from "../../../common/common";

const { Text } = Typography

export default function ResultConfiger({component,onShowDataSource}){

    let {i:id,_data:data,_data_type:dataType} = component
    let dataSourceType = dataSourceTypes.find(dst => dst.type == dataType)

    return (
        <>
            <Divider/>
            <Row>
                <Col span={16}><Text strong>数据响应结果</Text></Col>
            </Row>
            <Row style={{paddingTop: 10}}>
                <Col span={24}>
                    <Timeline>
                        <Timeline.Item>
                            <Row>
                                <Col span={12}>
                                    {dataSourceType ? dataSourceType.label : '未知数据源类型'}
                                </Col>
                                <Col span={12}>
                                    <Button size="small" type="primary" onClick={onShowDataSource}>配置数据源</Button>
                                </Col>
                            </Row>
                        </Timeline.Item>
                        <Timeline.Item>
                            <Row>
                                <Col span={12}>过滤器</Col>
                                <Col span={12}>
                                    <Button size="small" type="primary" onClick={onShowDataSource}>添加过滤器</Button>
                                </Col>
                            </Row>
                        </Timeline.Item>
                        <Timeline.Item>
                            数据响应结果(只读)
                            <ResultViewer id={id} data={data}/>
                        </Timeline.Item>
                    </Timeline>
                </Col>
            </Row>

        </>
    )
}