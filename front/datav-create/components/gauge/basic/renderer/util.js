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
    option = JSON.parse(JSON.stringify(option))
    option.series[0].data = JSON.parse(JSON.stringify(data))

    if(option.gaugeAxis.show)
        option.series[0] = Object.assign(option.series[0],option.gaugeAxis)
    else{
        option.series[0].axisLabel = {show: false}
        option.series[0].axisLine = {show: false}
        option.series[0].axisTick = {show: false}
        option.series[0].splitLine = {show: false}
    }

    option.series[0].detail = option.label

    return option
}