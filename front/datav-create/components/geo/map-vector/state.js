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
    _support_children_or: ['hidden&geo&visual','hidden&geo&lines'],
    _data_fields_or: {
        "region": {map: '',required: false},
    },
    _data_default_or: `[
    //{"region": "china"} //region会覆盖已选择的国家或地区
]`,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击图表时触发该事件",
            enabled: false,
            fields: [
                {field: 'region',variable: '',descr: '国家或地区'},
            ]
        }
    },
    option: {
        "geo": {
            "map": "china",
            roam: false, //开启鼠标缩放平移漫游
            label: {
                show: false, //显示标签
                color: "#fff",
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontFamily: 'sans-serif' ,
                fontSize: 12 ,
            },
            itemStyle: {
                areaColor: 'rgba(255,255,255,0)', //地图区域的颜色
                borderColor: '#00ffff', //图形的描边颜色
                borderWidth: 1.5, //描边线宽
                shadowColor: 'rgba(74,74,74,0.6)', //阴影颜色
                shadowOffsetX: 10, //阴影水平方向上的偏移距离
                shadowOffsetY: 14, //阴影垂直方向上的偏移距离
                shadowBlur: 6, //图形阴影的模糊大小
            },
            // emphasis: {
            //     label: {},
            //     itemStyle: {
            //         areaColor: 'transparent', //悬浮背景
            //         textStyle: {
            //             color: '#fff'
            //         }
            //     }
            // }
        },
        "series": [],
    }
}

export default state