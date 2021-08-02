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
            series.push({
                name: s,type: 'bar', stack: 'a',
                data: [{value: y,_index: i}]
            })
        }
    })

    option.legend.data = legendData
    option.yAxis[0].data = xAxisData
    option.series = series

    if(option.series.length == 1){
        option.series[0].itemStyle = {barBorderRadius: 30}
    }
    if(option.series.length > 1){
        option.series[0].itemStyle = {barBorderRadius: [30, 0, 0, 30]}
        option.series[option.series.length - 1].itemStyle = {barBorderRadius: [0, 30, 30, 0]}
    }

    return option
}