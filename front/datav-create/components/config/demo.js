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
import {BarChartOutlined, LineChartOutlined, PictureOutlined} from '@ant-design/icons';

const demo = {
    //一级名称和图标
    icon: BarChartOutlined,
    descr: 'demo',
    children: {
        //二级名称和图标，如果是deft，则页面不显示二级
        deft: {
            icon: LineChartOutlined,
            descr: '折线图',
            children: {
                //三级名称和图标，包括具体组件的配置器和渲染器，也可以用图片代替图标，参考其他组件
                background1: {
                    icon: PictureOutlined,
                    descr: '我的背景组件',
                    //我们定制背景组件的配置器，loadable保证组件懒加载，节省带宽
                    configer: loadable(() => import(`../demo/background-demo/Configer`)),
                    //我们定制背景组件的渲染器
                    renderer: loadable(() => import(`../demo/background-demo/Renderer`))
                },
                basic1: {
                    icon: LineChartOutlined,
                    descr: '折线图demo',
                    configer: loadable(() => import(`../demo/general-demo/configer`)),
                    renderer: loadable(() => import(`../demo/general-demo/renderer`))
                },
            }
        },
    }
}
export default demo;