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
import { AntDesignOutlined } from '@ant-design/icons';
import {UNSUPPORT_COLOR_DESCR} from "../../common/constant";

export default {
    icon: AntDesignOutlined,
    descr: 'antv图表',
    children: {
        deft: {
            children: {
                bullet_horizontal: {
                    icon: AntDesignOutlined,
                    descr: '水平子弹图',
                    configer: loadable(() => import(`../antv/bullet-horizontal/configer`)),
                    renderer: loadable(() => import(`../antv/bullet-horizontal/renderer`)),
                    image: 'antv/bullet-horizontal.png'
                },
                bullet_vertical: {
                    icon: AntDesignOutlined,
                    descr: '竖直子弹图',
                    configer: loadable(() => import(`../antv/bullet-vertical/configer`)),
                    renderer: loadable(() => import(`../antv/bullet-vertical/renderer`)),
                    image: 'antv/bullet-vertical.png'
                },
                waterfall: {
                    icon: AntDesignOutlined,
                    descr: '瀑布图',
                    configer: loadable(() => import(`../antv/waterfall/configer`)),
                    renderer: loadable(() => import(`../antv/waterfall/renderer`)),
                    tooltip: UNSUPPORT_COLOR_DESCR,
                    image: 'antv/waterfall.png'
                },
                tiny_line: {
                    icon: AntDesignOutlined,
                    descr: '迷你折线图',
                    configer: loadable(() => import(`../antv/tiny-line/configer`)),
                    renderer: loadable(() => import(`../antv/tiny-line/renderer`)),
                    image: 'antv/tiny-line.png'
                },
                tiny_area: {
                    icon: AntDesignOutlined,
                    descr: '迷你面积图',
                    configer: loadable(() => import(`../antv/tiny-area/configer`)),
                    renderer: loadable(() => import(`../antv/tiny-area/renderer`)),
                    image: 'antv/tiny-area.png'
                },
                tiny_bar: {
                    icon: AntDesignOutlined,
                    descr: '迷你柱状图',
                    configer: loadable(() => import(`../antv/tiny-bar/configer`)),
                    renderer: loadable(() => import(`../antv/tiny-bar/renderer`)),
                    image: 'antv/tiny-bar.png'
                },
                progress: {
                    icon: AntDesignOutlined,
                    descr: '进度条图',
                    configer: loadable(() => import(`../antv/progress/configer`)),
                    renderer: loadable(() => import(`../antv/progress/renderer`)),
                    image: 'antv/progress.png'
                },
                ring_progress: {
                    icon: AntDesignOutlined,
                    descr: '进度环图',
                    configer: loadable(() => import(`../antv/ring-progress/configer`)),
                    renderer: loadable(() => import(`../antv/ring-progress/renderer`)),
                    image: 'antv/ring-progress.png'
                },
                constrast_horizontal: {
                    icon: AntDesignOutlined,
                    descr: '水平对比图',
                    configer: loadable(() => import(`../antv/constrast-horizontal/configer`)),
                    renderer: loadable(() => import(`../antv/constrast-horizontal/renderer`)),
                    image: 'antv/constrast-horizontal.png'
                },
                constrast_vertical: {
                    icon: AntDesignOutlined,
                    descr: '竖直对比图',
                    configer: loadable(() => import(`../antv/constrast-vertical/configer`)),
                    renderer: loadable(() => import(`../antv/constrast-vertical/renderer`)),
                    image: 'antv/constrast-vertical.png'
                },
            }
        }
    }
}