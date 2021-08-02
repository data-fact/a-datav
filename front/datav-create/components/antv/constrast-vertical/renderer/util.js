/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/12.
 * Description:
 * Modified By:
 */
export function genOption(data,option,grid,legend,label,xAxis,yAxis,color) {
    option = {...option}
    if(data && data.length){
        option.yField = [data[0].s1,data[0].s2]
        option.data = data.map(d => ({
            x: d.x,
            [d.s1]: d.y1,
            [d.s2]: d.y2,
        }))
    }

    if(grid.auto)
        option.padding = 'auto'
    else
        option.padding = [grid.top,grid.right,grid.bottom,grid.left]

    if(legend.show)
        option.legend = {position: legend.position}
    else
        option.legend = false

    if(label.show){
        option.label = {
            position: label.position,
            style: {
                fill: label.color,
                fontSize: label.fontSize,
                fontFamily: label.fontFamily
            }
        }
    }else{
        option.label = null
    }

    option.xAxis = {
        ...option.xAxis,
        label: xAxis.show ? undefined : null,
        position: xAxis.position
    }
    if(yAxis.show)
        option.yAxis = {...option.yAxis}
    else
        option.yAxis = false

    option.color = color

    return option
}