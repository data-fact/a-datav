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
    w: 300,
    h: 50,
    size: 'default',
    placeholder: ['开始日期','结束日期'],
    defaultValue: ['',''],
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
    value: [undefined,undefined],
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
            "start": 1609459200000,
            "end": 1640966399999
        }
    ]`,
    _events_or: {
        "change": {
            name: "当值改变时",
            descr: "当日期改变时触发该事件",
            enabled: false,
            fields: [
                {field: 'startTime',variable: '',descr: '开始时间戳'},
                {field: 'startDateStr',variable: '',descr: '开始字符串'},
                {field: 'endTime',variable: '',descr: '结束时间戳'},
                {field: 'endDateStr',variable: '',descr: '结束字符串'},
            ]
        }
    },
}

export default state