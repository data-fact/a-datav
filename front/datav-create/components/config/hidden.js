/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/11/19.
 * Description:
 * Modified By:
 */
import loadable from '@loadable/component'

const hidden = {
    icon: '',
    descr: '',
    children: {
        geo: {
            icon: '',
            descr: '',
            children: {
                visual: {
                    icon: '',
                    descr: '色块图层',
                    configer: loadable(() => import(`../geo/visual/configer`)),
                    renderer: loadable(() => import(`../geo/visual/renderer`))
                },
                lines: {
                    icon: '',
                    descr: '标线图层',
                    configer: loadable(() => import(`../geo/lines/configer`)),
                    renderer: loadable(() => import(`../geo/lines/renderer`))
                }
            }
        },
    }
}
export default hidden