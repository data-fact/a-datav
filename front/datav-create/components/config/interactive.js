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
import {
    ControlOutlined,SelectOutlined,DownCircleOutlined,CalendarOutlined,CarryOutOutlined,
    InsertRowBelowOutlined,InsertRowRightOutlined,
} from '@ant-design/icons';

export default {
    icon: ControlOutlined,
    descr: '交互',
    children: {
        deft: {
            children: {
                select: {
                    icon: DownCircleOutlined,
                    descr: '筛选框',
                    configer: loadable(() => import(`../interactive/select/configer`)),
                    renderer: loadable(() => import(`../interactive/select/renderer`)),
                },
                button: {
                    icon: SelectOutlined,
                    descr: '按钮',
                    configer: loadable(() => import(`../interactive/button/configer`)),
                    renderer: loadable(() => import(`../interactive/button/renderer`)),
                },
                date_picker: {
                    icon: CalendarOutlined,
                    descr: '日期选择',
                    configer: loadable(() => import(`../interactive/date-picker/configer`)),
                    renderer: loadable(() => import(`../interactive/date-picker/renderer`)),
                },
                date_range_picker: {
                    icon: CarryOutOutlined,
                    descr: '日期范围选择',
                    configer: loadable(() => import(`../interactive/date-range-picker/configer`)),
                    renderer: loadable(() => import(`../interactive/date-range-picker/renderer`)),
                },
                tabs_card: {
                    icon: InsertRowBelowOutlined,
                    descr: '选项卡',
                    configer: loadable(() => import(`../interactive/tabs-card/configer`)),
                    renderer: loadable(() => import(`../interactive/tabs-card/renderer`)),
                },
                tabs_card_vertical: {
                    icon: InsertRowRightOutlined,
                    descr: '竖向选项卡',
                    configer: loadable(() => import(`../interactive/tabs-card-vertical/configer`)),
                    renderer: loadable(() => import(`../interactive/tabs-card-vertical/renderer`)),
                }
            }
        }
    }
}