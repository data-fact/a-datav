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
    ...common_state,  //继承通用组件状态，包含组件位置、大小、数据等信息
    w: 1000,          //重写组件默认宽度
    h: 600,           //重写组件默认高度
    backgroundColor: 'rgba(21,163,132,1)'  //自定义字段，Configer中对该值的修改会触发Renderer重新渲染
}

export default state;