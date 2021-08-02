/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/30.
 * Description:
 * Modified By:
 */
const defaultOption = {
    title: {
        show: false,
        text: '标题'
    },
    grid: {
        // top: 20,
        // right: 20,
        // bottom: 30,
        // left: 40
    },
    label: {
        show: true,
        // position: 'top',
        // fontFamily: '',
        // fontSize: 12,
        // color: 'rgba(255,255,255,1)'
    },
    itemStyle: {
        // borderRadius: 10,
        // borderColor: '#fff',
        borderWidth: 0
    },
    legend: {
        show: false,
        // top: 'top',
        // left: 'center',
        // orient: 'horizontal',
        // itemGap: 10,
        // textStyle: {
        //     fontFamily: '',
        //     fontSize: 12,
        //     color: 'rgba(3,3,3,1)'
        // }
    },
    // xAxis,yAxis,
    series: [
        // {
        //     markLine: {
        //         data: [{type: 'average'}]
        //     }
        // }
    ],
    dataZoom: [
        {
            show: false,
            type: 'slider',
            start: 0,
            end: 100
        }
        // {
        //     type: 'inside'
        // }
    ],
    tooltip: {
        trigger: 'item',
        show: true,
        // textStyle: {
        //     fontFamily: '',
        //     fontSize: 12,
        //     color: 'rgba(255,255,255,1)'
        // },
        // backgroundColor: 'rgba(50,50,50,0.7)',
        // borderColor: '#333',
        // borderWidth: 0,
        // padding: 5
    },
    _axis: {
        "show": true,
        "axisLabel": {
            "show": true
        },
        "axisLine": {
            "show": true,
            "lineStyle": {}
        },
        "axisTick": {
            "show": true,
            "lineStyle": {}
        },
        "splitLine": {
            "show": false,
            "lineStyle": {}
        },
        "name": "",
        "nameTextStyle": {}
    },
    color: [
        // 'rgba(10,115,255,1)',
        // 'rgba(61,171,255,1)',
        // 'rgba(87,205,255,1)',
        // 'rgba(112,222,255,1)',
        // 'rgba(163,246,255,1)',
        // 'rgba(189,253,255,1)',
        // 'rgba(214,255,254,1)'
    ],
    _barBackground: {
        showBackground: false,
        backgroundStyle: {
            color: "rgba(155,155,155,0.2)",
            borderColor: "",
            borderWidth: 0,
        }
    },
}

export default defaultOption