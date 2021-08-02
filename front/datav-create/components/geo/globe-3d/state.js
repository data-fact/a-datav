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
    w: 800,h: 800,
    _support_children_or: ['hidden&geo&lines'],
    _data_fields_or: {
    },
    _data_default_or: `[]`,
    option: {
        globe: {
            baseTexture: ROOT_PATH + '/images/datav/earth.jpg',

            displacementScale: 0.1,

            light: {

            },
            viewControl: {
                // autoRotate: false
            },
            layers: [ ]
        },
        series: []
    },
    autoRotate: true,
    heightTexture: false,
    nightLayer: false,
    cloudsLayer: false,
    ambientLight: 0.5,
    mainLight: 1,
    globeRadius: 60
}

export default state