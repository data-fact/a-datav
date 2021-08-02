/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/29.
 * Description:
 * Modified By:
 */
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Collapse } from 'antd4';
import React from 'react';
import BarSet from "./base/BarSet";
import ItemStyle from "./base/ItemStyle";
import LabelLine from "./base/LabelLine";
import Legend from "./base/Legend";
import LineSet from './base/LineSet';
import Padding from "./base/Padding";
import PiePadding from "./base/PiePadding";
import Title from "./base/Title";
import ValueLabel from "./base/ValueLabel";
const { Panel } = Collapse

export default function ChartConfiger({ guid, custom, onChange, option }) {
    let { title, grid, gaugeDetail, label, legend, xAxis, yAxis, itemStyle, _labelLine, _position } = option
    function handlePaddingChange(key, value) {
        onChange({ grid: { [key]: { $set: value } } })
    }
    function handleLableShow(e) {
        e.stopPropagation()
        // if(guid.isPie){
        //     onChange({series: {0: {label: {show: {$set: !label.show}}}}})
        // }else
        onChange({ label: { show: { $set: !label.show } } })
    }
    function handleLableLineShow(e) {
        e.stopPropagation()
        onChange({ _labelLine: { show: { $set: !_labelLine.show } } })
    }
    function handleTitleShow(e) {
        e.stopPropagation()
        onChange({ title: { show: { $set: !title.show } } })
    }
    function handleLegendShow(e) {
        e.stopPropagation()
        onChange({ legend: { show: { $set: !legend.show } } })
    }
    function handleGaugeDetailShow(e) {
        e.stopPropagation()
        onChange({ gaugeDetail: { show: { $set: !gaugeDetail.show } } })
    }
    function handlePositionChange(position) {
        onChange({ _position: { $set: position } })
    }

    return (
        <>
            {
                guid.isAxis &&
                <div style={{ margin: '8px 0 8px 0' }}>
                    <Padding grid={grid} onChange={handlePaddingChange} />
                </div>
            }
            {
                guid.isPie &&
                <div style={{ margin: '8px 0 8px 0' }}>
                    <PiePadding position={_position} onChange={handlePositionChange} />
                </div>
            }
            <div style={{ marginBottom: 8 }}>
                <Collapse bordered={false} size="small">
                    {
                        custom &&
                        <Panel
                            header="图表配置" key="1"
                        >
                            {custom}
                        </Panel>
                    }
                    {
                        guid.isPie &&
                        <Panel
                            header="扇形" key="item"
                        >
                            <ItemStyle itemStyle={itemStyle} onChange={onChange} />
                        </Panel>
                    }
                    {
                        guid.isPie &&
                        <Panel
                            header="标签线" key="labelLine"
                            disabled={!_labelLine.show}
                            extra={
                                _labelLine.show ?
                                    <EyeOutlined onClick={handleLableLineShow} /> :
                                    <EyeInvisibleOutlined onClick={handleLableLineShow} />
                            }
                        >
                            <LabelLine labelLine={_labelLine} onChange={onChange} />
                        </Panel>
                    }
                    {
                        guid.hasBar &&
                        <Panel
                            header="柱图配置" key="barSet"
                        >
                            <BarSet option={option} onChange={onChange} />
                        </Panel>
                    }
                    {
                        guid.hasLine &&
                        <Panel
                            header="折线配置" key="barSet"
                        >
                            <LineSet option={option} onChange={onChange} />
                        </Panel>
                    }
                    <Panel
                        header="标题" key="2"
                        disabled={!title.show}
                        extra={
                            title.show ?
                                <EyeOutlined onClick={handleTitleShow} /> :
                                <EyeInvisibleOutlined onClick={handleTitleShow} />
                        }
                    >
                        <Title title={title} guid={guid} onChange={onChange} />
                    </Panel>
                    {
                        (!guid.isPolar || !guid.isGauge) &&
                        <Panel
                            header="值标签" key="3"
                            disabled={!label.show}
                            extra={
                                label.show ?
                                    <EyeOutlined onClick={handleLableShow} /> :
                                    <EyeInvisibleOutlined onClick={handleLableShow} />
                            }
                        >
                            <ValueLabel
                                xAxis={xAxis}
                                label={label} guid={guid}
                                yAxisType={yAxis && yAxis[0] ? yAxis[0].type : ''}
                                onChange={onChange}
                            />
                        </Panel>
                    }
                    <Panel
                        header="图例" key="4"
                        disabled={!legend.show}
                        extra={
                            legend.show ?
                                <EyeOutlined onClick={handleLegendShow} /> :
                                <EyeInvisibleOutlined onClick={handleLegendShow} />
                        }
                    >
                        <Legend legend={legend} onChange={onChange} />
                    </Panel>
                </Collapse>
            </div>
        </>
    )
}