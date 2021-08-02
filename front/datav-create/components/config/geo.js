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
import { HeatMapOutlined } from '@ant-design/icons';

const geo = {
    icon: HeatMapOutlined,
    descr: '地理坐标',
    children: {
        deft: {
            icon: HeatMapOutlined,
            descr: '地图',
            children: {
                basic1: {
                    icon: HeatMapOutlined,
                    descr: '矢量地图',
                    configer: loadable(() => import(`../geo/map-vector/configer`)),
                    renderer: loadable(() => import(`../geo/map-vector/renderer`)),
                    image: 'geo/deft-map-vector.png'
                },
                globe_3d: {
                    icon: HeatMapOutlined,
                    descr: '3D地球',
                    configer: loadable(() => import(`../geo/globe-3d/configer`)),
                    renderer: loadable(() => import(`../geo/globe-3d/renderer`)),
                    image: 'geo/deft-globe-3d.png'
                }
            }
        },
    }
}
export default geo