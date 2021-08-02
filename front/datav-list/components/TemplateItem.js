/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/19.
 * Description:
 * Modified By:
 */
import React from 'react'
import { Card,Image,Tooltip,Radio } from 'antd4';
import {genImageUrl} from "../../utils/util";
import {emptyImage} from "../../utils/util";
const { Meta } = Card

export default function TemplateItem({id:storeId,template,onClick}){

    let {id,name,image,descr} = template

    return (
        <Card
            size="small"
            style={{
                width: 360, margin: 20, cursor: 'pointer',maxHeight: 260,
                border: storeId == id ? '3px solid #177ddc' : ''
            }}
            cover={
                <Image
                    style={{objectFit: 'contain'}}
                    height={200}
                    src={genImageUrl(image)}
                    fallback={emptyImage}
                    placeholder={
                        <Image
                            preview={false}
                            src={emptyImage}
                            height={200}
                        />
                    }
                />
            }
        >
            <Tooltip placement="bottom" title={descr}>
            <Meta
                onClick={() => onClick(id)}
                title={
                    <Radio checked={storeId == id} onClick={() => onClick(id)}>
                        {name}
                    </Radio>
                }
            />
            </Tooltip>
        </Card>
    )
}