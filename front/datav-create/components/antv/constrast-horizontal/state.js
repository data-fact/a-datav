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
        "y1": {map: '',required: true},
        "y2": {map: '',required: true},
        "s1": {map: '',required: true},
        "s2": {map: '',required: true},
    },
    _data_default_or: `[
  {
    "x": "04/01",
    "y1": 60,
    "y2": 190,
    "s1": "系列1",
    "s2": "系列2"
  },
  {
    "x": "02/01",
    "y1": 80,
    "y2": 248,
    "s1": "系列1",
    "s2": "系列2"
  },
  {
    "x": "05/01",
    "y1": 100,
    "y2": 260,
    "s1": "系列1",
    "s2": "系列2"
  },
  {
    "x": "03/01",
    "y1": 165,
    "y2": 325,
    "s1": "系列1",
    "s2": "系列2"
  },
  {
    "x": "01/01",
    "y1": 180,
    "y2": 500,
    "s1": "系列1",
    "s2": "系列2"
  }
]`,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击图表时触发该事件",
            enabled: false,
            fields: [
                {field: 'x',variable: '',descr: '类目'},
                {field: 'y',variable: '',descr: '值'},
                {field: 's',variable: '',descr: '系列'}
            ]
        }
    },
    option: {
        data: [],
        xField: 'x',
        yField: [],
        xAxis: {
            position: 'bottom',
        },
        interactions: [{ type: 'active-region' }],
        tooltip: {
            shared: true,
            showMarkers: true,
        },
        seriesField: true
    },
    grid: {
        top: 10, right: 30, bottom: 26, left: 30, auto: true
    },
    legend: {
        show: true,
        position: 'bottom',
    },
    label: {
        show: true,
        position: 'middle',
        fontSize: undefined,
        fontFamily: undefined,
        color: undefined
    },
    xAxis: {
        show: true,
        position: 'bottom'
    },
    yAxis: {
        show: true
    },
    color: []
}

export default state