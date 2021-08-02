import { isObject } from "../../../utils/util";
import seriesColors from "../../common/style/series_colors";

/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/1/22.
 * Description:
 * Modified By:
 */
export function getSeriesColors(colors) {
    let seriesColor = seriesColors[colors] ? seriesColors[colors].value : []
    return seriesColor
}
export function concatColors(colors, optionColor = []) {
    let seriesColor = getSeriesColors(colors)
    if (seriesColor) {
        seriesColor = seriesColor.map((c, i) => {
            return optionColor[i] || c
        })
        seriesColor = seriesColor.concat(optionColor.slice(seriesColor.length - 1, optionColor.length))
    }
    return seriesColor
}

export function setBarBackground(option) {
    option.series.forEach(ser => {
        ser.backgroundStyle = option._barBackground.backgroundStyle
        ser.showBackground = option._barBackground.showBackground
    })
}
export function setLineSeries(option) {
    let obj = { ...option.line_series }
    for (let key in obj) {
        if (obj[key] == '') {
            delete obj[key]
        }
    }
    option.series.forEach(ser => {
        Object.assign(ser, obj)
    })
}
export function genSeriesColor(colors) {
    let color = ''
    colors = colors.filter(c => !!c)
    if (colors.length == 1) {
        color = colors[0]
    } else if (colors.length == 2) {
        color = {
            type: 'linear',
            colorStops: [{
                offset: 0, color: colors[0] // 0% 处的颜色
            }, {
                offset: 1, color: colors[1] // 100% 处的颜色
            }]
        }
    }
    return color
}
export function handleSeries(option) {
    //单独处理饼图颜色
    if (option.series[0] && option.series[0].type == 'pie' && option.series[0].data) {
        option.series[0].data.forEach((d, pieI) => {
            let pieSer = option._series[pieI]
            if (!pieSer) return
            let pieColor = genSeriesColor(pieSer.colors)
            if (pieColor) {
                if (!d.itemStyle) d.itemStyle = {}
                d.itemStyle.color = pieColor
            }
        })
    }
    option._series.forEach((_ser, i) => {
        let ser = option.series[i]
        if (!ser) return
        let { colors, marks } = _ser
        //处理系列色
        let color = genSeriesColor(colors)
        if (color) {
            if (ser.type == 'line') {
                if (!ser.lineStyle) ser.lineStyle = {}
                ser.lineStyle.color = color
                if (!ser.itemStyle) ser.itemStyle = {}
                // 设置折线折点颜色和系列色相同
                ser.itemStyle = {
                    color: color
                }
            } else if (ser.type == 'bar') {
                if (!ser.itemStyle) ser.itemStyle = {}
                if (isObject(color)) {
                    color.x = 0
                    color.y = 1
                }
                ser.itemStyle.color = color
            } else if (ser.type == 'pie') {
            } else {
                if (!ser.itemStyle) ser.itemStyle = {}
                ser.itemStyle.color = color
            }
        }

        //处理标注
        marks.forEach(mark => {
            if (mark.markType == 'point') {
                if (!ser.markPoint || !ser.markPoint.data)
                    ser.markPoint = { data: [] }
                ser.markPoint.data.push(mark)
            } else if (mark.markType == 'line') {
                if (!ser.markLine || !ser.markLine.data)
                    ser.markLine = { data: [] }
                ser.markLine.data.push(mark)
            }
        })
    })

}