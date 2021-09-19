/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/1/20.
 * Description:
 * Modified By:
 */
import common_state from "../../common/common_state";

const state = {
    ...common_state,  //继承通用组件状态，包含组件位置、大小、数据等信息
    _data_fields_or: {
        "name": {map: '',required: true},
        "color": {map: '',required: false}
    },
    _data_default_or: `[{
    "name": "Edrward 0"
}, {
    "name": "Edrward 1",
    "color": "#f50"
}, {
    "name": "Edrward 2"
}, {
    "name": "Edrward 3"
}, {
    "name": "Edrward 4"
}, {
    "name": "Edrward 5"
}]`,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击时触发该事件",
            enabled: false,
            isIndex: true,
            fields: [
                // {field: '_row',variable: '',descr: '行'}
            ]
        }
    },
    bgColor: 'rgba(0,0,0,0)',
    margin: 10,
    padding: 8,
    minWidth: 100,
    border: {
      width: 1,
      type: 'solid',
      color: 'rgba(255,255,255,1)'
    },
    font: {
        size: 18,
        color: '',
        family: ''
    }
}

export default state;