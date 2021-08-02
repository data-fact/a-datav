/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/11/2.
 * Description:
 * Modified By:
 */
import defaultOption from "./option";

export default function buildGuid(option) {

    let { xAxis, yAxis, series, polar, _type, radar } = option
    let hasBar = _type == 'bar'
    let hasLine = _type =='line'||_type=='area'
    series && series.length && series.forEach(s => hasBar = hasBar || (s && s.type == 'bar'))
    let isGauge = _type == 'gauge' || (series && series[0] && series[0].type == 'gauge')

    return {
        isAxis: xAxis && yAxis,
        isPie: _type == 'pie' || (series && series[0] && series[0].type == 'pie'),
        hasBar,
        hasLine,
        isPolar: !!polar,
        isRadar: !!radar,
        isGauge,
        isArea: _type == 'area'
    }
}
export function formatOption(option, guid) {
    if (!option.color)
        option.color = defaultOption.color
    option.title = Object.assign({}, defaultOption.title, option.title)
    option.tooltip = Object.assign({}, defaultOption.tooltip, option.tooltip)
    option.legend = Object.assign({}, defaultOption.legend, option.legend)
    option.label = Object.assign({}, defaultOption.label, option.label)
    option.grid = Object.assign({}, defaultOption.grid, option.grid)
    if (guid.hasBar) {
        option._barBackground = Object.assign({}, defaultOption._barBackground, option._barBackground)
    }
    option._series = option._series || []
    // if(!option.legend)
    //     option.legend = {}
    // if(option.legend.show === undefined)
    //     option.legend.show = true
    if (guid.isPie) {
        // if (!option.series[0].label)
        //     option.series[0].label = { show: false }
        option.itemStyle = Object.assign({}, defaultOption.itemStyle, option.itemStyle)
    }
    if (option.xAxis) {
        if (!Array.isArray(option.xAxis))
            option.xAxis = [option.xAxis]
        option.xAxis = option.xAxis.map(x => {
            return Object.assign({}, defaultOption._axis, x)
        })
    }
    if (option.yAxis) {
        if (!Array.isArray(option.yAxis))
            option.yAxis = [option.yAxis]
        option.yAxis = option.yAxis.map(y => {
            return Object.assign({}, defaultOption._axis, y)
        })
    }

    if (option.angleAxis) {
        option.angleAxis = Object.assign({}, defaultOption._axis, option.angleAxis)
    }
    if (option.radiusAxis) {
        option.radiusAxis = Object.assign({}, defaultOption._axis, option.radiusAxis)
    }

    if (guid.isAxis) {
        if (!option.dataZoom)
            option.dataZoom = []
        option.dataZoom[0] = Object.assign({}, defaultOption.dataZoom[0], option.dataZoom[0])
        // option.dataZoom[1] = Object.assign({},defaultOption.dataZoom[1],option.dataZoom[1])
    }

    if (guid.isRadar) {
        if (!option.radar.name)
            option.radar.name = {}
        if (!option.radar.name.textStyle)
            option.radar.name.textStyle = {}
    }

    if (guid.isGauge) {
        option.gaugeAxis = Object.assign({}, defaultOption._axis, option.gaugeAxis)
        if (!option.gaugeDetail) {
            option.gaugeDetail = { show: false }
        }
    }

    // option._series = []
    // if(!option.series.length)
    //     option._series.push({color: option.color})

    option._ready = true
}