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
        "x": {map: '',required: true},
        "y": {map: '',required: true},
        "s": {map: '',required: false},
        "v": {map: '',required: false},
    },
    _data_default_or: `[{
    "x": 120,
    "y": 140,
    "s": "系列1",
    "v": 36
}, {
    "x": 137,
    "y": 118,
    "s": "系列1",
    "v": 38
}, {
    "x": 139,
    "y": 105,
    "s": "系列1",
    "v": 32
}, {
    "x": 109,
    "y": 121,
    "s": "系列1",
    "v": 17
}, {
    "x": 132,
    "y": 127,
    "s": "系列1",
    "v": 7
}, {
    "x": 124,
    "y": 129,
    "s": "系列1",
    "v": 48
}, {
    "x": 136,
    "y": 104,
    "s": "系列1",
    "v": 25
}, {
    "x": 112,
    "y": 134,
    "s": "系列1",
    "v": 5
}, {
    "x": 135,
    "y": 141,
    "s": "系列1",
    "v": 47
}, {
    "x": 116,
    "y": 146,
    "s": "系列1",
    "v": 42
}, {
    "x": 108,
    "y": 143,
    "s": "系列1",
    "v": 19
}, {
    "x": 110,
    "y": 130,
    "s": "系列1",
    "v": 13
}, {
    "x": 113,
    "y": 106,
    "s": "系列1",
    "v": 35
}, {
    "x": 103,
    "y": 114,
    "s": "系列1",
    "v": 31
}, {
    "x": 150,
    "y": 145,
    "s": "系列1",
    "v": 15
}, {
    "x": 107,
    "y": 125,
    "s": "系列1",
    "v": 23
}, {
    "x": 126,
    "y": 133,
    "s": "系列1",
    "v": 41
}, {
    "x": 128,
    "y": 115,
    "s": "系列1",
    "v": 27
}, {
    "x": 102,
    "y": 119,
    "s": "系列1",
    "v": 12
}, {
    "x": 104,
    "y": 82,
    "s": "系列2",
    "v": 28
}, {
    "x": 93,
    "y": 75,
    "s": "系列2",
    "v": 20
}, {
    "x": 113,
    "y": 94,
    "s": "系列2",
    "v": 39
}, {
    "x": 106,
    "y": 115,
    "s": "系列2",
    "v": 50
}, {
    "x": 109,
    "y": 107,
    "s": "系列2",
    "v": 9
}, {
    "x": 79,
    "y": 119,
    "s": "系列2",
    "v": 6
}, {
    "x": 100,
    "y": 84,
    "s": "系列2",
    "v": 26
}, {
    "x": 92,
    "y": 80,
    "s": "系列2",
    "v": 43
}, {
    "x": 108,
    "y": 81,
    "s": "系列2",
    "v": 40
}, {
    "x": 114,
    "y": 112,
    "s": "系列2",
    "v": 49
}, {
    "x": 73,
    "y": 71,
    "s": "系列2",
    "v": 37
}, {
    "x": 118,
    "y": 98,
    "s": "系列2",
    "v": 46
}, {
    "x": 117,
    "y": 90,
    "s": "系列2",
    "v": 30
}, {
    "x": 120,
    "y": 78,
    "s": "系列2",
    "v": 11
}, {
    "x": 116,
    "y": 70,
    "s": "系列2",
    "v": 29
}, {
    "x": 89,
    "y": 101,
    "s": "系列2",
    "v": 18
}, {
    "x": 97,
    "y": 111,
    "s": "系列2",
    "v": 33
}, {
    "x": 96,
    "y": 91,
    "s": "系列2",
    "v": 16
}, {
    "x": 105,
    "y": 87,
    "s": "系列2",
    "v": 44
}]`,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击图表时触发该事件",
            enabled: false,
            isIndex: true,
            fields: [
                {field: 'x',variable: '',descr: '横坐标'},
                {field: 'y',variable: '',descr: '纵坐标'},
                {field: 's',variable: '',descr: '系列'},
                {field: 'v',variable: '',descr: '点大小'},
            ]
        }
    },
    option: {
        legend: {
            // data: ['Female', 'Male']
        },
        label: {show: false},
        xAxis: [
            {
                type: 'value',
                // scale: true,
            }
        ],
        yAxis: [
            {
                type: 'value',
                // scale: true,
            }
        ],
        series: [ ]
    },
    symbolSize: 1, //缩小比值
    scale: true
}

export default state