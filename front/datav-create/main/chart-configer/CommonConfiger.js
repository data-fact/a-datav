/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React,{useState} from 'react'
import update from 'immutability-helper';
import {Card,Tabs,Tooltip,Badge} from 'antd4'
import { SlidersOutlined,DesktopOutlined,TableOutlined,TeamOutlined } from '@ant-design/icons';
import {getInstanceByTypeId} from "../../common/common";
import "./common-configer.css"
import DataConfiger from "./data-configer";
import BasicConfiger from "./basic-configer";
import EventConfiger from "./event-configer";
import useUpdateComponent from "../../hooks/useUpdateComponent";
import ChildNav, {BackParent} from "./ChildNav";
import ErrorBoundary from "../../../common/ErrorBoundary";

const {TabPane} = Tabs
const { Meta } = Card

export default function CommonConfiger({filters,variables,component,onAddComponent,onChangeFocusId}){

    let {
        i:componentId,_typeId:typeId,_name:name,_typeName:typeName,_mark_color,
        _support_children_or,_child_ids,_parent_id
    } = component
    let updateComponent = useUpdateComponent()
    let [activeKey,setActiveKey] = useState('1')

    let instance = getInstanceByTypeId(typeId)
    if(!instance)
        return <span style={{color: 'red'}}>{`${typeId}实例未定义`}</span>
    let Configer = instance.configer
    if(!Configer)
        return <span style={{color: 'red'}}>{`${typeId}配置器未定义`}</span>

    function handleAddChild(_typeId,_typeName,_typeNav) {
        let id = UUID.generate()
        let _name = _typeName + '-' + id.substr(0,8)
        onAddComponent(id,{_typeId,_typeName,_typeNav,_name,_descr: '',_parent_id: componentId})
        updateComponent(componentId,{_child_ids: update(_child_ids,{[_typeId]: {$set: {id,enabled: true}}})})
    }
    function handleChildCheck(type,checked) {
        updateComponent(componentId,{_child_ids: update(_child_ids,{[type]: {enabled: {$set: checked}}})})
    }

    return (
        <Card
            size="small" style={{ width: '100%',height: '100%' }}
            bodyStyle={{heigth: '100%'}} bordered={false}
        >
        <Tabs
            size="small" className={"datav-common-chart-configer-tabs"}
            style={{ width: '100%',height: '100%' }}
            activeKey={activeKey} onChange={setActiveKey}
        >
            <TabPane
                key="1"
                style={{height: '100%'}}
                tab={
                    <Tooltip placement="bottom" title="组件配置">
                        <SlidersOutlined style={{fontSize: "large"}} />
                    </Tooltip>
                }
            >
                <Card
                    size="small"
                    style={{overflow: 'hidden scroll'}}
                    title={
                        <>
                            <Meta
                                title={_mark_color ? <Badge dot offset={[5,0]} color={_mark_color}>{typeName}</Badge> : typeName}
                                description={name}
                            />
                            {
                                _parent_id &&
                                <BackParent onChangeFocusId={() => onChangeFocusId(_parent_id)}/>
                            }
                            {
                                _support_children_or && _support_children_or.length && !_parent_id ?
                                    <ChildNav
                                        component={{_support_children_or,_child_ids,_parent_id}}
                                        onAddChild={handleAddChild}
                                        onCheck={handleChildCheck}
                                        onEdit={onChangeFocusId}
                                    />
                                    :
                                    null
                            }
                        </>
                    }
                >
                    <ErrorBoundary>
                        <Configer component={component}/>
                    </ErrorBoundary>
                </Card>
            </TabPane>
            <TabPane
                key="2"
                tab={
                    <Tooltip placement="bottom" title="基本配置">
                        <DesktopOutlined style={{fontSize: "large"}} />
                    </Tooltip>
                }
            >
                <Card
                    size="small"
                    style={{overflow: 'scroll',overflowX: 'hidden'}}
                    title={
                        <>
                            <Meta
                                title={_mark_color ? <Badge dot offset={[5,0]} color={_mark_color}>{typeName}</Badge> : typeName}
                                description={name}
                            />
                            {
                                _parent_id &&
                                <BackParent onChangeFocusId={() => onChangeFocusId(_parent_id)}/>
                            }
                        </>
                    }
                >
                    <BasicConfiger component={component} isChild={!!_parent_id}/>
                </Card>
            </TabPane>
            <TabPane
                key="3"
                tab={
                    <Tooltip placement="bottom" title="数据">
                        <TableOutlined style={{fontSize: "large"}} />
                    </Tooltip>
                }
            >
                <Card
                    size="small"
                    style={{overflow: 'scroll',overflowX: 'hidden'}}
                    title={
                        <>
                            <Meta
                                title={_mark_color ? <Badge dot offset={[5,0]} color={_mark_color}>{typeName}</Badge> : typeName}
                                description={name}
                            />
                            {
                                _parent_id &&
                                <BackParent onChangeFocusId={() => onChangeFocusId(_parent_id)}/>
                            }
                        </>
                    }
                >
                    {
                        activeKey == '3' &&
                        <DataConfiger filters={filters} variables={variables} component={component}/>
                    }
                </Card>
            </TabPane>
            <TabPane
                key="4"
                tab={
                    <Tooltip placement="bottom" title="交互事件">
                        <TeamOutlined style={{fontSize: "large"}} />
                    </Tooltip>
                }
            >
                <Card
                    size="small"
                    style={{overflow: 'scroll',overflowX: 'hidden'}}
                    title={
                        <>
                            <Meta
                                title={_mark_color ? <Badge dot offset={[5,0]} color={_mark_color}>{typeName}</Badge> : typeName}
                                description={name}
                            />
                            {
                                _parent_id &&
                                <BackParent onChangeFocusId={() => onChangeFocusId(_parent_id)}/>
                            }
                        </>
                    }
                >
                    <EventConfiger component={component}/>
                </Card>
            </TabPane>
        </Tabs>
        </Card>
    )
}