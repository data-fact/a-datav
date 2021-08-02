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
        "start": {map: '',required: false},
        "end": {map: '',required: false},
    },
    _data_default_or: `[
{
    "start": [121.4648,31.2891],
    "end": [127.9688,45.368]
},
{
    "start": [121.4648,31.2891],
    "end": [110.3467,41.4899]
},
{
    "start": [121.4648,31.2891],
    "end": [125.8154,44.2584]
},{
    "start": [7.32, 9.05],
    "end": [116.404184, 39.914578]
}, {
    "start": [-118.24311, 34.052713],
    "end": [116.404184, 39.914578]
}, {
    "start": [114.195466, 22.282751],
    "end": [116.404184, 39.914578]
}, {
    "start": [-87.801833, 41.870975],
    "end": [116.404184, 39.914578]
}, {
    "start": [-4.62829, 7.72415],
    "end": [116.404184, 39.914578]
}, {
    "start": [-1.657222, 51.886863],
    "end": [116.404184, 39.914578]
}, {
    "start": [10.01959, 54.38474],
    "end": [116.404184, 39.914578]
}, {
    "start": [45.326912, 41.101891],
    "end": [116.404184, 39.914578]
}, {
    "start": [89.116876, 67.757906],
    "end": [116.404184, 39.914578]
}, {
    "start": [-47.55, -15.47],
    "end": [116.404184, 39.914578]
}, {
    "start": [31.815593, 31.418032],
    "end": [116.404184, 39.914578]
}, {
    "start": [2.175129, 41.385064],
    "end": [116.404184, 39.914578]
}, {
    "start": [104.88659, 11.545469],
    "end": [116.404184, 39.914578]
}, {
    "start": [9.189948, 45.46623],
    "end": [116.404184, 39.914578]
}, {
    "start": [-56.162231, -34.901113],
    "end": [116.404184, 39.914578]
}, {
    "start": [32.608571, -25.893473],
    "end": [116.404184, 39.914578]
}, {
    "start": [3.054275, 36.753027],
    "end": [116.404184, 39.914578]
}, {
    "start": [55.269441, 25.204514],
    "end": [116.404184, 39.914578]
}, {
    "start": [17.108519, 48.179162],
    "end": [116.404184, 39.914578]
}, {
    "start": [150.993137, -33.675509],
    "end": [116.404184, 39.914578]
}, {
    "start": [-121.910642, 41.38028],
    "end": [116.404184, 39.914578]
}, {
    "start": [144.999416, -37.781726],
    "end": [116.404184, 39.914578]
}, {
    "start": [-99.1, 19.2],
    "end": [116.404184, 39.914578]
}, {
    "start": [-123.023921, 49.311753],
    "end": [116.404184, 39.914578]
}]`,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击飞线时触发该事件",
            enabled: false,
            isIndex: true,
            fields: [
                {field: 'start',variable: '',descr: '起始点经纬度'},
                {field: 'end',variable: '',descr: '终止点经纬度'},
            ]
        }
    },
    option: {
        type: 'lines',
        zlevel: 2,
        symbol: 'none',
        symbolSize: 5,
        effect: {
            show: true, //是否显示特效
            color: '', //特效标记的颜色
            period: 4, //箭头指向速度，值越小速度越快
            trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'arrow', //箭头图标 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
            symbolSize: 5, //图标大小
        },
        lineStyle: {
            color: '', //线的颜色
            type: 'solid', //线的类型
            width: 0.1, //尾迹线条宽度
            curveness: 0.3, //尾迹线条曲直度
            shadowColor: '#00ffff', //阴影颜色
            shadowOffsetX: 0, //阴影水平方向上的偏移距离
            shadowOffsetY: 4, //阴影垂直方向上的偏移距离
            shadowBlur: 10, //图形阴影的模糊大小
        },
        data: []
    }
}

export default state