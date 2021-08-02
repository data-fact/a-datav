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
    _data_fields_or: {
        "value": {map: '',required: true},
        "name": {map: '',required: false},
    },
    _data_default_or: `[
        {
            "value": "2020",
            "name": "2020年"
        },
        {
            "value": "2019",
            "name": "2019年"
        },
        {
            "value": "2018",
            "name": "2018年"
        }
    ]`,
    _events_or: {
        "change": {
            name: "当值改变时",
            descr: "当下拉框值改变时触发该事件",
            enabled: false,
            isIndex: true,
            fields: [
                {field: 'name',variable: '',descr: '描述'},
                {field: 'value',variable: '',descr: '值'}
            ]
        }
    },
}

export default state