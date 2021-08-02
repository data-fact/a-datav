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
        "title": {map: '',required: true},
        "ranges": {map: '',required: true},
        "measures": {map: '',required: true},
        "target": {map: '',required: true},
    },
    _data_default_or: `[{
    "title": "重庆", 
    "ranges": 120, //区间
    "measures": 65, //实际值
    "target": 80 //目标值
}, {
    "title": "杭州",
    "ranges": 120,
    "measures": 50,
    "target": 100
}, {
    "title": "广州",
    "ranges": 120,
    "measures": 40,
    "target": 85
}, {
    "title": "深圳",
    "ranges": 120,
    "measures": 50,
    "target": 100
}]`,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击图表时触发该事件",
            enabled: false,
            fields: [
                {field: 'title',variable: '',descr: '名称'},
                {field: 'measures',variable: '',descr: '实际值'},
                {field: 'target',variable: '',descr: '目标值'}
            ]
        }
    },
    option: {
        data: [],
        measureField: 'measures',
        rangeField: 'ranges',
        targetField: 'target',
        xField: 'title',
        xAxis: { line: null },
        yAxis: false
    },
    grid: {
        top: 26, right: 20, bottom: 26, left: 40, auto: true
    },
    legend: {
        show: true,
        position: 'top',
        measureName: '实际值',
        targetName: '目标值',
    },
    label: {
        show: true,
        position: 'middle',
        fontSize: undefined,
        fontFamily: undefined,
        color: undefined
    },
    axis: {
        show: true
    },
    shape: {
        size: 20
    }
}

export default state