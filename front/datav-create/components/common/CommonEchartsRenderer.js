/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import { useDebounceFn } from 'ahooks';
import React, { useEffect, useRef } from 'react';
import themes from "../../common/style/themes";
import useFetchMap from "../../hooks/useFetchMap";
import useGetColors from '../../hooks/useGetColors';
import useCanvasReducer from "../../reducers/useCanvasReducer";
import {getSeriesColors, handleSeries, setBarBackground,setLineSeries} from "./echartsUtil";
// const echarts = require('echarts')

let chartMap = {}
export default function CommonEchartsRenderer({ id, option, getInstance }) {

    let ref = useRef(null)
    let [canvas] = useCanvasReducer()
    let fetchMap = useFetchMap()
    let seriesColors = useGetColors()
    let { theme, colors } = canvas
    const { run: setOption } = useDebounceFn((id, option) => {
        if (chartMap[id]) {
            try {
                if (option) {
                    //合并全局系列色和组件系列色
                    option = { ...option }
                    option.color = getSeriesColors(colors)
                    option.color = option.color.concat(option.color)
                    //合并系列配置
                    if (Array.isArray(option._series) && Array.isArray(option.series))
                        handleSeries(option, seriesColors)
                    //设置柱图背景配置
                    if (option._barBackground) {
                        setBarBackground(option)
                    }
                    //设置折线系列配置
                    if (option.line_series) {
                        setLineSeries(option)
                    }
                    // 判断图表的边距属性是否有值，如果没有值就删掉这个边距属性
                    let obj = {...option.grid}
                    for (var key in obj) {
                        if (obj[key] == '') {
                            delete obj[key]
                        }
                    }
                    option.grid = obj
                    chartMap[id].setOption(option, true)
                }
                // else
                //     console.error(`${id} echarts option不正确`)
            } catch (e) {
                console.error(id, e)
            }
        } else {
            console.error(`${id} echarts实例不存在`)
        }
    }, { wait: 500 });


    useEffect(() => {
        try {
            chartMap[id] = echarts.init(ref.current, themes[theme] ? themes[theme].value() : null)
            console.info(`echart实例创建成功 id: ${id}, echart: `, chartMap[id])

            let resizeObserver = new ResizeObserver(() => {
                if (chartMap[id])
                    chartMap[id].resize()
            })
            resizeObserver.observe(ref.current)
            setOption(id, option)
            getInstance && getInstance(chartMap[id])
        } catch (err) {
            console.error(err)
        }

        return () => {
            try {
                chartMap[id] && chartMap[id].clear()
                chartMap[id] && chartMap[id].dispose()
            } catch (e) {
                console.error(e)
            }
        }
    }, [theme])
    useEffect(() => {
        let region = option && option.geo ? option.geo.map : null
        if (region && !echarts.getMap(region)) {
            fetchMap(region, map => {
                echarts.registerMap(region, map)
                setOption(id, option)
            })
        } else {
            setOption(id, option)
        }
    }, [option, colors])

    return (
        <div ref={ref} id={id} style={{ height: '100%', width: '100%' }}></div>
    )
}