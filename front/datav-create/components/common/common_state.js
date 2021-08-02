/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description: 组件依赖的通用state，以 _or 结尾的字段可被组件覆盖
 * Modified By:
 */
import {SHOW_HIDE_TYPE} from "../../common/constant";

export default {
    // i: '',
    // _typeId: '',
    // _typeName: '',
    // _typeNav,
    // _name: '',
    // _descr: '',
    // _parent_id: '',      //父组件id，若不为空，则不在画布渲染该组件
    _child_ids: {},         //子组件id列表,key为组件类型，value为{enabled: false,id: ''}
    _theme: 'default',
    _ready: true,
    _show: SHOW_HIDE_TYPE.show,
    _show_var: undefined,                    //当_show值为SHOW_HIDE_TYPE.custom时生效，显示隐藏状态绑定到该全局变量
    _show_eval: 'return !!value;',    //当_show值为SHOW_HIDE_TYPE.custom时生效，执行该表达式，结果为true显示，否则隐藏
    _mark_color: '',        //组件标记颜色
    _z_index: 100,
    _rotate_x: 0,
    _rotate_y: 0,
    _rotate_z: 0,
    //滤镜
    _style_filters: [
        // {
        //     type: STYLE_FILTER_TYPE.invert,
        //     persent: 0
        // }
    ],
    w: 400,
    h: 300,
    x: 100,
    y: 100,

    //以 _or 结尾的属性可被组件覆盖
    _data_fields_or: {   //数据字段列表，如果组件需要数据中有固定字段名，用字段名列表覆盖此字段
        // "aaa": {map: '', required: false}    //map: 映射字段名，required: false 非必选，status: 1:匹配成功,2:匹配失败,3:非必选
    },
    _data_default_or: '[]', //默认数据，如果组件有默认静态数据，覆盖此字段, 值为json字符串
    _events_or: {         //交互事件配置
        // "click": {
        //     name: "当点击时",
        //     descr: "当点击图表的系列时触发该事件",
        //     enabled: false,
        //     fields: [
        //         {field: 'aaa',variable: '',descr: '字段描述',custom: false}
        //     ],
        //     exec: {enabled: false, code: ''}
        // }
    },
    _support_children_or: [],  //支持的子组件类型列表

    _variables: {    //组件变量
        // "aaa": {value: '',type: VARIABLE_TYPE.data} //组件变量类型：data:数据重新加载，filter:不重新加载数据但重新执行过滤器
    },
    _data: [],
    _data_cache: [],
    _data_status: 1, //数据加载状态 1:成功，2:失败，3:加载中
    _data_filters: [],
    _data_type: 'static',
    //数据源配置，新加数据源需要满足规范：key为 _data_ + ${_data_type}
    _data_static: {
        data: ''
    },
    _data_api: {
        method: 'POST',
        url: '',
        params: [
            // {
            //     name: '',
            //     value: '',
            //     descr: ''
            // }
        ],
        body: '{}',
        show_loading: true, //是否显示加载中状态
    },
}

export const hideAttrs = {
    i: '',
    _typeId: '',
    _typeName: '',
    _typeNav: '',
    _name: '',
    _descr: '',
    _parent_id: '',      //父组件id，若不为空，则不在画布渲染该组件
}