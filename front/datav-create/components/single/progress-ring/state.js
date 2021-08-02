import common_state from "../../common/common_state";

const state = {
  ...common_state,
  line_size: 6,
  w:300,
  h:300,
  formatter: '{value}%',
  color: 'rgba(255,255,255,1)',
  noFinishColor: 'rgba(255,255,255,1)',
  colors: ['', ''],
  showText: false,
  _theme: 'default',
  _data_fields_or: {
    "value": { map: '', required: true },
  },
  _data_default_or: `[
    {
        "value": 0.7
    }
]`,
  _events_or: {
    "click": {
      name: "当点击时",
      descr: "当点击时触发该事件",
      enabled: false,
      fields: [
        { field: 'value', variable: '', descr: '值' }
      ]
    }
  },
}

export default state