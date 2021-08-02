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
import {Tabs,Tooltip} from 'antd4'
import Level2 from "./Level2";
import "./component-list.css"

const { TabPane } = Tabs

export default function Level1({components}){

    let types = Object.keys(components)

    return (
        <Tabs
            tabBarStyle={{padding: 0}}
            className={"datav-component-list-tabs"}
            size="small" tabPosition="left"
        >
            {
                types.map(type => {
                    //hidden下的组件不显示
                    if(type == 'hidden')
                        return null

                    let {icon,descr,children} = components[type]
                    let Icon = icon
                    return <TabPane
                        tab={
                            <Tooltip title={descr} placement="right">
                                <Icon style={{fontSize: "large"}} />
                            </Tooltip>
                        }
                        key={type}
                    >
                        <Level2 typeId={type} nav={descr} components={children}/>
                    </TabPane>
                })
            }
        </Tabs>
    )
}