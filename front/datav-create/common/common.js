/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import {AND_JOINER} from "./constant";
import components from "../components/config";

export const colors = {
    'success': '#40a9ff',
    'error': '#f27a24'
}

export function getInstanceByTypeId(typeId) {
    let ls = typeId.split(AND_JOINER)
    if(ls.length != 3){
        console.error(`${typeId} 异常`)
        return null
    }
    let [l1,l2,l3] = ls
    let comp1 = components[l1]
    if(!comp1) return null
    let comp2 = comp1['children'][l2]
    if(!comp2) return null
    let instance = comp2['children'][l3]
    if(!instance)
        return null
    let nav = `${components[l1].descr}>${l2 == 'deft' ? '' : components[l1]['children'][l2].descr + '>'}${instance.descr}`
    return {...instance,nav}
}

export const dataSourceTypes = [
    {type: 'static', label: '静态数据'},
    {type: 'api', label: 'API'},
]

export const lineTypes = ['solid','dashed','dotted']
export const symbolTypes = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none']

export const chartPostitions = {
    'top_left': '上左',
    'top_center': '上中',
    'top_right': '上右',
    'bottom_left': '下左',
    'bottom_center': '下中',
    'bottom_right': '下右',
}