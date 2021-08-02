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
    h: 50,
    size: 'default',
    placeholder: '请选择',
    defaultValue: '',
    borderColors: ['',''],
    borderType: 'solid',
    borderWidth: 1,
    showRadius:true,
    borderRadius:2,
    backgroundColor:'rgba(255,255,255,1)',
    fontSize: 14,
    spacing: 1,
    color: '#000',
    align: 'left',
    family: 'arial, Arial, sans-serif',
    defaultFirstValue: false,
    value: undefined,
    datePicker: {
        type: 'day',
        showTime: false,
        timeFormat: '',  //如果显示时间，时间格式
        format: '',
        start: '',
        end: '',
    },

    _data_fields_or: {
        "value": {map: '',required: false},
    },
    _data_default_or: `[
        {
            "value": 1609459200000
        }
    ]`,
    _events_or: {
        "change": {
            name: "当值改变时",
            descr: "当日期改变时触发该事件",
            enabled: false,
            fields: [
                {field: 'time',variable: '',descr: '时间戳'},
                {field: 'dateStr',variable: '',descr: '日期字符串'}
            ]
        }
    },
}

export default state