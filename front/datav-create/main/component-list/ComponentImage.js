/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/1/29.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Button} from 'antd4'
import { WarningOutlined } from '@ant-design/icons';
import {IMAGE_PATH} from "../../common/constant";

export default function ComponentImage({image,icon,descr}){

    let Icon = icon || WarningOutlined
    return (
        <>
            {
                image ?
                    <img
                        style={{width: 60,height: 40,border: '1px solid #333'}}
                        alt={descr}
                        src={`${IMAGE_PATH}/${image}`}
                    />
                    :
                    <div
                        style={{width: 60,height: 40,border: '1px solid #333',fontSize: 25}}
                    >
                        <Icon style={{padding: '0 10px'}}/>
                    </div>
            }
        </>
    )
}