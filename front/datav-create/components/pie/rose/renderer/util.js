/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/12.
 * Description:
 * Modified By:
 */
export function genOption(data, option) {
    option = { ...option }
    option.series[0].data = data
    option.series[0].itemStyle = option.itemStyle
    option.series[0].label = option.label
    option.series[0].labelLine = option._labelLine
    if(option._position)
        option.series[0].center = option._position
    return option
}