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
import { FontSizeOutlined,HistoryOutlined,TableOutlined,FundOutlined,ProfileOutlined,FileMarkdownOutlined } from '@ant-design/icons';

export default {
    icon: FontSizeOutlined,
    descr: '文字',
    children: {
        deft: {
            children: {
                text: {
                    icon: FontSizeOutlined,
                    descr: '文字',
                    configer: loadable(() => import(`../words/text/configer`)),
                    renderer: loadable(() => import(`../words/text/renderer`))
                },
                timer: {
                    icon: HistoryOutlined,
                    descr: '时间器',
                    configer: loadable(() => import(`../words/timer/configer`)),
                    renderer: loadable(() => import(`../words/timer/renderer`))
                },
                statistic: {
                    icon: FundOutlined,
                    descr: '指标卡',
                    configer: loadable(() => import(`../words/statistic/configer`)),
                    renderer: loadable(() => import(`../words/statistic/renderer`))
                },
                table: {
                    icon: TableOutlined,
                    descr: '表格',
                    configer: loadable(() => import(`../words/table/configer`)),
                    renderer: loadable(() => import(`../words/table/renderer`))
                },
                kv_table: {
                    icon: ProfileOutlined,
                    descr: '键值列表',
                    configer: loadable(() => import(`../words/kv-table/configer`)),
                    renderer: loadable(() => import(`../words/kv-table/renderer`))
                },
                markdown: {
                    icon: FileMarkdownOutlined,
                    descr: 'Markdown',
                    configer: loadable(() => import(`../words/markdown/configer`)),
                    renderer: loadable(() => import(`../words/markdown/renderer`))
                }
            }
        }
    }
}