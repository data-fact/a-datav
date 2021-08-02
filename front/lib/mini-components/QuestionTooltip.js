/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/2/2.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Tooltip} from 'antd4'
import { QuestionCircleOutlined } from '@ant-design/icons';

export default function QuestionTooltip({placement = 'top',title}){

    return (
        <Tooltip placement={placement} title={title}>
            <QuestionCircleOutlined />
        </Tooltip>
    )
}