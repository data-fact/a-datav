/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import seriesColors from "../../../common/style/series_colors";
import common_state from "../../common/common_state";
let colorKeys = Object.keys(seriesColors)
var colors = [seriesColors[colorKeys[0]].value[0], seriesColors[colorKeys[1]].value[0]];

const state = {
  ...common_state,
  _data_fields_or: {
    "x": { map: '', required: true },
    "y": { map: '', required: true },
    "s": { map: '', required: false },
  },
  _data_default_or: `[
      {
        "x": "2019/01",
        "y": 2.6, 
        "s": "2019 降水量"
      },
      {
        "x": "2019/01",
        "y": 5.9, 
        "s": "2019 降水量"
      },
      {
        "x": "2019/01",
        "y": 9.0, 
        "s": "2019 降水量"
      },
      {
        "x": "2019/01",
        "y": 26.4, 
        "s": "2019 降水量"
      },
      {
        "x": "2019/01",
        "y": 28.7, 
        "s": "2019 降水量"
      },
      {
        "x": "2019/01",
        "y": 70.7, 
        "s": "2019 降水量"
      },
      {
        "x": "2019/01",
        "y": 175.6, 
        "s": "2019 降水量"
      },
      {
        "x": "2019/01",
        "y": 182.2, 
        "s": "2019 降水量"
      },
      {
        "x": "2019/01",
        "y": 48.7, 
        "s": "2019 降水量"
      },
      {
        "x": "2019/01",
        "y": 18.8, 
        "s": "2019 降水量"
      },
      {
        "x": "2019/01",
        "y": 6.0, 
        "s": "2019 降水量"
      },
      {
        "x": "2019/01",
        "y": 2.3,
        "s": "2019 降水量"
      },
      {
        "x": "2020/01",
        "y": 3.9,  
        "s": "2020 降水量"
      },
      {
        "x": "2020/02",
        "y": 5.9,  
        "s": "2020 降水量"
      },
      {
        "x": "2020/03",
        "y": 11.1,  
        "s": "2020 降水量"
      },
      {
        "x": "2020/04",
        "y": 18.7,  
        "s": "2020 降水量"
      },
      {
        "x": "2020/05",
        "y": 48.3,  
        "s": "2020 降水量"
      },
      {
        "x": "2020/06",
        "y": 69.2,  
        "s": "2020 降水量"
      },
      {
        "x": "2020/07",
        "y": 231.6,  
        "s": "2020 降水量"
      },
      {
        "x": "2020/08",
        "y": 46.6,  
        "s": "2020 降水量"
      },
      {
        "x": "2020/09",
        "y": 55.4,  
        "s": "2020 降水量"
      },
      {
        "x": "2020/10",
        "y": 18.4,  
        "s": "2020 降水量"
      },
      {
        "x": "2020/11",
        "y": 10.3,  
        "s": "2020 降水量"
      },
      {
        "x": "2020/12",
        "y": 0.7,
        "s": "2020 降水量"
      }
    ]`,
  _events_or: {
    "click": {
      name: "当点击时",
      descr: "当点击图表时触发该事件",
      enabled: false,
      isIndex: true,
      fields: [
        { field: 'x', variable: '', descr: '类目' },
        { field: 'y', variable: '', descr: '值' },
        { field: 's', variable: '', descr: '系列' }
      ]
    }
  },
  option: {
    color: colors,
    _type: 'line',
    tooltip: {
      trigger: 'none',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: []
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
          lineStyle: {}
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[0]
          }
        },
        data: []
      },
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
          lineStyle: {}
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[1]
          }
        },
        data: []
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [],
    line_series: {
      smooth: false,
      symbol: "circle",
      symbolSize: 14
    }
  }
}

export default state