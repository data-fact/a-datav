/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React from 'react'
import general from "./general";
import antv from "./antv";
import word from "./word";
import material from "./material";
import interactive from "./interactive";
import custom from "./custom";
import demo from "./demo";
import geo from "./geo";
import hidden from "./hidden";

export default {
    general: general,
    antv: antv,
    geo: geo,
    word: word,
    material: material,
    interactive: interactive,
    custom: custom,
    demo: demo,

    hidden: hidden //该目录下组件不在列表中显示，可作为子组件使用
}