/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/30.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Button,Tooltip,Popover} from 'antd4'
import { FundViewOutlined,QrcodeOutlined } from '@ant-design/icons'
import QRCode from 'qrcode.react'

export default function SysControl(){

    function handlePreview() {
        let url = getViewUrl()
        window.open(url,'_blank')
    }

    return (
        <Button.Group size="small" style={{marginTop: 3}}>
            <Tooltip placement="bottom" title="预览">
                <Button
                    type="primary" style={{width: 50}}
                    onClick={handlePreview}
                >
                    <FundViewOutlined />
                </Button>
            </Tooltip>
            <Popover
                placement="bottom"
                title="预览二维码"
                content={
                    <QRCode value={getViewUrl()}/>
                }
            >
                <Button
                    type="primary" style={{width: 50}}
                >
                    <QrcodeOutlined />
                </Button>
            </Popover>
        </Button.Group>
    )
}
function getViewUrl() {
    return window.location.href.replace('/edit','/view')
}