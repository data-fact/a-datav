/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/16.
 * Description:
 * Modified By:
 */
import loadable from '@loadable/component'
import { ExperimentOutlined } from '@ant-design/icons';

export default {
    icon: ExperimentOutlined,
    descr: '自定义图表',
    children: {
        deft: {
            children: {
                echarts: {
                    icon: ExperimentOutlined,
                    descr: '自定义echarts图',
                    configer: loadable(() => import(`../custom-echarts/configer`)),
                    renderer: loadable(() => import(`../custom-echarts/renderer`))
                }
            }
        }
    }
}