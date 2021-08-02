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
import { SlackOutlined,BlockOutlined,ExpandOutlined,BgColorsOutlined,PictureOutlined,InfoOutlined } from '@ant-design/icons';

export default {
    icon: SlackOutlined,
    descr: '素材',
    children: {
        deft: {
            children: {
                border_basic: {
                    icon: ExpandOutlined,
                    descr: '基本边框',
                    configer: loadable(() => import(`../material/border/configer`)),
                    renderer: loadable(() => import(`../material/border/renderer`)),
                },
                border: {
                    icon: BlockOutlined,
                    descr: '美化边框',
                    configer: loadable(() => import(`../material/border-beauty/configer`)),
                    renderer: loadable(() => import(`../material/border-beauty/renderer`)),
                },
                decorate: {
                    icon: BgColorsOutlined,
                    descr: '装饰',
                    configer: loadable(() => import(`../material/decorate/configer`)),
                    renderer: loadable(() => import(`../material/decorate/renderer`)),
                },
                background: {
                    icon: PictureOutlined,
                    descr: '背景块',
                    configer: loadable(() => import(`../material/background/configer`)),
                    renderer: loadable(() => import(`../material/background/renderer`)),
                },
                icons: {
                    icon: InfoOutlined,
                    descr: '图标',
                    configer: loadable(() => import(`../material/icons/configer`)),
                    renderer: loadable(() => import(`../material/icons/renderer`)),
                }
            }
        }
    }
}