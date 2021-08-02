/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/15.
 * Description:
 * Modified By:
 */
import { DeleteOutlined } from '@ant-design/icons';
import { Popover, Tag, Tooltip } from 'antd4';
import React from 'react';
import { SketchPicker } from 'react-color';
import './palette.css';

export default function Palette({title,color,onChange,onDelete}){

    function handleChange(color) {
        let {r,g,b,a} = color.rgb
        onChange(`rgba(${r},${g},${b},${a})`,color)
    }

    return (
        <div style={{
            // border: '1px solid #40a9ff',
            border: !!onDelete ? '1px solid #303030' : '',
            marginRight: 5, width: 78
        }}>
        <Popover content={
            <SketchPicker color={color} onChange={handleChange}/>
        } title={title || '调色盘'} trigger="click">
            <Tooltip placement="bottom" title={color || '选择颜色'}>
            <Tag
                style={{'WebkitTextStroke': '.5px white',color: '#000',cursor: 'pointer'}}
                color={color}
            >{"调色盘"}</Tag>
            </Tooltip>
        </Popover>
            {
                !!onDelete &&
                <DeleteOutlined onClick={onDelete}/>
            }
        </div>
    )
}