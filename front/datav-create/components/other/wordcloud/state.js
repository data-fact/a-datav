import common_state from "../../common/common_state";
const state = {
    ...common_state,
    w: 400,
    h: 300,
    _data_fields_or: {
        "value": { map: '', required: true },
        "name": { map: '', required: true },
    },
    _data_default_or: `[
      {
          "name": "汽车",
          "value": 928
      },
      {
          "name": "视频",
          "value": 906
      },
      {
          "name": "电视",
          "value": 825
      },
      {
          "name": "Lover Boy 88",
          "value": 514
      },
      {
          "name": "动漫",
          "value": 486
      },
      {
          "name": "音乐",
          "value": 53
      },
      {
          "name": "直播",
          "value": 163
      },
      {
          "name": "广播电台",
          "value": 86
      },
      {
          "name": "戏曲曲艺",
          "value": 17
      },
      {
          "name": "演出票务",
          "value": 6
      },
      {
          "name": "资讯",
          "value": 1437
      },
      {
          "name": "商业财经",
          "value": 422
      },
      {
          "name": "娱乐八卦",
          "value": 353
      },
      {
          "name": "军事",
          "value": 331
      },
      {
          "name": "科技资讯",
          "value": 313
      },
      {
          "name": "社会时政",
          "value": 307
      },
      {
          "name": "时尚",
          "value": 43
      },
      {
          "name": "网络奇闻",
          "value": 15
      },
      {
          "name": "旅游出行",
          "value": 438
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
            type: 'wordCloud',
            textStyle: {
                fontFamily: '',
                // color: (e) => {
                //     return 'rgb(' + [
                //         Math.round(Math.random() * 160),
                //         Math.round(Math.random() * 160),
                //         Math.round(Math.random() * 160)
                //     ].join(',') + ')';
                // }
            },
            //  网格大小，各项之间间距
            gridSize: 20,
            // 形状 circle 圆，cardioid  心， diamond 菱形，
            // triangle-forward 、triangle 三角，star五角星
            shape: 'rect',
            // 字体大小范围
            sizeRange: [10, 50],
            // 文字旋转角度范围
            rotationRange: [0, 0],
            data: [
              
            ]
        }]
    }
}
export default state