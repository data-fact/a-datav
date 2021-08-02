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
import {BACKGROUND_TYPE, GRADIENT_TYPE} from "../../../common/constant";

export const ICON_TYPE = {
    DEFAULT: 1,
    CUSTOM: 2
}
const state = {
    ...common_state,
    w: 100, h: 100,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击时触发该事件",
            enabled: false,
            fields: [ ]
        }
    },
    fontSize: 30,
    color: '',
    type: ICON_TYPE.DEFAULT,
    icon: 'RiseOutlined',
    iconText: 'RiseOutlined'
}

export default state