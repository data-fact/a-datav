import React from 'react'
import { Row, Col, Tooltip, } from 'antd4'
import Palette from "../../../../../lib/palette/Palette";
import { UndoOutlined } from '@ant-design/icons';
export default function GradientColor ({colors, onChange }) {
  // 分三种情况
  /**
   * 1.都是空的，就是默认值，默认值是组件自己设置的默认值，
   * 2.有一个，就是单一颜色.
   * 3.有两个，就是渐变色.
   * 4.如果设置了渐变色，就使用渐变色
   */
  return (
    <>
      <Row>
        <Col span={24}>
          <Row>
            <Col span={10}>
              <Palette color={colors[0]} onChange={color => {
                colors[0] = color
                onChange([...colors])
              }}
                onDelete={() => {
                  colors[0] = ''
                  onChange([...colors])
                }}
              />
            </Col>
            <Col span={10}>
              <Palette color={colors[1]} onChange={color => {
                colors[1] = color
                onChange([...colors])
              }}
                onDelete={() => {
                  colors[1] = ''
                  onChange([...colors])
                }} />
            </Col>
            <Col span={4}>
              <Tooltip placement="top" title="重置">
                <UndoOutlined onClick={() => onChange(['',''])} />
              </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}