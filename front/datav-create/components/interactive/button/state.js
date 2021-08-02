/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/15.
 * Description:
 * Modified By:
 */
import common_state from "../../common/common_state";

const state = {
    ...common_state,
    w: 120,
    h: 50,
    placeholder: '按钮',
    colors:['',''],
    borderColors: [],
    borderType: 'solid',
    borderWidth: 1,
    showRadius:true,
    borderRadius:3,
    size: 14,
    spacing: 1,
    color: '#fff',
    align: 'center',
    family: 'arial, Arial, sans-serif',
    _theme: 'dark',
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击时触发该事件",
            enabled: false,
            fields: [ ]
        }
    },
}

export default state