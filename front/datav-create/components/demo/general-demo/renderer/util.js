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

    data.forEach(d => {
        let {x,y,s} = d
        if(xAxisData.indexOf(x) < 0)
            xAxisData.push(x)
        if(legendData.indexOf(s) >= 0){
            series.find(ser => ser.name == s).data.push(y)
        }else{
            legendData.push(s)
            series.push({name: s,type: 'line', data: [y]})
        }
    })

    option.legend.data = legendData
    option.xAxis[0].data = xAxisData
    option.series = series

    return option
}