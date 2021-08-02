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
import {SHOW_HIDE_TYPE} from "../../../common/constant";

const state = {
    ...common_state,
    _show: SHOW_HIDE_TYPE.hide,
    _data_fields_or: {
        "name": {map: '',required: true},
        "value": {map: '',required: true},
    },
    _data_default_or: `[
  {
    "name": "南海诸岛",
    "value": 0
  },
  {
    "name": "北京",
    "value": 54
  },
  {
    "name": "天津",
    "value": 13
  },
  {
    "name": "上海",
    "value": 40
  },
  {
    "name": "重庆",
    "value": 75
  },
  {
    "name": "河北",
    "value": 13
  },
  {
    "name": "河南",
    "value": 83
  },
  {
    "name": "云南",
    "value": 11
  },
  {
    "name": "辽宁",
    "value": 19
  },
  {
    "name": "黑龙江",
    "value": 15
  },
  {
    "name": "湖南",
    "value": 69
  },
  {
    "name": "安徽",
    "value": 60
  },
  {
    "name": "山东",
    "value": 39
  },
  {
    "name": "新疆",
    "value": 4
  },
  {
    "name": "江苏",
    "value": 31
  },
  {
    "name": "浙江",
    "value": 104
  },
  {
    "name": "江西",
    "value": 36
  },
  {
    "name": "湖北",
    "value": 1052
  },
  {
    "name": "广西",
    "value": 33
  },
  {
    "name": "甘肃",
    "value": 7
  },
  {
    "name": "山西",
    "value": 9
  },
  {
    "name": "内蒙古",
    "value": 7
  },
  {
    "name": "陕西",
    "value": 22
  },
  {
    "name": "吉林",
    "value": 4
  },
  {
    "name": "福建",
    "value": 18
  },
  {
    "name": "贵州",
    "value": 5
  },
  {
    "name": "广东",
    "value": 98
  },
  {
    "name": "青海",
    "value": 1
  },
  {
    "name": "西藏",
    "value": 0
  },
  {
    "name": "四川",
    "value": 44
  },
  {
    "name": "宁夏",
    "value": 4
  },
  {
    "name": "海南",
    "value": 22
  },
  {
    "name": "台湾",
    "value": 3
  },
  {
    "name": "香港",
    "value": 5
  },
  {
    "name": "澳门",
    "value": 5
  }
]`,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击色块图层时触发该事件",
            enabled: false,
            isIndex: true,
            fields: [
                {field: 'name',variable: '',descr: '国家或地区'},
                {field: 'value',variable: '',descr: '值'},
            ]
        }
    },
    option: {
        type: 'map',
        map: 'china',
        show: false, //是否显示visualMap
        // geoIndex:0,
        colors: [],
        data: [],
        // zoom: 1.1
    },
    subIndex: 0
}

export default state