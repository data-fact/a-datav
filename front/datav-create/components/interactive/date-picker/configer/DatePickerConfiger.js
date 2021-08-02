/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/2/2.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Row,Col,Select,Checkbox,Input,Tooltip} from 'antd4'
import QuestionTooltip from "../../../../../lib/mini-components/QuestionTooltip";
const {Option} = Select

export default function DatePickerConfiger(
    {
        type,showTime,timeFormat:storeTimeFormat,format:storeFormat,
        start:storeStart,end:storeEnd,onChange,isTime
    }){

    let [timeFormat,setTimeFormat] = useState('')
    useEffect(() => setTimeFormat(storeTimeFormat),[storeTimeFormat])
    let [format,setFormat] = useState('')
    useEffect(() => setFormat(storeFormat),[storeFormat])
    let [start,setStart] = useState('')
    useEffect(() => setStart(storeStart),[storeStart])
    let [end,setEnd] = useState('')
    useEffect(() => setEnd(storeEnd),[storeEnd])

    return (
        <>
            {
                !isTime &&
                <>
                    <Row style={{marginBottom: 8}}>
                        <Col span={6}>类型</Col>
                        <Col span={18}>
                            <Select
                                style={{width: 100}} value={type}
                                onChange={val => onChange('type',val)}
                            >
                                <Option value="day">日</Option>
                                <Option value="week">周</Option>
                                <Option value="month">月</Option>
                                <Option value="quarter">季度</Option>
                                <Option value="year">年</Option>
                                <Option value="time">时间</Option>
                            </Select>
                        </Col>
                    </Row>
                    {
                        type == 'day' &&
                        <Row style={{marginBottom: 8}}>
                            <Col span={6}></Col>
                            <Col span={8}>
                                <Checkbox
                                    checked={showTime}
                                    onChange={e => onChange('showTime',e.target.checked)}
                                >
                                    时间选择
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Tooltip placement="bottom" title="例: HH:mm:ss">
                                    <Input
                                        disabled={!showTime}
                                        placeholder="时间格式"
                                        value={timeFormat}
                                        onChange={e => setTimeFormat(e.target.value)}
                                        onBlur={e => onChange('timeFormat',e.target.value)}
                                    />
                                </Tooltip>
                            </Col>
                        </Row>
                    }
                </>
            }
            <Row style={{marginBottom: 8}}>
                <Col span={6}>
                    日期格式
                    <QuestionTooltip title={
                        isTime ?
                            <>
                                HH: 时<br/>mm: 分<br/>ss: 秒<br/>a: am/pm
                            </>
                            :
                            <>
                                YYYY: 年<br/>MM: 月<br/>DD: 日<br/>HH: 时<br/>mm: 分<br/>ss: 秒<br/>
                                x: 13位时间戳<br/>X: 10位时间戳<br/>a: am/pm
                            </>
                    }/>
                </Col>
                <Col span={14}>
                    <Input
                        placeholder="YYYY-MM-DD"
                        value={format}
                        onChange={e => setFormat(e.target.value)}
                        onBlur={e => onChange('format',e.target.value)}
                    />
                </Col>
            </Row>
            {/*<Row style={{marginBottom: 8}}>*/}
            {/*    <Col span={6}>可选范围*/}
            {/*        <QuestionTooltip title={<>{'支持日期字符串和时间戳'}<br/>{'可输入{current}取当前时间'}</>}/>*/}
            {/*    </Col>*/}
            {/*    <Col span={14}>*/}
            {/*        <Row>*/}
            {/*            <Col span={6}>开始</Col>*/}
            {/*            <Col span={16}>*/}
            {/*                <Input*/}
            {/*                    placeholder="可选开始日期"*/}
            {/*                    value={start}*/}
            {/*                    onChange={e => setStart(e.target.value)}*/}
            {/*                    onBlur={e => onChange('start',e.target.value)}*/}
            {/*                />*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row>*/}
            {/*            <Col span={6}>结束</Col>*/}
            {/*            <Col span={16}>*/}
            {/*                <Input*/}
            {/*                    placeholder="可选结束日期"*/}
            {/*                    value={end}*/}
            {/*                    onChange={e => setEnd(e.target.value)}*/}
            {/*                    onBlur={e => onChange('end',e.target.value)}*/}
            {/*                />*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </>
    )
}