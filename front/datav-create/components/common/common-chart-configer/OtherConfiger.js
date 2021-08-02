/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/29.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Collapse,Row,Col,Button,Slider} from 'antd4'
import { EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';
import Tooltip from "./base/Tooltip";
import DataZoom from "./base/DataZoom";

const {Panel} = Collapse

export default function OtherConfiger({tooltip,dataZoom,guid,onChange}){

    function handleTooltipShow(e) {
        e.stopPropagation()
        onChange({tooltip: {show: {$set: !tooltip.show}}})
    }

    return (
        <>
            <Collapse bordered={false} size="small">
                {
                    guid.isAxis &&
                    <Panel header="海量数据交互增强" key="1">
                        <DataZoom dataZoom={dataZoom} onChange={onChange}/>
                    </Panel>
                }
                <Panel
                    header="提示框" key="2"
                    disabled={!tooltip.show}
                    extra={
                        tooltip.show ?
                            <EyeOutlined onClick={handleTooltipShow}/> :
                            <EyeInvisibleOutlined onClick={handleTooltipShow}/>
                    }
                >
                    <Tooltip tooltip={tooltip} onChange={onChange}/>
                </Panel>
            </Collapse>
        </>
    )
}