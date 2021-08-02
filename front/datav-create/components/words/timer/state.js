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
    w: 180,
    h: 50,
    formatter: 'YYYY-MM-DD HH:mm:ss',
    cycle: 0,
    size: 14,
    spacing: 0,
    color: '#fff',
    align: 'center',
    family: 'arial, Arial, sans-serif',
    underline: false,
    deleteline: false,
    italic: false,
    strong: false,
    // _data_fields_or: {
    //     "value": {map: '',required: false},
    // },
    // _data_default_or: `[
    //
    // ]`,
    _events_or: {
        "change": {
            name: "当值改变时",
            descr: "时间值改变，并且满足事件周期调度配置时触发",
            enabled: false,
            fields: [
                {field: 'time',variable: '',descr: '时间戳'},
                {field: 'dateStr',variable: '',descr: '日期字符串'}
            ]
        },
        "click": {
            name: "当点击时",
            descr: "当点击时触发该事件",
            enabled: false,
            fields: [
                {field: 'time',variable: '',descr: '时间戳'},
                {field: 'dateStr',variable: '',descr: '日期字符串'}
            ]
        }
    },
}

export default state