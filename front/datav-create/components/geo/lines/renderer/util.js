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
    option = {...option,data: data.map((d,i) => ({...d,_index:i}))}
    // option.data = data.map(d => (
    //     [
    //         {coord: d.start,value: 0},
    //         {coord: d.end},
    //     ]
    // ))

    return option
}