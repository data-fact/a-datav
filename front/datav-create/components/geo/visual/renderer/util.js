/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/12.
 * Description:
 * Modified By:
 */
import seriesColors from "../../../../common/style/series_colors";
export function genOption(data,option,colors,subIndex) {
    data = data.map((d,i) => ({...d,_index:i}))
    option = {...option,data}
    let color
    if(option.colors && option.colors.length)
        color = option.colors
    else
        color = seriesColors[colors].value
    let min = 0, max = 100
    let sortData = data.sort((a,b) => a.value - b.value)
    if(sortData[0]) min = sortData[0].value
    if(sortData[sortData.length - 1]) max = sortData[sortData.length - 1].value
    option.visualMap = color && color.length ?
        [{show: option.show, inRange: {color}, seriesIndex: subIndex,min,max}] :
        [{show: option.show, seriesIndex: subIndex,min,max}]
    return option
}