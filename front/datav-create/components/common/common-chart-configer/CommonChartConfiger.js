/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/29.
 * Description:
 * Modified By:
 */
import { Card, Tabs } from 'antd4';
import update from 'immutability-helper';
import React, { useEffect, useState } from 'react';
import AxisConfiger from "./AxisConfiger";
import ChartConfiger from "./ChartConfiger";
import "./common-chart-configer.css";
import buildGuid, { formatOption } from "./guid";
import OtherConfiger from "./OtherConfiger";
import SeriesConfiger from "./SeriesConfiger";

const { TabPane } = Tabs

export default function CommonChartConfiger({ baseOption, custom, onChange }) {

    let [option, setOption] = useState(null)
    let [guid, setGuid] = useState({})
    useEffect(() => {
        // let newOption = update(defaultOption,{$merge: baseOption})
        let ready = baseOption._ready
        let newOption = update({}, { $merge: baseOption })
        let g = buildGuid(newOption)
        if (!ready)
            formatOption(newOption, g)
        setGuid(g)
        setOption(newOption)
        if (!ready)
            onChange(newOption)
    }, [baseOption])

    if (!option)
        return null

    function handleChange(value) {
        let newOption = update(option, value)
        // setOption(newOption)
        onChange(newOption)
    }

    let { title, grid, legend, xAxis, yAxis, series, _series, dataZoom, tooltip, itemStyle, color } = option
    let label = (guid.isPie ? series[0].label : option.label) || {}
    return (
        <Card
            size="small"
            bordered={false} style={{ width: '100%', height: '100%' }}
        >
            <Tabs size="small" style={{ width: '100%', height: '100%' }}>
                <TabPane
                    key="1"
                    tab="图表"
                >
                    <ChartConfiger
                        option={option}
                        guid={guid}
                        custom={custom}
                        onChange={handleChange}
                    />
                </TabPane>
                <TabPane
                    key="2"
                    tab="坐标轴"
                >
                    <AxisConfiger
                        {...option}
                        guid={guid}
                        onChange={handleChange}
                    />
                </TabPane>
                <TabPane
                    key="3"
                    tab="系列"
                >
                    <SeriesConfiger _series={_series} guid={guid} onChange={handleChange} />
                </TabPane>
                <TabPane
                    key="4"
                    tab="其他"
                >
                    <OtherConfiger tooltip={tooltip} dataZoom={dataZoom} guid={guid} onChange={handleChange} />
                </TabPane>
            </Tabs>
        </Card>
    )
}