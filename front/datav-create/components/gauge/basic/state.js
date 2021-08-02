/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import common_state from "../../common/common_state";

const state = {
    ...common_state,
    _data_fields_or: {
        "value": {map: '',required: true},
    },
    _data_default_or: `[{"value": 70}]`,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击图表时触发该事件",
            enabled: false,
            fields: [
                {field: 'value',variable: '',descr: '值'},
            ]
        }
    },
    option: {
        gaugeAxis: {
            axisLabel: {show:true,color: '#eee'}
        },
        label: {show: false},
        series: [
            {
                type: 'gauge',
                progress: {
                    show: true,
                    width: 18
                },
                detail: {show: false},
                data: []
            }
        ]
    }
}

export default state