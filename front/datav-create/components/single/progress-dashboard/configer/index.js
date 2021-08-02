import { EyeInvisibleOutlined, EyeOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Col, Collapse, Input, Row, Tooltip } from 'antd4';
import React, { useEffect, useState } from 'react';
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";
import AInputNumber from "../../../../../lib/input-number/AInputNumber";
import Palette from "../../../../../lib/palette/Palette";
import useInitComponent from "../../../../hooks/useInitComponent";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import GradientColor from "../../../common/common-chart-configer/base/GradientColor";
import state from "../state";
import {FORMATTER_TEXT} from "../../../../common/constant";
import QuestionTooltip from "../../../../../lib/mini-components/QuestionTooltip";
import AInput from "../../../../../lib/mini-components/AInput";
const { Panel } = Collapse
export default function Configer({ component }) {
  let { showText, i: id, line_size, noFinishColor, colors, formatter: storeFormatter, fontSize, color, fontFamily } = component
  let [formatter, setFormatter] = useState('')
  useEffect(
    () => setFormatter(storeFormatter),
    [storeFormatter])
  let updateComponent = useUpdateComponent()
  //初始化state
  let ready = useInitComponent(component, state)
  if (!ready)
    return null

  function handleLineSizeChange(line_size) {
    updateComponent(id, { line_size })
  }
  function handleColorChange(noFinishColor) {
    updateComponent(id, { noFinishColor })
  }
  function onColorChange(colors) {
    let newColor = [...colors]
    if (colors[0] === "" && colors[1] !== "") {
      // 1.两个颜色只有一个颜色是空的，则设置单一颜色
      newColor = ['', colors[1]]
    }
    if (colors[1] === "" && colors[0] !== "") {
      newColor = [colors[0], '']
    }

    updateComponent(id, { colors: newColor })
    // updateComponent(id, { colors: { [i]: { colors } } })
  }
  function handleLabelChange(key, value) {
    updateComponent(id, { [key]: value })
  }
  function handleTitleShow(e) {
    e.stopPropagation()
    updateComponent(id, { "showText": !showText })
  }
  function onChangeFont(key, value) {
    updateComponent(id, { [key]: value })
  }
  return (
    <>
      <div style={{ marginBottom: 8 }}>
        <Row>
          <Col span={6}>宽度</Col>
          <Col span={18}>
            <AInputNumber
              unit="px" value={line_size}
              options={{ min: 0, max: 1000, size: 'small' }}
              onBlur={val => handleLineSizeChange(val)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>未完成颜色</Col>
          <Col span={18}>
            <div style={{ marginBottom: 4 }}>
              <Row>
                <Col span={7}>
                  <Palette color={noFinishColor} onChange={color => {
                    handleColorChange(color)
                  }} />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={6}>已完成颜色</Col>
          <Col span={18}>
            <GradientColor colors={colors} onChange={onColorChange} />
          </Col>
        </Row>
        <Collapse >
          <Panel
            header="文字" key="2"
            disabled={!showText}
            extra={
              showText ?
                <EyeOutlined onClick={handleTitleShow} /> :
                <EyeInvisibleOutlined onClick={handleTitleShow} />
            }
          >
            <Row style={{ marginTop: 12, marginBottom: 12 }}>
              <Col span={4}>
                <span>格式</span>
                <QuestionTooltip
                    title={
                      <span style={{whiteSpace: 'pre-line'}}>{
                        FORMATTER_TEXT.value
                      }</span>
                    }
                />
              </Col>
              <Col span={20}>
                <AInput
                    style={{ width: 88 }}
                    placeholder="请输入"
                    value={formatter}
                    onBlur={val => handleLabelChange('formatter',val || undefined)}
                />
              </Col>
            </Row>
            <Row>
              <Col span={4}>字体</Col>
              <Col span={20}>
                <FontConfiger
                  hideSpacing hideExt
                  size={fontSize}
                  color={color}
                  family={fontFamily}
                  onSizeChange={value => onChangeFont('fontSize', value)}
                  onColorChange={value => { onChangeFont('color', value) }}
                  onFontChange={value => onChangeFont('fontFamily', value)}
                />
              </Col>
            </Row>
          </Panel>
        </Collapse>

      </div>
    </>
  )
}