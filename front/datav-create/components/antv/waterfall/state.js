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
    w: 450,
    _data_fields_or: {
        "x": {map: '',required: true},
        "y": {map: '',required: true},
    },
    _data_default_or: `[{
    "x": "日用品",
    "y": 120
}, {
    "x": "伙食费",
    "y": 900
}, {
    "x": "交通费",
    "y": 200
}, {
    "x": "水电费",
    "y": 300
}, {
    "x": "房租",
    "y": 1200
}, {
    "x": "商场消费",
    "y": 1000
}, {
    "x": "红包收入",
    "y": -2000
}]`,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击图表时触发该事件",
            enabled: false,
            fields: [
                {field: 'x',variable: '',descr: '类目'},
                {field: 'y',variable: '',descr: '值'},
            ]
        }
    },
    option: {
        data: [],
        _color: false,
        padding: 'auto',
        xField: 'x',
        yField: 'y',
        // appendPadding: [15, 0, 0, 0],
        meta: {
            type: {
                alias: '类别',
            },
            money: {
                alias: '收支',
                formatter: (v) => `${v} 元`,
            },
        },
        label: {
            style: { fontSize: 10, fill: 'rgba(0,0,0,0.65)' },
            layout: [{ type: 'interval-adjust-position' }],
        },
        total: {
            label: '',
            style: {
                fill: '',
            },
        },
    },
    grid: {
        top: 40, right: 20, bottom: 26, left: 40, auto: true
    },
    legend: {
        show: true,
        position: 'top',
        inc: {name: '增加', color: 'rgba(221,107,66,1)'},
        dec: {name: '减少', color: 'rgba(10,115,255,1)'},
        total: {name: '总计', color: 'rgba(238,238,238,1)'},
    },
    label: {
        show: true,
        position: 'middle',
        fontSize: undefined,
        fontFamily: undefined,
        color: undefined
    },
    xAxis: {
        show: true
    },
    yAxis: {
        show: true
    },
}

export default state