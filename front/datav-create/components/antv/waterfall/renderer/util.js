/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/12.
 * Description:
 * Modified By:
 */
export function genOption(data,option,color,legend,label,grid,xAxis,yAxis) {
    option = {...option}
    option.data = data

    if(grid.auto)
        option.padding = 'auto'
    else
        option.padding = [grid.top,grid.right,grid.bottom,grid.left]

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
        option.label = {style: {fill: 'rgba(0,0,0,0)'}}
    }

    if(legend.show)
        option.legend = {
            custom: true,
            position: legend.position,
            items: [
                {
                    name: legend.inc.name,
                    value: legend.inc.name,
                    marker: { symbol: 'square', style: { r: 5, fill: legend.inc.color } },
                },
                {
                    name: legend.dec.name,
                    value: legend.dec.name,
                    marker: { symbol: 'square', style: { r: 5, fill: legend.dec.color } },
                },
                {
                    name: legend.total.name,
                    value: legend.total.name,
                    marker: { symbol: 'square', style: { r: 5, fill: legend.total.color } },
                }
            ]
        }
    else
        option.legend = false

    option.total.label = legend.total.name
    option.total.style.fill = legend.total.color
    option.color = function ({x,y}) {
        if(x == legend.total.name)
            return legend.total.color
        return y > 0 ? legend.inc.color : legend.dec.color
    }

    option.xAxis = xAxis.show ? {label: {}} : {label: null}
    option.yAxis = yAxis.show ? {label: {}} : {label: null}

    return option
}