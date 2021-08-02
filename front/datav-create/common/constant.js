/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
export const AND_JOINER = '&'
export const ARROW_JOINER = '->'
export const IMAGE_PATH = '../../images/components'
export const UNSUPPORT_COLOR_DESCR = '该组件不支持美化工具箱-图表系列色配置'

//组件变量类型
export const VARIABLE_TYPE = {
    'data': 'data',
    'filter': 'filter'
}

//背景类型
export const BACKGROUND_TYPE = {
    'color': 'color',
    'image': 'image',
    'gradient': 'gradient' //渐变
}

//渐变
export const GRADIENT_TYPE = {
    'linear': 'linear',
    'radial': 'radial'
}

//缩放方式类型
export const SCALE_TYPE = {
    'full': 'full',        //全屏铺满
    'width': 'width',      //等比缩放宽度铺满
    'height': 'height',    //等比缩放高度铺满
    'height1': 'height1',  //等比缩放高度铺满(可滚动)
    'none': 'none'         //不缩放
}

//滤镜
export const STYLE_FILTER_TYPE = {
    'invert': 'invert',         //颜色反转
    'brightness': 'brightness', //量度
    'contrast': 'contrast',     //对比度
    // 'hue-rotate': 'hue-rotate', //色相
    'opacity': 'opacity',       //透明度
    'saturate': 'saturate',     //饱和度
    'grayscale': 'grayscale',   //灰度
    'sepia': 'sepia'            //褐度
}

//显示隐藏
export const SHOW_HIDE_TYPE = {
    'show': 1,          //显示
    'hide': 0,          //隐藏
    'custom': 2,        //自定义，绑定全局变量
}

//背景图平铺
export const BACKGROUND_REPEAT_TYPE = {
    'adapt': 1,         //自适应
    'repeat': 2,        //平铺
    'noRepeat': 3,      //不平铺
}

//格式化字符串描述
export const FORMATTER_TEXT = {
    default: `支持{}取值
            {a}：系列名
            {b}：数据名
            {c}：数据值
            {d}：百分比(饼图)
            \\n：换行
            例：{b} \\n {c}`,
    value: `支持{}取值
            {value}：数据值
            \\n：换行
            例：{value}%`
}