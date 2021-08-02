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
    w: 500,
    h: 60,
    size: 'default',
    indicator: {
        colors: ['',''],
        width: 3
    },
    selectedStyle: {
        backgroundColor: "",
        color: "rgba(255,255,255,1)",
        fontSize: 14,
        fontFamily: '',
        letterSpacing: '',
        borderWidth: 0,
        borderColor: "",
        borderStyle: "solid"
    },
    defaultStyle: {
        minWidth: 160,
        backgroundColor: "",
        color: "rgba(255,255,255,1)",
        fontSize: 10,
        fontFamily: '',
        letterSpacing: '',
        borderWidth: 0,
        borderColor: "",
        borderStyle: "solid"
    },
    _data_fields_or: {
        "key": {map: '',required: true},
        "name": {map: '',required: false},
        "active": {map: '',required: false}
    },
    _data_default_or: `[
        {
            "key": "tab1",
            "name": "标签1"
        },
        {
            //"active": true,   //tab2为选中状态
            "key": "tab2",
            "name": "标签2"
        },
        {
            "key": "tab3",
            "name": "标签3"
        }
    ]`,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击时触发该事件",
            enabled: false,
            isIndex: true,
            fields: [
                {field: 'key',variable: '',descr: '页签key'},
                {field: 'name',variable: '',descr: '页签名称'}
            ]
        }
    },
}

export default state