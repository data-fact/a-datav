/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/29.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import update from 'immutability-helper';
import {Tabs,Card,Row,Col,Select,Button,Tooltip} from 'antd4'
import { PlusOutlined,UpOutlined } from '@ant-design/icons';
import FilterEditor from "./FilterEditor";
import FilterEditorTitle from "./FilterEditorTitle";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import {useAddFilter, useUpdateFilter} from "../../../../hooks/useAction";
import useFilterData from "../../../../hooks/useFilterData";
import {VARIABLE_TYPE} from "../../../../common/constant";
import {getVariableArr1} from "../../../../utils/util";
const {TabPane} = Tabs
const {Option} = Select

export default function DataFilterConfiger({filters,variables,component}){

    let {i:componentId,_data_filters:dataFilters,_data_cache,_variables} = component
    let [activeKey,setActiveKey] = useState("0")
    let [nativeFilters,setNativeFilters] = useState({})

    let addFilter = useAddFilter()
    let updateFilter = useUpdateFilter()
    let updateComponent = useUpdateComponent()
    let filterData = useFilterData()

    useEffect(() => {
        filterData(componentId,component)
    },[dataFilters,filters])

    function updateVariables(value) {
        let variableArr = getVariableArr1(value)
        let variables = {..._variables}
        variableArr.forEach(v => {
            if(!variables[v])
                variables[v] = {value: '', type: VARIABLE_TYPE.filter}
        })
        updateComponent(componentId,{_variables: variables})
    }

    function handlePushFilter(id) {
        updateComponent(componentId,{_data_filters: [...dataFilters,id]})
    }
    function handleNameChange(id,name) {
        updateFilter(id,{name})
    }
    function handleSave(id,value) {
        updateVariables(value)
        updateFilter(id,{value})
    }

    function handleAddFilter() {
        let id = UUID.generate()
        let name = '新增过滤器' + '-' + id.substr(0,8)
        let value = 'return data;'
        let filter = {id,name,value,descr: '',notSave: true,native:true}
        setNativeFilters(update(nativeFilters,{[id]: {$set: filter}}))
        setActiveKey(id)
    }
    function handleRemoveFilter(id) {
        if(nativeFilters[id])
            handleNativeRemove(id)
        else if(filters[id]){
            let newFilters = [...dataFilters]
            newFilters.splice(newFilters.indexOf(id),1)
            updateComponent(componentId,{_data_filters: newFilters})
        }
    }
    function handleNativeNameChange(id,name){
        setNativeFilters(update(nativeFilters,{[id]: {name: {$set: name}}}))
    }
    function handleNativeSave(id,value) {
        let filter = update(nativeFilters[id],{value: {$set: value}})
        delete filter.native
        delete filter.notSave
        updateVariables(value)
        addFilter(id,filter)
        handlePushFilter(id)
        handleNativeRemove(id)
    }
    function handleNativeRemove(id) {
        let newFilters = {...nativeFilters}
        delete newFilters[id]
        setNativeFilters(newFilters)
    }

    return (
        <>
            <Card size="small">
                <Row>
                    <Col span={20}>
                        <Select
                            style={{width: '100%'}}
                            placeholder="添加过滤器"
                            value="请选择过滤器"
                            onChange={handlePushFilter}
                        >
                            {
                                Object.keys(filters).filter(id => dataFilters.indexOf(id) < 0).map(id => (
                                    <Option value={id}>{filters[id].name}</Option>
                                ))
                            }
                        </Select>
                    </Col>
                    <Col span={4} style={{paddingLeft: 10}}>
                        <Tooltip placement="bottom" title="新增过滤器">
                            <Button onClick={handleAddFilter} type="primary" size="small" icon={<PlusOutlined/>} />
                        </Tooltip>
                    </Col>
                </Row>
            </Card>
            <Tabs
                activeKey={activeKey}
                type="editable-card"
                hideAdd
                tabBarExtraContent={<UpOutlined onClick={() => setActiveKey("")}/>}
                onChange={k => setActiveKey(k)}
                onEdit={handleRemoveFilter}
            >
                {
                    dataFilters.map(id => {
                        let filter = filters[id]
                        return <TabPane
                            tab={
                                <FilterEditorTitle
                                    filter={filter}
                                    onChange={name => handleNameChange(id,name)}
                                />
                            }
                            key={id}
                        >
                            <FilterEditor
                                id={componentId}
                                filter={filter}
                                variables={variables}
                                onSave={value => handleSave(id,value)}
                                onCancel={() => setActiveKey("")}
                            />
                        </TabPane>
                    })
                }
                {
                    Object.keys(nativeFilters).map(id => {
                        let filter = nativeFilters[id]
                        return <TabPane
                            tab={
                                <FilterEditorTitle
                                    filter={filter}
                                    onChange={name => handleNativeNameChange(id,name)}
                                />
                            }
                            key={id}
                        >
                            <FilterEditor
                                id={componentId}
                                filter={filter}
                                variables={variables}
                                onSave={value => handleNativeSave(id,value)}
                                onCancel={() => handleNativeRemove(id)}
                            />
                        </TabPane>
                    })
                }
            </Tabs>
        </>
    )
}