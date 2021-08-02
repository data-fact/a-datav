import common_state from "../../common/common_state";

const state = {
  ...common_state,
  _data_fields_or: {
    "x": { map: '', required: true },
    "y": { map: '', required: true },
    "s": { map: '', required: false },
  },
  _data_default_or: `[
  {
    "x": "1月",
    "y": 180,
    "s": "系列1"
  },
  {
    "x": "2月",
    "y": 500,
    "s": "系列1"
  },
  {
    "x": "3月",
    "y": 100,
    "s": "系列1"
  },
  {
    "x": "4月",
    "y": 248,
    "s": "系列1"
  },
  {
    "x": "5月",
    "y": 175,
    "s": "系列1"
  },
  {
    "x": "6月",
    "y": 325,
    "s": "系列1"
  },
  {
    "x": "7月",
    "y": 110,
    "s": "系列1"
  },
  {
    "x": "8月",
    "y": 190,
    "s": "系列1"
  },
  {
    "x": "9月",
    "y": 60,
    "s": "系列1"
  },
  {
    "x": "10月",
    "y": 260,
    "s": "系列1"
  },
  {
    "x": "11月",
    "y": 230,
    "s": "系列1"
  },
  {
    "x": "12月",
    "y": 260,
    "s": "系列1"
  },
    {
    "x": "1月",
    "y": 180,
    "s": "系列2"
  },
  {
    "x": "2月",
    "y": 500,
    "s": "系列2"
  },
  {
    "x": "3月",
    "y": 500,
    "s": "系列2"
  },
  {
    "x": "4月",
    "y": 480,
    "s": "系列2"
  },
  {
    "x": "5月",
    "y": 750,
    "s": "系列2"
  },
  {
    "x": "6月",
    "y": 250,
    "s": "系列2"
  },
  {
    "x": "7月",
    "y": 100,
    "s": "系列2"
  },
  {
    "x": "8月",
    "y": 900,
    "s": "系列2"
  },
  {
    "x": "9月",
    "y": 1500,
    "s": "系列2"
  },
  {
    "x": "10月",
    "y": 1600,
    "s": "系列2"
  },
  {
    "x": "11月",
    "y": 1300,
    "s": "系列2"
  },
  {
    "x": "12月",
    "y": 1600,
    "s": "系列2"
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
    _type: 'bar',
    barWidth: 20,
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value'
    },
    series: []
  }
}

export default state