/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/11/15.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Button,Tooltip} from 'antd4'
import './color-box.css'

export default function ColorBox({name,title,backgroundColor,colors,onChange,icon}){

    if(!colors.length)
        colors = new Array(5).fill('#fff')

    return (
        <Tooltip placement="right" title={title}>
            <Button
                className={"theme-plan-group"}
                style={{backgroundColor: backgroundColor}}
                onClick={() => onChange && onChange(name)}
            >
                {
                    colors.map(color => (
                        <Tooltip placement="bottom" title={color}>
                            <div className="theme-plan-color" style={{backgroundColor: color}}></div>
                        </Tooltip>
                    ))
                }
                {icon}
            </Button>
        </Tooltip>
    )
}