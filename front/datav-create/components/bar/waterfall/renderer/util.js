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
    let xAxisData = []
    let series = [
        {
            name: 'y1', type: 'bar', data: [], stack: 'a',
            label: {show: false},
            itemStyle: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
            },
            emphasis: {
                itemStyle: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
        },
        {name: 'y', type: 'bar', data: [], stack: 'a'}
    ]

    data.forEach((d,i) => {
        let {x,y,y1} = d
        if(xAxisData.indexOf(x) < 0)
            xAxisData.push(x)
        series[0].data.push({value: y1,_index: i})
        series[1].data.push({value: y,_index: i})
    })

    option.xAxis[0].data = xAxisData
    option.series = series

    return option
}