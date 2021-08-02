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
    "name": { map: '', required: true },
    "value": { map: '', required: true }
  },
  _data_default_or: `[
  {
    "name": "01/01",
    "value": 500
  },
  {
    "name": "02/01",
    "value": 248
  },
  {
    "name": "03/01",
    "value": 325
  },
  {
    "name": "04/01",
    "value": 190
  },
  {
    "name": "05/01",
    "value": 260
  }
]`,
  _events_or: {
    "click": {
      name: "当点击时",
      descr: "当点击图表时触发该事件",
      enabled: false,
      isIndex: true,
      fields: [
        { field: 'name', variable: '', descr: '名称' },
        { field: 'value', variable: '', descr: '值' },
      ]
    }
  },
  option: {
    _labelLine: {
      show: true
    },
    _position: ['50%','50%'],
    series: [
      {
        type: 'pie',
        label: { show: true },
        emphasis: {
          labelLine: { show: false }
        },
        radius: ['0', '70%'],
        data: []
      }
    ]
  }
}

export default state