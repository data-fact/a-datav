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
import {Row,Col,Radio,Tooltip} from 'antd4'
import { FullscreenOutlined,ColumnWidthOutlined,ColumnHeightOutlined,DragOutlined,StopOutlined } from '@ant-design/icons';
import {SCALE_TYPE} from "../../../common/constant";

export default function ScaleTypeConfiger({scaleType,onChange}){

    return (
        <Row>
            <Col span={6}>缩放方式</Col>
            <Col span={18}>
                <Radio.Group
                    size="small" buttonStyle="solid"
                    value={scaleType}
                    onChange={e => onChange(e.target.value)}
                >
                    <Tooltip placement="bottom" title="全屏铺满">
                        <Radio.Button value={SCALE_TYPE.full}><FullscreenOutlined /></Radio.Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="等比缩放宽度铺满">
                        <Radio.Button value={SCALE_TYPE.width}><ColumnWidthOutlined /></Radio.Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="等比缩放高度铺满">
                        <Radio.Button value={SCALE_TYPE.height}><ColumnHeightOutlined /></Radio.Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="等比缩放高度铺满(可滚动)">
                        <Radio.Button value={SCALE_TYPE.height1}><DragOutlined /></Radio.Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="不缩放">
                        <Radio.Button value={SCALE_TYPE.none}><StopOutlined /></Radio.Button>
                    </Tooltip>
                </Radio.Group>
            </Col>
        </Row>
    )
}