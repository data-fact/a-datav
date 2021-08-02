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
    let seriesData = {}

    data.forEach((d,i) => {
        let {x,y,s} = d
        if(!seriesData[s])
            seriesData[s] = {x:[],y:[]}
        seriesData[s].x.push(x)
        seriesData[s].y.push({value: y,_index: i})
    })
    option.legend.data = Object.keys(seriesData)
    for(let i = 0; i <= 1; i++){
        if(option.legend.data[i]){
            let l = option.legend.data[i]
            option.xAxis[i].data = seriesData[l].x
            option.series[i] = {
                name: l,
                type: 'line',
                data: seriesData[l].y
            }
        }
    }

    return option
}