import common_state from "../../common/common_state";
const state = {
    ...common_state,
    border_width: 6,
    border_radius:5,
    border_gap:3,
    line_space:1,
    line_width:5,
    text_color: '#ffffff',
    colors: ['', ''],
    w: 200,
    h: 100,
    _theme: 'default',
    _data_fields_or: {
        "value": { map: '', required: true },
    },
    _data_default_or: `[
        {
            "value": 0.6
        }
    ]`,
    text_color_show:true,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击时触发该事件",
            enabled: false,
            fields: [
                { field: 'value', variable: '', descr: '值' }
            ]
        }
    },
}

export default state