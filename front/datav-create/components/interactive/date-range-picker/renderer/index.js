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
import { CalendarOutlined,ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import useHandleEvent from "../../../../hooks/useHandleEvent";
import useGetColors from "../../../../hooks/useGetColors";
import {DatePicker} from "../../../../../lib/mini-components/date-picker";
import locale from 'antd4/es/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
const { RangePicker } = DatePicker

export default function Renderer({component}) {

    let {
        i: id, _ready, w, _data: data, size, placeholder, defaultValue = [], defaultFirstValue, value = [],
        borderColors, borderType, borderWidth, borderRadius,backgroundColor,
        fontSize, color, spacing, family, align, datePicker
    } = component

    let updateComponent = useUpdateComponent()
    let handleEvent = useHandleEvent()
    let [dataValue,setDataValue] = useState([])

    useEffect(() => {
        let now = new Date().getTime()
        let firstValue = []
        if(defaultFirstValue && data && data[0]){
            firstValue = [data[0]['start'],data[0]['end']]
        }
        let tmpValue0 = value[0] || firstValue[0] || defaultValue[0] || undefined
        let tmpValue1 = value[1] || firstValue[1] || defaultValue[1] || undefined

        tmpValue0 = tmpValue0 && (''+tmpValue0).replace('{current}',now)
        tmpValue1 = tmpValue1 && (''+tmpValue1).replace('{current}',now)
        tmpValue0 = isNaN(tmpValue0) ? tmpValue0 : +tmpValue0
        tmpValue1 = isNaN(tmpValue1) ? tmpValue1 : +tmpValue1
        if(tmpValue0 != undefined)
            tmpValue0 = dayjs(tmpValue0)
        if(tmpValue1 != undefined)
            tmpValue1 = dayjs(tmpValue1)
        setDataValue([tmpValue0,tmpValue1])

    },[defaultFirstValue,data,value,defaultValue])

    // let now = new Date().getTime()
    // let disabledStart = datePicker.start  || ''
    // let disabledEnd = datePicker.end  || ''
    // disabledStart = disabledStart && disabledStart.replace('{current}',''+now)
    // disabledEnd = disabledEnd && disabledEnd.replace('{current}',''+now)

    useEffect(() => {
        //避免显示刷新前保存的值
        updateComponent(id, {value: []})
    }, [])

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

    function handleChange(date,dateStr = []) {
        let start = date && date[0] ? +date[0].format('x') : 0
        let end = date && date[1] ? +date[1].format('x') : 0
        updateComponent(id, {value: [start,end]})
        handleEvent(id, 'change', {
            startTime:start,startDateStr:dateStr[0],
            endTime:end,endDateStr:dateStr[1],
        })
    }
    return (
        <div style={{width: w}} className={'datav-antd-component'}>
            <RangePicker
                size={size}
                placeholder={placeholder}
                locale={locale}
                value={dataValue}
                picker={datePicker.type}
                format={datePicker.format}
                showTime={datePicker.type == 'day' && datePicker.showTime ? {format:datePicker.timeFormat} : false}
                // disabledDate={
                //     disabledStart || disabledEnd ?
                //         current => isDisabledDate(current,disabledStart,disabledEnd):
                //         false
                // }
                style={{
                    ...style,
                    color, fontSize, fontFamily: family,
                    letterSpacing: spacing, textAlign: align,
                    width: '100%',backgroundColor:backgroundColor
                }}
                allowClear={false}
                suffixIcon={
                    datePicker.type == 'time' ?
                        <ClockCircleOutlined style={{color, fontSize}}/>
                        :
                        <CalendarOutlined style={{color, fontSize}}/>
                }
                onChange={handleChange}
            />
        </div>
    )
}

function isDisabledDate(current,start,end) {
    if(start && end)
        return !(dayjs(start).isBefore(current) && dayjs(end).isAfter(current))
    if(start)
        return !dayjs(start).isBefore(current)
    if(end)
        return !dayjs(end).isAfter(current)
}