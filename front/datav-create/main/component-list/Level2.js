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
import {Collapse} from 'antd4'
import Level3 from "./Level3";
import {AND_JOINER, ARROW_JOINER} from "../../common/constant";

const { Panel } = Collapse

export default function Level2({typeId,nav,components}){

    let types = Object.keys(components)
    let defts = components.deft

    return (
        <>
            <Collapse
                bordered={false} accordion style={{paddingLeft: 0}}
                // defaultActiveKey={types && types.length ? [types[0]] : []}
            >
                {
                    types.map(type => {
                        if(type != 'deft'){
                            let {icon,descr,children} = components[type]
                            let Icon = icon
                            return <Panel
                                header={
                                    <>
                                        <Icon />
                                        {descr}
                                    </>
                                }
                                key={type}
                            >
                                <Level3
                                    typeId={`${typeId}${AND_JOINER}${type}`}
                                    nav={`${nav}${ARROW_JOINER}${descr}`}
                                    components={children}
                                />
                            </Panel>
                        }
                    })
                }
            </Collapse>
            {
                defts ?
                    <Level3
                        typeId={`${typeId}${AND_JOINER}deft`}
                        nav={nav}
                        components={defts.children}
                    />
                    :
                    null
            }
        </>
    )
}