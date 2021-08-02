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
    "x": { map: '', required: true },
    "y": { map: '', required: true },
    "y1": { map: '', required: false },
  },
  _data_default_or: `[
  {
    "x": "01/01",
    "y": 2900, //柱图大小
    "y1": 0 //隐藏区域大小
  },
  {
    "x": "02/01",
    "y": 1200,
    "y1": 1700
  },
  {
    "x": "03/01",
    "y": 300,
    "y1": 1400
  },
  {
    "x": "04/01",
    "y": 200,
    "y1": 1200
  },
  {
    "x": "05/01",
    "y": 900,
    "y1": 300
   },
   {
    "x": "06/01",
    "y": 300,
    "y1": 0
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