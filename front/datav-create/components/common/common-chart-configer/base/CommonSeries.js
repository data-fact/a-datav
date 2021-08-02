/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/11/5.
 * Description:
 * Modified By:
 */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd4';
import React from 'react';
import GradientColor from "../../../common/common-chart-configer/base/GradientColor";
import MarkPoint from './MarkPoint';

export default function CommonSeries({ colors, areaColors = ['',''], marks, guid, onChange }) {

  function handleColorChange(colors) {
    onChange('colors',colors)
  }
  function handleAreaColorChange(colors) {
    onChange('areaColors',colors)
  }
  function handleAddMark() {
    onChange('marks',[...marks,{
      type: 'max',
      symbol: 'pin',
      markType: 'point'
    }])
  }
  function handleMarkChange(marks) {
    onChange('marks',marks)
  }
  return (
    <>
      <div style={{ marginBottom: 4 }}>
        <Row>
          <Col span={6}>颜色</Col>
          <Col span={18}>
            <GradientColor colors={colors} onChange={handleColorChange} />
          </Col>
        </Row>
        {
          guid.isArea &&
              <>
                <Row>
                  <Col span={6}>区域色</Col>
                  <Col span={18}>
                    <GradientColor colors={areaColors} onChange={handleAreaColorChange} />
                  </Col>
                </Row>
              </>
        }
        {
          guid.isAxis &&
              <>
                <Row style={{ marginTop: 12 }}>
                  <Col span={24}>
                    {
                      marks.length ?
                          <MarkPoint marks={marks} onChange={handleMarkChange} />
                          :
                          null
                    }
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Button
                        style={{ width: '100%', margin: '10px 0 10px 0' }}
                        size="small" type="dashed" icon={<PlusOutlined />}
                        onClick={handleAddMark}>
                      添加标注
                    </Button>
                  </Col>
                </Row>
              </>
        }
      </div>
    </>
  )
}