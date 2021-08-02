/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import update from 'immutability-helper';
import {Row,Col,Typography,Spin,Divider,Table,Input} from 'antd4'
import { LoadingOutlined } from '@ant-design/icons';
import {colors} from "../../../common/common";

const { Text } = Typography

export default function FieldMapConfiger({component,onChange}){

    let {_data_fields_or: storeFieldMap,_data_status: dataStatus} = component

    let [fieldMap,setFieldMap] = useState({})

    useEffect(() => setFieldMap(storeFieldMap),[storeFieldMap])

    let fields = Object.keys(fieldMap).map(key => {
        let {map, status} = fieldMap[key]
        return {key,map,status}
    })

    function handleChange(key,map){
        setFieldMap(update(fieldMap,{[key]: {map: {$set: map}}}))
    }
    function handleBlur(key,map){

        onChange({_data_fields_or: fieldMap})
    }

    let columns = [{
        title: '字段',
        dataIndex: 'key',
    },{
        title: '映射',
        dataIndex: 'map',
        render: (text,record) => {
            let {key} = record
            return <Input
                style={{width: 80}} size="small"
                value={text}
                onChange={e => handleChange(key,e.target.value)}
                onBlur={e => handleBlur(key,text)}
            />
        }
    },{
        title: '状态',
        dataIndex: 'status',
        render: status => {
            if(dataStatus == 3){
                return <>
                    <Spin
                        spinning={dataStatus == 3}
                        indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />}
                    />
                    <Text style={{color: colors.success}}>匹配中</Text>
                </>
            }

            switch (status) {
                case 1:
                    return <Text style={{color: colors.success}}>匹配成功</Text>
                case 3:
                    return <Text style={{color: colors.success}}>可选</Text>
                case 2:
                default :
                    return <Text style={{color: colors.error}}>匹配失败</Text>
            }
        }
    }]

    return (
        <>
            <Divider/>
            <Row>
                <Col span={16}><Text strong>数据接口</Text></Col>
                <Col span={8}>
                    <Text style={{color: dataStatus == 2 ? colors.error : colors.success}}>
                        <Spin
                            spinning={dataStatus == 3}
                            indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />}
                        />
                        {
                            dataStatus == 1 ?
                                '配置完成' :
                                dataStatus == 2 ?
                                    '配置未完成' :
                                    '配置中'
                        }
                    </Text>
                </Col>
            </Row>
            <Table
                size="small" pagination={false}
                locale={{emptyText: '无字段映射'}}
                columns={columns} dataSource={fields}
            />
        </>
    )
}