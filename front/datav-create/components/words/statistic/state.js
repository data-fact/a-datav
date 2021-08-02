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
    w: 200,
    h: 150,
    _support_children_or: ['material&deft&icons'],
    _data_fields_or: {
        "value": {map: '',required: false},
    },
    _data_default_or: `[
        {"value": 11.28}
]`,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击时触发该事件",
            enabled: false,
            fields: [
                {field: 'value',variable: '',descr: '值'}
            ]
        }
    },
    orient: 'vertical',
    padding: 20,
    titleStyle: {
        title: '标题',
        show: true,
        size: 32,
        color: '#fff',
        family: 'arial, Arial, sans-serif',
    },
    valueStyle: {
        size: 28,
        color: '#D0021B',
        family: 'arial, Arial, sans-serif',
        precision: 2,
        suffix: '%',
        groupSeparator: ','
    }
}

export default state