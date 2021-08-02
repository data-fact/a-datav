/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/29.
 * Description:
 * Modified By:
 */
import { Card, Tabs } from 'antd4';
import React from 'react';
import CommonSeries from "./base/CommonSeries";
const { TabPane } = Tabs
export default function SeriesConfiger({ _series, guid, onChange }) {

  function handleEdit(i, type) {
    switch (type) {
      case 'add':
        onChange({_series: {$push: [{colors: [],marks: []}]}})
        break;
      case 'remove':
        onChange({_series: {$splice: [[i,1]]}})
    }
  }
  function handleChange(i,key,value) {
    onChange({_series: {[i]: {[key]: {$set: value}}}})
  }
  return (
      <Card title="数据系列" size="small">
        <Tabs
            // onChange={this.onChange}
            type="editable-card"
            onEdit={handleEdit}
        >
          {
            _series.map((ser, i) => {
              let {colors,marks,areaColors} = ser
              return <TabPane tab={'系列' + (i + 1)} key={'' + i}>
                <CommonSeries
                    guid={guid} colors={colors} marks={marks} areaColors={areaColors}
                    onChange={(key,value) => handleChange(i,key,value)}
                />
              </TabPane>
            })
          }
        </Tabs>
      </Card>
  )
}