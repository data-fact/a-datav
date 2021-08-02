/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/30.
 * Description:
 * Modified By:
 */
import { Input } from 'antd4';
import React, { useEffect, useState } from 'react';
export default function AInputNumber({ options = {}, unit = '', value: storeValue, onChange, onBlur }) {
    let [value, setValue] = useState(0)
    useEffect(() => setValue(storeValue), [storeValue])
    function handleChange(e) {
        e.persist()
        let {value} = e.target
        setValue(value)
        onChange && onChange(value ? +value : value)
    }
    function handleBlur(e) {
        e.persist()
        // https://reactjs.org/docs/legacy-event-pooling.html
        let {min,max} = options
        let {value} = e.target
        if(value){
            value = +value
            if(!isNaN(min) && value < min)
                value = +min
            if(!isNaN(max) && value > max)
                value = +max
            onBlur && onBlur(value)
        }else{
            onBlur && onBlur(null)
        }
    }
    return (
        <Input
            {...options}
            value={value}
            type="number"
            suffix={unit}
            onChange={handleChange}
            onBlur={handleBlur}
        />
    )
}