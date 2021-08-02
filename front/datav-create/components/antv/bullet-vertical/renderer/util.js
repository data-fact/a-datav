/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/12.
 * Description:
 * Modified By:
 */
export function genOption(data,option,grid,color,legend,label,axis,shape) {
    option = {...option}
    option.data = data.map(d => {
        return {...d,ranges: [d.ranges],measures: [d.measures]}
    })

    if(grid.auto)
        option.padding = 'auto'
    else
        option.padding = [grid.top,grid.right,grid.bottom,grid.left]

    let color0 = color && color.length ? color[0] : ''
    if(color && color.length){
        option.color = {measure: color0,target: color0,range: color[color.length - 1]}
    }

    option.legend = {
        custom: legend.show,
        position: legend.position,
        items: [
            {
                value: legend.measureName,
                name: legend.measureName,
                marker: { symbol: 'square', style: { fill: color0 } },
            },
            {
                value: legend.targetName,
                name: legend.targetName,
                marker: { symbol: 'line', style: { stroke: color0 } },
            }
        ]
    }

    if(label.show){
        let conf = {
            position: label.position,
            style: {
                fill: label.color,
                fontSize: label.fontSize,
                fontFamily: label.fontFamily
            }
        }
        option.label = {
            measure: conf,
            target: conf
        }
    }else{
        option.label = {
            measure: {style: {fill: 'rgba(0,0,0,0)'}},
            target: {style: {fill: 'rgba(0,0,0,0)'}}
        }
    }

    option.xAxis = {
        ...option.xAxis,
        label: axis.show ? undefined : null
    }

    if(shape && shape.size){
        option.size = {
            measure: shape.size,
            target: shape.size,
            range: shape.size * 1.5,
        }
    }

    return option
}