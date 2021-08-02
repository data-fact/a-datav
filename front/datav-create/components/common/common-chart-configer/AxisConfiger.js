/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/29.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Radio,Tabs} from 'antd4'
import CategoryAxis from "./base/CategoryAxis";
import RadialAxis from "./base/RadialAxis";
import ValueAxis from "./base/ValueAxis";
import RadarAxis from "./base/RadarAxis";
import GaugeAxis from "./base/GaugeAxis";

const {TabPane} = Tabs

export default function AxisConfiger({xAxis,yAxis,gaugeAxis,series,polar,angleAxis,radiusAxis,radar,guid,onChange}){

    function handleXAxisChange(i,key,value) {
        onChange({xAxis: {[i]: {[key]: {$set: value}}}})
    }
    function handleYAxisChange(i,key,value) {
        onChange({yAxis: {[i]: {[key]: {$set: value}}}})
    }
    function handleRadialAxisChange(radius) {
        onChange({series: {0: {radius: {$set: radius}}}})
    }
    function handlePolarChange(radius) {
        onChange({polar: {radius: {$set: radius}}})
    }
    function handleAngleChange(key,value) {
        onChange({angleAxis: {[key]: {$set: value}}})
    }
    function handleRadiusChange(key,value) {
        onChange({radiusAxis: {[key]: {$set: value}}})
    }
    function handleRadarChange(key,value) {
        onChange({radar: {[key]: {$set: value}}})
    }
    function handleGaugeAxisChange(key,value) {
        onChange({gaugeAxis: {[key]: {$set: value}}})
    }

    return (
        <div className={'common-chart-configer-axis'}>
            <Tabs size="small" type="card">
                {
                    Array.isArray(xAxis) && xAxis.map((x,i) => (
                        <TabPane tab={`x${i ? ''+i : ''}轴`} key={'x'+i}>
                            {
                                !x.type || x.type == 'category' ?
                                    <CategoryAxis
                                        axis={x}
                                        onChange={(key,value) => handleXAxisChange(i,key,value)}
                                    /> :
                                    <ValueAxis
                                        axis={x}
                                        onChange={(key,value) => handleXAxisChange(i,key,value)}
                                    />
                            }
                        </TabPane>
                    ))
                }
                {
                    Array.isArray(yAxis) && yAxis.map((y,i) => (
                        <TabPane tab={`y${i ? ''+i : ''}轴`} key={'y'+i}>
                            {
                                !y.type || y.type == 'value' ?
                                    <ValueAxis
                                        axis={y}
                                        onChange={(key,value) => handleYAxisChange(i,key,value)}
                                    /> :
                                    <CategoryAxis
                                        axis={y}
                                        onChange={(key,value) => handleYAxisChange(i,key,value)}
                                    />
                            }
                        </TabPane>
                    ))
                }
                {
                    guid.isPie &&
                    <TabPane tab="径向轴" key="radial">
                        <RadialAxis
                            radius={series[0].radius}
                            onChange={handleRadialAxisChange}
                        />
                    </TabPane>
                }
                {
                    !!polar &&
                    <TabPane tab="极坐标轴" key="polar">
                        <RadialAxis
                            radius={polar.radius}
                            onChange={handlePolarChange}
                        />
                    </TabPane>
                }
                {
                    !!angleAxis &&
                    <TabPane tab="角度轴" key="angle">
                        {
                            !angleAxis.type || angleAxis.type == 'value' ?
                                <ValueAxis
                                    axis={angleAxis}
                                    onChange={(key,value) => handleAngleChange(key,value)}
                                /> :
                                <CategoryAxis
                                    axis={angleAxis}
                                    onChange={(key,value) => handleAngleChange(key,value)}
                                />
                        }
                    </TabPane>
                }
                {
                    !!radiusAxis &&
                    <TabPane tab="径向轴" key="radius">
                        {
                            !radiusAxis.type || radiusAxis.type == 'value' ?
                                <ValueAxis
                                    axis={radiusAxis}
                                    onChange={(key,value) => handleRadiusChange(key,value)}
                                /> :
                                <CategoryAxis
                                    axis={radiusAxis}
                                    onChange={(key,value) => handleRadiusChange(key,value)}
                                />
                        }
                    </TabPane>
                }
                {
                    guid.isRadar &&
                    <TabPane tab="雷达轴" key="radar">
                        {
                            <RadarAxis radar={radar} onChange={handleRadarChange}/>
                        }
                    </TabPane>
                }
                {
                    guid.isGauge &&
                    <TabPane tab="仪表轴" key="gauge">
                        {
                            <GaugeAxis gauge={gaugeAxis} onChange={handleGaugeAxisChange}/>
                        }
                    </TabPane>
                }
            </Tabs>
        </div>
    )
}