/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/1/20.
 * Description:
 * Modified By:
 */
import common_state from "../../common/common_state";

const state = {
    ...common_state,
    w: 320,
    h: 240,
    color: 'rgba(255,255,255,1)',
    value: `
# Markdown渲染器
<p><font color=#177ddc>可设置字体颜色</font></p>

可获取数据中的值:

text: \$\{data[0].text\}

value: \$\{data[0].value\} 
`,

    _data_fields_or: {
        // "value": {map: '',required: false},
    },
    _data_default_or: `[
    {
        "text": "数据中的文本",
        "value": 12.8
    }
]`,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击时触发该事件",
            enabled: false,
            fields: [
                {field: 'value',variable: '',descr: '文字'}
            ]
        }
    },
}

export default state