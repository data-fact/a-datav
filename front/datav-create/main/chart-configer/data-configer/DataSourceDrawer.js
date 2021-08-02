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
import update from 'immutability-helper';
import {Card,Drawer,Row,Col,Select,Typography,Divider} from 'antd4'
import { AntCloudOutlined,FilterOutlined,ProfileOutlined } from '@ant-design/icons';
import DataSourceConfiger from "./data-source-configer";
import DataFilterConfiger from "./data-filter-configer";
import ResultViewer from "./ResultViewer";
import {dataSourceTypes} from "../../../common/common";

const { Text } = Typography
const {Option} = Select

export default function DataSourceDrawer({visible,filters,variables,component,onChange,onClose}){

    let {i:id,_data:data,_data_type: dataType} = component

    function handleDataTypeChange(type) {
        onChange(update(component,{_data_type: {$set: type}}))
    }

    return (
        <Drawer
            // style={{zIndex:10000}}
            bodyStyle={{padding: 6}}
            title="配置数据源"
            placement="right"
            width={500}
            visible={visible}
            onClose={onClose}
        >
            <Card title={<Text strong><AntCloudOutlined theme="twoTone" />数据源</Text>} size="small">
                <Row>
                    <Col span={6}>数据源类型</Col>
                    <Col span={18}>
                        <Select style={{width: '100%'}} value={dataType} onChange={handleDataTypeChange}>
                            {
                                dataSourceTypes.map(dt => {
                                    return <Option key={dt.type} value={dt.type}>{dt.label}</Option>
                                })
                            }
                        </Select>
                    </Col>
                </Row>
                <Divider/>
                <DataSourceConfiger component={component} variables={variables}/>
            </Card>
            <Card title={<Text strong><FilterOutlined theme="twoTone" />数据过滤器</Text>} size="small">
                <DataFilterConfiger filters={filters} variables={variables} component={component}/>
            </Card>
            <Card title={<Text strong><ProfileOutlined theme="twoTone" />数据响应结果</Text>} size="small">
                <ResultViewer id={id} data={data}/>
            </Card>
        </Drawer>
    )
}