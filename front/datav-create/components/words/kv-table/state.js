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
    w: 200,
    h: 240,
    _data_fields_or: {
        "key": {map: '',required: true},
        "value": {map: '',required: true},
    },
    _data_default_or: `[{
    "key": "Edrward 0",
    "value": 32
}, {
    "key": "Edrward 1",
    "value": 32
}, {
    "key": "Edrward 2",
    "value": 32
}, {
    "key": "Edrward 3",
    "value": 32
}, {
    "key": "Edrward 4",
    "value": 32
}]`,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击时触发该事件",
            enabled: false,
            isIndex: true,
            fields: [
                {field: 'key',variable: '',descr: '键'},
                {field: 'value',variable: '',descr: '值'}
            ]
        }
    },
    table: {
        size: 'small',
        borderShow: false,
        borderBottom: {
            show: false,
            width: 1,
            type: 'solid',
            color: '#f0f0f0'
        },
        headerShow: false,
        headerFixed: false,
        headerColor: '#fafafa',
        headerAlign: 'center',
        headerBorderBottom: {
            width: 0,
            type: 'solid',
            color: '#f0f0f0'
        },
        rowNumberShow: false,
        headerFont: {
            fontSize: 16,
            color: '',
            fontFamily: '',
        },
        bodyColors: ['rgba(0,0,0,0)','rgba(0,0,0,0)'],
        bodyFont: {
            fontSize: 14,
            color: 'rgba(255,255,255,1)',
            fontFamily: '',
        }
    },
    columns: [
        // {key,title,dataIndex,width,_show,_color,_fixed,_align}
    ],
    pagination: {
        size: 'default',
        position: ['none','none']
    }
}

export default state