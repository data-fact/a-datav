/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/11/5.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Button,Row,Col,Slider} from 'antd4'

export default function DataZoom({dataZoom,onChange}){

    let sliderShow = dataZoom[0] && dataZoom[0].show
    let insideShow = dataZoom[1]

    function handleSliderShow(){
        onChange({dataZoom: {0: {show: {$set: !sliderShow}}}})
    }
    function handleInsideShow(){
        if(insideShow)
            onChange({dataZoom: {$set: [dataZoom[0]]}})
        else
            onChange({dataZoom: {$set: [dataZoom[0],{type: 'inside'}]}})
    }
    function handleSliderRangeChange(range) {
        onChange({dataZoom: {0: {
            start: {$set: range[0]},
            end: {$set: range[1]},
        }}})
    }

    return (
        <>
            <div style={{marginBottom: 4}}>
                <Row>
                    <Col span={6}>交互方式</Col>
                    <Col span={18}>
                        <Button
                            type={sliderShow ? 'primary' : 'dashed'} size="small"
                            onClick={handleSliderShow}
                        >缩略轴</Button>
                        <Button
                            type={insideShow ? 'primary' : 'dashed'} size="small"
                            onClick={handleInsideShow}
                        >鼠标滚动</Button>
                    </Col>
                </Row>
            </div>
            {
                sliderShow &&
                <div style={{marginBottom: 4}}>
                    <Row>
                        <Col span={6}>默认范围</Col>
                        <Col span={18}>
                            <Slider
                                style={{margin: 6}}
                                range
                                step={1}
                                min={0}
                                max={100}
                                value={[dataZoom[0].start,dataZoom[0].end]}
                                onChange={handleSliderRangeChange}
                                // onAfterChange={handleSliderRangeBlur}
                            />
                        </Col>
                    </Row>
                </div>
            }
        </>
    )
}