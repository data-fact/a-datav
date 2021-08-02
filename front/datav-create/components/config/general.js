/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/16.
 * Description:
 * Modified By:
 */
import {
    AreaChartOutlined, BarChartOutlined,
    CompassOutlined,
    DashboardOutlined, DotChartOutlined,
    FieldNumberOutlined, FundOutlined, LineChartOutlined,
    PieChartOutlined,
    RadarChartOutlined
} from '@ant-design/icons';
import loadable from '@loadable/component';

export default {
    icon: BarChartOutlined,
    descr: '常规图表',
    children: {
        bar: {
            icon: BarChartOutlined,
            descr: '柱状图',
            children: {
                basic: {
                    icon: BarChartOutlined,
                    descr: '基本柱图',
                    configer: loadable(() => import(`../bar/basic/configer`)),
                    renderer: loadable(() => import(`../bar/basic/renderer`)),
                    image: 'general/bar-basic.png'
                },
                stack: {
                    icon: BarChartOutlined,
                    descr: '堆叠柱图',
                    configer: loadable(() => import(`../bar/stack/configer`)),
                    renderer: loadable(() => import(`../bar/stack/renderer`)),
                    image: 'general/bar-stack.png'
                },
                waterfall: {
                    icon: BarChartOutlined,
                    descr: '区间柱状图',
                    configer: loadable(() => import(`../bar/waterfall/configer`)),
                    renderer: loadable(() => import(`../bar/waterfall/renderer`)),
                    image: 'general/bar-waterfall.png'
                },
                bar_line: {
                    icon: BarChartOutlined,
                    descr: '柱状折线图',
                    configer: loadable(() => import(`../bar/bar-line/configer`)),
                    renderer: loadable(() => import(`../bar/bar-line/renderer`)),
                    image: 'general/bar-bar-line.png'
                },
                bar_line_doubley: {
                    icon: BarChartOutlined,
                    descr: '双y轴柱状折线图',
                    configer: loadable(() => import(`../bar/bar-line-doubley/configer`)),
                    renderer: loadable(() => import(`../bar/bar-line-doubley/renderer`)),
                    image: 'general/bar-bar-line-doubley.png'
                },
                bar_doubley: {
                    icon: BarChartOutlined,
                    descr: '双y轴柱状图',
                    configer: loadable(() => import(`../bar/bar-doubley/configer`)),
                    renderer: loadable(() => import(`../bar/bar-doubley/renderer`)),
                    image: 'general/bar-bar-doubley.png'
                },
                polar: {
                    icon: PieChartOutlined,
                    descr: '极坐标柱图',
                    configer: loadable(() => import(`../bar/polar/configer`)),
                    renderer: loadable(() => import(`../bar/polar/renderer`)),
                    image: 'general/bar-polar.png'
                },
                polar_stack: {
                    icon: PieChartOutlined,
                    descr: '极坐标堆叠柱图',
                    configer: loadable(() => import(`../bar/polar-stack/configer`)),
                    renderer: loadable(() => import(`../bar/polar-stack/renderer`)),
                    image: 'general/bar-polar-stack.png'
                },
                ring: {
                    icon: PieChartOutlined,
                    descr: '弧形柱图',
                    configer: loadable(() => import(`../bar/ring/configer`)),
                    renderer: loadable(() => import(`../bar/ring/renderer`)),
                    image: 'general/bar-ring.png'
                },
                ring_stack: {
                    icon: PieChartOutlined,
                    descr: '弧形堆叠柱图',
                    configer: loadable(() => import(`../bar/ring-stack/configer`)),
                    renderer: loadable(() => import(`../bar/ring-stack/renderer`)),
                    image: 'general/bar-ring-stack.png'
                },
                capsule: {
                    icon: BarChartOutlined,
                    descr: '胶囊图',
                    configer: loadable(() => import(`../bar/capsule/configer`)),
                    renderer: loadable(() => import(`../bar/capsule/renderer`)),
                    image: 'general/bar-capsule.png'
                },
                bar_broken_line: {
                    icon: BarChartOutlined,
                    descr: '胶囊折线图',
                    configer: loadable(() => import(`../bar/capsule-line/configer`)),
                    renderer: loadable(() => import(`../bar/capsule-line/renderer`)),
                    image: 'general/bar-bar-bubble.png'
                },
                capsule_stack: {
                    icon: BarChartOutlined,
                    descr: '胶囊堆叠图',
                    configer: loadable(() => import(`../bar/capsule-stack/configer`)),
                    renderer: loadable(() => import(`../bar/capsule-stack/renderer`)),
                    image: 'general/bar-capsule-stack.png'
                },
                horizontal_basic: {
                    icon: BarChartOutlined,
                    descr: '基本条形图',
                    configer: loadable(() => import(`../bar/horizontal-basic/configer`)),
                    renderer: loadable(() => import(`../bar/horizontal-basic/renderer`)),
                    image: 'general/bar-horizontal-basic.png'
                },
                horizontal_stack: {
                    icon: BarChartOutlined,
                    descr: '堆叠条形图',
                    configer: loadable(() => import(`../bar/horizontal-stack/configer`)),
                    renderer: loadable(() => import(`../bar/horizontal-stack/renderer`)),
                    image: 'general/bar-horizontal-stack.png'
                },
                horizontal_capsule: {
                    icon: BarChartOutlined,
                    descr: '胶囊条形图',
                    configer: loadable(() => import(`../bar/horizontal-capsule/configer`)),
                    renderer: loadable(() => import(`../bar/horizontal-capsule/renderer`)),
                    image: 'general/bar-horizontal-capsule.png'
                },
                horizontal_capsule_stack: {
                    icon: BarChartOutlined,
                    descr: '胶囊堆叠条形图',
                    configer: loadable(() => import(`../bar/horizontal-capsule-stack/configer`)),
                    renderer: loadable(() => import(`../bar/horizontal-capsule-stack/renderer`)),
                    image: 'general/bar-horizontal-capsule-stack.png'
                }
            }
        },
        line: {
            icon: LineChartOutlined,
            descr: '折线图',
            children: {
                basic: {
                    icon: LineChartOutlined,
                    descr: '基本折线图',
                    configer: loadable(() => import(`../line/basic/configer`)),
                    renderer: loadable(() => import(`../line/basic/renderer`)),
                    image: 'general/line-basic.png'
                },
                area: {
                    icon: AreaChartOutlined,
                    descr: '区域图',
                    configer: loadable(() => import(`../line/area/configer`)),
                    renderer: loadable(() => import(`../line/area/renderer`)),
                    image: 'general/line-area.png'
                },
                line_bar: {
                    icon: LineChartOutlined,
                    descr: '折线柱图',
                    configer: loadable(() => import(`../line/line-bar/configer`)),
                    renderer: loadable(() => import(`../line/line-bar/renderer`)),
                    image: 'general/line-line-bar.png'
                },
                doubley: {
                    icon: LineChartOutlined,
                    descr: '双y轴折线图',
                    configer: loadable(() => import(`../line/doubley/configer`)),
                    renderer: loadable(() => import(`../line/doubley/renderer`)),
                    image: 'general/line-doubley.png'
                },
                line_bar_doubley: {
                    icon: LineChartOutlined,
                    descr: '双y轴折线柱图',
                    configer: loadable(() => import(`../line/line-bar-doubley/configer`)),
                    renderer: loadable(() => import(`../line/line-bar-doubley/renderer`)),
                    image: 'general/line-line-bar-doubley.png'
                },
                area_doubley: {
                    icon: AreaChartOutlined,
                    descr: '双y轴区域图',
                    configer: loadable(() => import(`../line/area-doubley/configer`)),
                    renderer: loadable(() => import(`../line/area-doubley/renderer`)),
                    image: 'general/line-area-doubley.png'
                },
                doublex: {
                    icon: LineChartOutlined,
                    descr: '双x轴折线图',
                    configer: loadable(() => import(`../line/doublex/configer`)),
                    renderer: loadable(() => import(`../line/doublex/renderer`)),
                    image: 'general/line-doublex.png'
                },
            }
        },
        pie: {
            icon: PieChartOutlined,
            descr: '饼图',
            children: {
                basic: {
                    icon: PieChartOutlined,
                    descr: '基本饼图',
                    configer: loadable(() => import(`../pie/basic/configer`)),
                    renderer: loadable(() => import(`../pie/basic/renderer`)),
                    image: 'general/pie-basic.png'
                },
                ring: {
                    icon: PieChartOutlined,
                    descr: '环图',
                    configer: loadable(() => import(`../pie/ring/configer`)),
                    renderer: loadable(() => import(`../pie/ring/renderer`)),
                    image: 'general/pie-ring.png'
                },
                rose: {
                    icon: PieChartOutlined,
                    descr: '玫瑰图',
                    configer: loadable(() => import(`../pie/rose/configer`)),
                    renderer: loadable(() => import(`../pie/rose/renderer`)),
                    image: 'general/pie-rose.png'
                },
                rouse_ring: {
                    icon: PieChartOutlined,
                    descr: '玫瑰环图',
                    configer: loadable(() => import(`../pie/rose-ring/configer`)),
                    renderer: loadable(() => import(`../pie/rose-ring/renderer`)),
                    image: 'general/pie-rose-ring.png'
                }
            }
        },
        scatter: {
            icon: DotChartOutlined,
            descr: '散点图',
            children: {
                basic: {
                    icon: DotChartOutlined,
                    descr: '基本散点图',
                    configer: loadable(() => import(`../scatter/basic/configer`)),
                    renderer: loadable(() => import(`../scatter/basic/renderer`)),
                    image: 'general/scatter-basic.png'
                },
                bubble: {
                    icon: DotChartOutlined,
                    descr: '气泡图',
                    configer: loadable(() => import(`../scatter/bubble/configer`)),
                    renderer: loadable(() => import(`../scatter/bubble/renderer`)),
                    image: 'general/scatter-bubble.png'
                },
            }
        },
        gauge: {
            icon: DashboardOutlined,
            descr: '仪表盘',
            children: {
                basic: {
                    icon: CompassOutlined,
                    descr: '基本仪表盘',
                    configer: loadable(() => import(`../gauge/basic/configer`)),
                    renderer: loadable(() => import(`../gauge/basic/renderer`)),
                    image: 'general/gauge-basic.png'
                }
            }
        },
        single: {
            icon: FieldNumberOutlined,
            descr: '单值图表',
            children: {
                antd_progress: {
                    icon: RadarChartOutlined,
                    descr: '圆形进度条',
                    configer: loadable(() => import(`../single/progress-ring/configer`)),
                    renderer: loadable(() => import(`../single/progress-ring/renderer`)),
                    image: 'general/other-progress-ring.png'
                },
                antd_progress_dashboard: {
                    icon: RadarChartOutlined,
                    descr: '仪表板进度条',
                    configer: loadable(() => import(`../single/progress-dashboard/configer`)),
                    renderer: loadable(() => import(`../single/progress-dashboard/renderer`)),
                    image: 'general/other-progress-dashboard.png'
                },
                antd_progress_line: {
                    icon: RadarChartOutlined,
                    descr: '条形进度条',
                    configer: loadable(() => import(`../single/progress-line/configer`)),
                    renderer: loadable(() => import(`../single/progress-line/renderer`)),
                    image: 'general/other-progress-line.png'
                },
                antd_percent_pond: {
                    icon: RadarChartOutlined,
                    descr: '进度池',
                    configer: loadable(() => import(`../single/percent-pond/configer`)),
                    renderer: loadable(() => import(`../single/percent-pond/renderer`)),
                    image: 'general/other-percent-pond.png'
                }

            }
        },
        other: {
            icon: FundOutlined,
            descr: '其他',
            children: {
                radar_basic: {
                    icon: RadarChartOutlined,
                    descr: '基本雷达图',
                    configer: loadable(() => import(`../other/radar-basic/configer`)),
                    renderer: loadable(() => import(`../other/radar-basic/renderer`)),
                    image: 'general/other-radar-basic.png'
                },
                liquid_fill: {
                    icon: RadarChartOutlined,
                    descr: '水球图',
                    configer: loadable(() => import(`../other/liquid-fill/configer`)),
                    renderer: loadable(() => import(`../other/liquid-fill/renderer`)),
                    image: 'general/other-liquid-fill.png'
                },
                wordcloud: {
                    icon: RadarChartOutlined,
                    descr: '字符云',
                    configer: loadable(() => import(`../other/wordcloud/configer`)),
                    renderer: loadable(() => import(`../other/wordcloud/renderer`)),
                    image: 'general/other-wordcloud.png'
                },
            },
        }
    }
}