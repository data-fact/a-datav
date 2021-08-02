/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/19.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Button,Slider,Row,Col,InputNumber,Select,Collapse} from 'antd4'
import { PlusOutlined,DeleteOutlined } from '@ant-design/icons';
import {STYLE_FILTER_TYPE} from "../../datav-create/common/constant";
import AInputNumber from "../input-number/AInputNumber";
const {Panel} = Collapse

const filterMap = {
    'invert': '颜色反转',
    'brightness': '亮度',
    'contrast': '对比度',
    'hue-rotate': '色相',
    'opacity': '透明度',
    'saturate': '饱和度',
    'grayscale': '灰度',
    'sepia': '褐度'
}
export default function StyleFilterConfig({filters:storeFilters,onChange}){

    let [filters,setFilters] = useState([])

    useEffect(() => setFilters(storeFilters),[storeFilters])
    
    function handleAddFilter() {
        filters = [...filters]
        filters.push({type: undefined,persent: 0})
        onChange(filters)
    }
    function handleTypeChange(index,type) {
        filters = [...filters]
        filters[index].type = type
        onChange(filters)
    }
    function handlePersentChange(index,persent){
        filters = [...filters]
        filters[index].persent = persent
        onChange(filters)
    }
    function handleDeleteFilter(index) {
        filters = [...filters]
        filters.splice(index,1)
        onChange(filters)
    }

    return (
        <>
            <Collapse bordered={false} size="small">
            {
                filters.map((filter,i) => {
                    let {type,persent} = filter
                    return <Panel
                        key="RotateConfig" header={`滤镜${i+1}`}
                        extra={<DeleteOutlined onClick={() => handleDeleteFilter(i)}/>}
                        >
                        <FilterValueConfig
                            key={''+i} i={i} type={type} persent={persent}
                            onTypeChange={handleTypeChange}
                            onPersentChange={handlePersentChange}
                        />
                    </Panel>
                })
            }
            </Collapse>
            
            <Row>
                <Col span={24}>
                    <Button
                        style={{width: '100%',margin: '10px 0 10px 0'}}
                        size="small" type="dashed" icon={<PlusOutlined/>}
                        onClick={handleAddFilter}
                    >添加滤镜</Button>
                </Col>
            </Row>
        </>
    )
}

export function FilterValueConfig({i,type,persent:storePersent,onTypeChange,onPersentChange}) {

    let [persent,setPersent] = useState(0)
    useEffect(() => setPersent(storePersent),[storePersent])

    return <>
        <Row>
            <Col span={6}>类型</Col>
            <Col span={16}>
                <Select
                    placeholder="请选择滤镜类型"
                    style={{width: '100%'}}
                    value={type}
                    onChange={value => onTypeChange(i,value)}
                >
                    {
                        Object.keys(STYLE_FILTER_TYPE).map(key => {
                            let value = STYLE_FILTER_TYPE[key]
                            return <Select.Option value={value}>{filterMap[value]}</Select.Option>
                        })
                    }
                </Select>
            </Col>
        </Row>
        <Row>
            <Col style={{marginTop: 5}} span={6}>比值</Col>
            <Col span={10}>
                <Slider
                    style={{margin: 10}}
                    min={0}
                    max={100}
                    value={persent}
                    onChange={value => setPersent(value)}
                    onAfterChange={value => onPersentChange(i,value)}
                />
            </Col>
            <Col span={8}>
                <AInputNumber
                    options={{
                        style: {margin: 5,width: 60},
                        size: 'small',
                        min: 0, max: 100
                    }}
                    unit="%" value={persent}
                    onBlur={value => onPersentChange(i,+value)}
                />
            </Col>
        </Row>
    </>
}