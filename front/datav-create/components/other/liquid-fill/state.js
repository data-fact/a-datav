import common_state from "../../common/common_state";
const state = {
  ...common_state,
  w: 300,
  h: 300,
  _data_fields_or: {
    "value": { map: '', required: true },
    "name": { map: '', required: true },
  },
  _data_default_or: `[
      {
        "value": 0.6,
        "name":"value1"
      }
    ]`,
  _events_or: {
    "click": {
      name: "当点击时",
      descr: "当点击图表时触发该事件",
      enabled: false,
      isIndex: true,
      fields: [
        { field: 'value', variable: '', descr: '值' }
      ]
    }
  },

  option: {
    title: {
      text: '标题',
      show: false,
    },
    _color: [],
    series: [{
      data: ['0.6'],
      type: "liquidFill",
      outline: {
        show: true,
        itemStyle: {
          borderWidth: 5,
          borderColor: '#156ACF',
        }
      },
      label: {
        // position: ['38%', '40%'],
        // formatter: function () {
        //   return 'ECharts\nLiquid Fill';
        // },
        show: true,
        fontSize: 40,
        insideColor: ''
      },
      backgroundStyle: {
        borderColor: '',
        borderWidth: 1,
      },
      waveAnimation: true,
      shape: 'circle',
      amplitude: 10,
      radius: '70%',
      color: [],
    }]
  }
}
export default state