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
    _support_children_or: ['demo&deft&basic2','general&line&basic'],
    _data_fields_or: {
        "x": {map: '',required: true},
        "y": {map: '',required: true},
        "s": {map: '',required: false},
    },
    _data_default_or: `[
        {
            "x": "2010/01/01 00:00:00",
            "y": 500,
            "s": "系列1"
        },
        {
            "x": "2010/01/01 00:00:00",
            "y": 180,
            "s": "系列2"
        },
        {
            "x": "2010/02/01 00:00:00",
            "y": 248,
            "s": "系列1"
        },
        {
            "x": "2010/02/01 00:00:00",
            "y": 100,
            "s": "系列2"
        },
        {
            "x": "2010/03/01 00:00:00",
            "y": 325,
            "s": "系列1"
        },
        {
            "x": "2010/03/01 00:00:00",
            "y": 175,
            "s": "系列2"
        },
        {
            "x": "2010/03/01 00:00:00",
            "y": 275,
            "s": "系列3"
        },
        {
            "x": "2010/04/01 00:00:00",
            "y": 190,
            "s": "系列1"
        },
        {
            "x": "2010/04/01 00:00:00",
            "y": 110,
            "s": "系列2"
        },
        {
            "x": "2010/05/01 00:00:00",
            "y": 260,
            "s": "系列1"
        },
        {
            "x": "2010/05/01 00:00:00",
            "y": 60,
            "s": "系列2"
        }
    ]`,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击图表时触发该事件",
            enabled: false,
            fields: [
                {field: 'x',variable: '',descr: '类目'},
                {field: 'y',variable: '',descr: '值'},
                {field: 's',variable: '',descr: '系列'}
            ]
        }
    },
    option: {
        title: {
            text: '折线图堆叠'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
        },
        grid: {
            left: 10,
            // right: '4%',
            // bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
        },
        yAxis: {
            type: 'value'
        },
        series: [

        ]
    }
}

export default state