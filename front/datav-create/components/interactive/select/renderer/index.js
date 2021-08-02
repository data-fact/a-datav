/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/15.
 * Description:
 * Modified By:
 */
import React, {useState, useEffect} from 'react'
import {Select} from 'antd4'
import { DownOutlined,UpOutlined } from '@ant-design/icons';
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import useHandleEvent from "../../../../hooks/useHandleEvent";
import useGetColors from "../../../../hooks/useGetColors";

export default function Renderer({component}) {

    let {
        i: id, _ready, w, _data: data, size, placeholder, defaultValue, defaultFirstValue, value,
        borderColors, borderType, borderWidth, borderRadius,backgroundColor,
        fontSize, color, spacing, family, align
    } = component

    let updateComponent = useUpdateComponent()
    let handleEvent = useHandleEvent()
    let [open,setOpen] = useState(false)

    let firstValue = defaultFirstValue && data && data[0] ? data[0]['value'] : undefined

    let dataValue = value || firstValue || defaultValue || undefined

    useEffect(() => {
        //避免显示刷新前保存的值
        updateComponent(id, {value: undefined})
    }, [])

    // useEffect(() => {
    //     handleEvent(id, 'change', {value: dataValue})
    // }, [dataValue])

    let seriesColors = useGetColors()
    let [style, setStyle] = useState({})
    useEffect(() => {
        let newColors = borderColors.filter(c => !!c)
        if (!newColors.length && seriesColors.length) {
            newColors = [seriesColors[0], seriesColors[seriesColors.length - 1]]
        }

        let style = {
            borderStyle: borderType,
            borderColor: newColors[0],
            borderWidth: borderWidth,
            borderRadius: borderRadius,
        }
        if (newColors.length) {
            if (newColors.length <= 1)
                style.borderColor = newColors[0]
            else {
                style.borderImage = `linear-gradient(${newColors[0]}, ${newColors[1]}) ${borderWidth}`
            }
        }

        setStyle(style)
    }, [borderType, borderRadius, borderColors, borderWidth, seriesColors])

    if (!_ready)
        return null

    function handleChange(value,record) {
        updateComponent(id, {value})
        handleEvent(id, 'change', null, record._index)
    }

    data = data.map((d,i) => ({...d, label: d.name, _index: i}))
    return (
        <div style={{width: w}} className={'datav-antd-component'}>
            <Select
                bordered={false}
                style={{
                    ...style,
                    color, fontSize, fontFamily: family,
                    letterSpacing: spacing, textAlign: align,
                    width: '100%',backgroundColor:backgroundColor
                }}
                suffixIcon={
                    open ?
                    <UpOutlined style={{color,fontSize}}/> :
                    <DownOutlined style={{color,fontSize}}/>
                }
                // dropdownClassName='datav-canvas-main'
                size={size}
                placeholder={placeholder}
                value={dataValue}
                options={data}
                onChange={handleChange}
                onDropdownVisibleChange={setOpen}
            />
        </div>
    )
}