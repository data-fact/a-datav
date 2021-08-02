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
    value: '文字',
    size: 14,
    spacing: 0,
    color: '#fff',
    colors: ['#fff'],
    align: 'center',
    family: 'arial, Arial, sans-serif',
    underline: false,
    deleteline: false,
    text_overflow:'unset',
    italic: false,
    strong: false,
    _data_fields_or: {
        "value": {map: '',required: false},
    },
    _data_default_or: `[
        //{"value": "文字"} //value会覆盖配置中的文字
]`,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击时触发该事件",
            enabled: false,
            fields: [
                {field: 'value',variable: '',descr: '文字'}
            ]
        }
    },
}

export default state