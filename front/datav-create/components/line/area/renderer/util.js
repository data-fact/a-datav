import {genSeriesColor} from "../../../common/echartsUtil";

/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/12.
 * Description:
 * Modified By:
 */
export function genOption(data,option) {
    option = {...option}
    let legendData = []
    let xAxisData = []
    let series = []

    data.forEach((d,i) => {
        let {x,y,s} = d
        if(xAxisData.indexOf(x) < 0)
            xAxisData.push(x)
        if(legendData.indexOf(s) >= 0){
            series.find(ser => ser.name == s).data.push({value: y,_index: i})
        }else{
            legendData.push(s)
            series.push({name: s,type: 'line', data: [{value: y,_index: i}], areaStyle: {}})
        }
    })

    option.legend.data = legendData
    option.xAxis[0].data = xAxisData
    option.series = series

    option._series && option._series.forEach((_ser,i) => {
        if(!option.series[i] || !_ser.areaColors) return
        option.series[i].areaStyle.color = genSeriesColor(_ser.areaColors)
    })

    return option
}