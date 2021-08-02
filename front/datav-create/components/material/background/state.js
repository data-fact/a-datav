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
import {BACKGROUND_REPEAT_TYPE, BACKGROUND_TYPE, GRADIENT_TYPE} from "../../../common/constant";

const state = {
    ...common_state,
    _z_index: 10,
    _events_or: {
        "click": {
            name: "当点击时",
            descr: "当点击时触发该事件",
            enabled: false,
            fields: [ ]
        }
    },
    bgType: BACKGROUND_TYPE.gradient,
    gradient: {
        type: GRADIENT_TYPE.linear,
        angle: 0,
        colors: ['rgba(61,171,255,1)','rgba(61,171,255,0)']
    },
    color: 'rgba(61,171,255,1)',
    image: '',
    borderRadius: 50,
    repeatType: BACKGROUND_REPEAT_TYPE.adapt
}

export default state