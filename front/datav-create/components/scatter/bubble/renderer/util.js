/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/12.
 * Description:
 * Modified By:
 */
export function genOption(data,option,symbolSize,scale) {
    option = {...option}
    let legendData = []
    let series = []

    data.forEach((d,i) => {
        let {x,y,s,v} = d
        if(legendData.indexOf(s) >= 0){
            series.find(ser => ser.name == s).data.push([x,y,v,symbolSize,i])
        }else{
            legendData.push(s)
            series.push({
                name: s,type: 'scatter',
                symbolSize: data => {
                    let size = data[2] || 10
                    return size / data[3]
                },
                data: [[x,y,v,symbolSize,i]]
            })
        }
    })

    option.legend.data = legendData
    option.series = series

    option.xAxis[0].scale = scale
    option.yAxis[0].scale = scale

    return option
}