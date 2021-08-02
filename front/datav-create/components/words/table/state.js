/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/15.
 * Description:
 * Modified By:
 */
import common_state from "../../common/common_state";

const state = {
    ...common_state,
    w: 800,
    h: 580,
    _data_fields_or: {
        // "value": {map: '',required: false},
    },
    _data_default_or: `[{
    "name": "Edrward 0",
    "age": 32,
    "address": "London Park no. 0"
}, {
    "name": "Edrward 1",
    "age": 32,
    "address": "London Park no. 1"
}, {
    "name": "Edrward 2",
    "age": 32,
    "address": "London Park no. 2"
}, {
    "name": "Edrward 3",
    "age": 32,
    "address": "London Park no. 3"
}, {
    "name": "Edrward 4",
    "age": 32,
    "address": "London Park no. 4"
}, {
    "name": "Edrward 5",
    "age": 32,
    "address": "London Park no. 5"
}, {
    "name": "Edrward 6",
    "age": 32,
    "address": "London Park no. 6"
}, {
    "name": "Edrward 7",
    "age": 32,
    "address": "London Park no. 7"
}, {
    "name": "Edrward 8",
    "age": 32,
    "address": "London Park no. 8"
}, {
    "name": "Edrward 9",
    "age": 32,
    "address": "London Park no. 9"
}, {
    "name": "Edrward 10",
    "age": 32,
    "address": "London Park no. 10"
}, {
    "name": "Edrward 11",
    "age": 32,
    "address": "London Park no. 11"
}, {
    "name": "Edrward 12",
    "age": 32,
    "address": "London Park no. 12"
}, {
    "name": "Edrward 13",
    "age": 32,
    "address": "London Park no. 13"
}, {
    "key": "14",
    "name": "Edrward 14",
    "age": 32,
    "address": "London Park no. 14"
}, {
    "name": "Edrward 15",
    "age": 32,
    "address": "London Park no. 15"
}]`,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击时触发该事件",
            enabled: false,
            isIndex: true,
            fields: [
                // {field: '_row',variable: '',descr: '行'}
            ]
        }
    },
    table: {
        size: 'middle',
        borderShow: false,
        borderBottom: {
            show: true,
            width: 1,
            type: 'solid',
            color: '#f0f0f0'
        },
        headerShow: true,
        headerFixed: true,
        headerColor: '#fafafa',
        headerAlign: 'center',
        headerBorderBottom: {
            width: 1,
            type: 'solid',
            color: '#f0f0f0'
        },
        rowNumberShow: false,
        headerFont: {
            fontSize: 16,
            color: '',
            fontFamily: '',
        },
        bodyColors: ['rgba(255,255,255,1)','rgba(255,255,255,1)'],
        bodyFont: {
            fontSize: 14,
            color: '',
            fontFamily: '',
        }
    },
    columns: [
        // {key,title,dataIndex,width,_show,_color,_fixed,_align}
    ],
    pagination: {
        size: 'default',
        position: ['none','bottomRight']
    }
}

export default state