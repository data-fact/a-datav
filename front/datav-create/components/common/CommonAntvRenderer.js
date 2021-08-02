/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import { useDebounceFn } from 'ahooks';
import React, { useEffect, useState } from 'react';
import themes from "../../common/style/themes";
import useCanvasReducer from "../../reducers/useCanvasReducer";
import { concatColors } from "./echartsUtil";

export default function CommonAntvRenderer({id,option: storeOption,clazz,getInstance}){

    let [option,setOption] = useState(null)
    let [canvas] = useCanvasReducer()
    let {theme,colors} = canvas

    // const ref = useRef();
    // useEffect(() => {
    //     if(ref.current)
    //         getInstance && getInstance(ref.current)
    // }, []);

    const { run:doSetOption } = useDebounceFn((option) => {
        setOption(option)
    },{wait: 500})
    useEffect(() => {
        let {color,_color,seriesField} = storeOption
        if(_color !== false && (!color || Array.isArray(color))){
            color = concatColors(colors,color)
            color = seriesField ? color : color[0]
        }
        doSetOption({...storeOption,color,theme:themes[theme] ? themes[theme].antv() : 'default'})
    },[storeOption,colors,theme])

    if(!option)
        return null

    function handleInit(ref){
        ref && getInstance && getInstance(ref)
    }
    let Clazz = clazz
    return (
        <Clazz {...option} chartRef={handleInit}/>
    )
}