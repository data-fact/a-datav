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
    let series = [{
        symbolSize: 0,
        type: 'radar',
        data: []
    }]

    data.forEach(d => {
        let {x,y,s} = d
        if(xAxisData.indexOf(x) < 0)
            xAxisData.push(x)
        if(legendData.indexOf(s) >= 0){
            series[0].data.find(ser => ser.name == s).value.push(y)
        }else{
            legendData.push(s)
            series[0].data.push({name: s, value: [y]})
        }
    })

    option.legend.data = legendData
    option.radar.indicator = xAxisData.map(name => ({name}))
    option.series = series

    option.radar.axisLine = {show: option.radar.show}
    option.radar.splitLine = {show: option.radar.show}
    option.radar.splitArea = {show: option.radar.show}

    return option
}