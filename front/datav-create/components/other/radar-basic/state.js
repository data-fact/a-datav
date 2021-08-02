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
    },
    _data_default_or: `[
      {
        "x": "01/01",
        "y": 500,
        "s": "系列1"
      },
      {
        "x": "01/01",
        "y": 180,
        "s": "系列2"
      },
      {
        "x": "02/01",
        "y": 248,
        "s": "系列1"
      },
      {
        "x": "02/01",
        "y": 100,
        "s": "系列2"
      },
      {
        "x": "03/01",
        "y": 325,
        "s": "系列1"
      },
      {
        "x": "03/01",
        "y": 175,
        "s": "系列2"
      },
      {
        "x": "04/01",
        "y": 190,
        "s": "系列1"
      },
      {
        "x": "04/01",
        "y": 110,
        "s": "系列2"
      },
      {
        "x": "05/01",
        "y": 260,
        "s": "系列1"
      },
      {
        "x": "05/01",
        "y": 60,
        "s": "系列2"
      }
    ]`,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击图表时触发该事件",
            enabled: false,
            fields: [
                {field: 'name',variable: '',descr: '名称'},
                {field: 'values',variable: '',descr: '值列表'}
            ]
        }
    },
    option: {
        label: {show: false},
        radar: {
            show: true,
            // shape: 'circle',
            name: {
                show: true
                // textStyle: {
                //     color: '#fff',
                //     backgroundColor: '#999',
                //     borderRadius: 3,
                //     padding: [3, 5]
                // }
            },
            indicator: []
        },
        series: [{
            symbolSize: 0,
            type: 'radar',
            data: []
        }]
    }
}

export default state