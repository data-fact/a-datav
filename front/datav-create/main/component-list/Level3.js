/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React from 'react'
import {List,Tooltip} from 'antd4'
import { InfoCircleOutlined } from '@ant-design/icons';
import { useDrop, useDrag } from 'ahooks';
import {AND_JOINER, ARROW_JOINER} from "../../common/constant";
import {useAddComponent} from "../../hooks/useAction";
import ComponentImage from "./ComponentImage";

export default function Level3({typeId,nav,components}){

    let types = Object.keys(components)

    let addComponent = useAddComponent()
    const getDragProps = useDrag();

    return (
        <List
            bordered={false}
            size="small"
            dataSource={types}
            renderItem={type => {
                let {icon,descr,configer,renderer,tooltip,image} = components[type]
                let base = {
                    _typeId: `${typeId}${AND_JOINER}${type}`,
                    _typeNav: `${nav}${ARROW_JOINER}${descr}`,
                    _typeName: descr
                }
                return <List.Item style={{padding: '0 0 2px 0'}}>
                    <div
                        {...getDragProps({...base,configer,renderer})}
                        style={{
                            width: '100%',backgroundColor: '#333',cursor: 'pointer',
                            display: 'flex',alignItems: 'center'
                        }}
                        onClick={() => addComponent(base,configer,renderer)}
                    >
                        <ComponentImage image={image} icon={icon} descr={descr}/>
                        <span style={{marginLeft: 6}}>
                            {descr}
                            {
                                tooltip &&
                                <Tooltip placement="top" title={tooltip}>
                                    <InfoCircleOutlined />
                                </Tooltip>
                            }
                        </span>
                    </div>

                </List.Item>
            }}
        />
    )
}