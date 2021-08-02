/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import update from 'immutability-helper';
import {Row,Col,Input,Switch} from 'antd4'
import { DeleteOutlined } from '@ant-design/icons';
import state from "../state";
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import useInitComponent from "../../../../hooks/useInitComponent";
import Palette from "../../../../../lib/palette/Palette";
import FontConfiger from "../../../../../lib/font-configer/FontConfiger";

export default function Configer({component}){

  let {i: id,_ready,option,title,content} = component

  let [text,setText] = useState('')
  useEffect(() => {
    if(title)
      setText(title.text)
  },[title])

  //初始化state
  let ready = useInitComponent(component,state)
  let updateComponent = useUpdateComponent()

  if(!_ready)
    return null

  function handleColorChange(color) {
    updateComponent(id,{option: update(option,{color: {$set: color}})})
  }
  function handleTitleChange(key,value) {
    updateComponent(id,{title: update(title,{[key]: {$set: value}})})
  }
  function handleContentChange(key,value) {
    updateComponent(id,{content: update(content,{[key]: {$set: value}})})
  }

  return (
      <>
        <Row style={{paddingBottom: 8}}>
          <Col span={4}>颜色</Col>
          <Col span={14}>
            <Palette color={option.color} onChange={handleColorChange}/>
          </Col>
          <Col span={4}>
            <DeleteOutlined onClick={() => handleColorChange('')}/>
          </Col>
        </Row>
        <Row style={{paddingBottom: 8}}>
          <Col span={4}>描述</Col>
          <Col span={20}>
            <Row>
              <Col span={4}>文本</Col>
              <Col span={16}>
                <Input
                    size="small" value={text}
                    onChange={e => setText(e.target.value)}
                    onBlur={e => handleTitleChange('text',e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col span={4}>字体</Col>
              <Col span={20}>
                <FontConfiger
                    hideSpacing hideExt
                    size={title.fontSize}
                    color={title.color}
                    family={title.fontFamily}
                    onSizeChange={value => handleTitleChange('fontSize',value)}
                    onColorChange={color => {handleTitleChange('color',color)}}
                    onFontChange={value => handleTitleChange('fontFamily',value)}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{paddingBottom: 8}}>
          <Col span={4}>百分比</Col>
          <Col span={20}>
            <Row>
              <Col span={4}>显示</Col>
              <Col span={16}>
                <Switch
                    size="small" checked={content.show}
                    onChange={checked => handleContentChange('show',checked)}
                />
              </Col>
            </Row>
            <Row>
              <Col span={4}>字体</Col>
              <Col span={20}>
                <FontConfiger
                    hideSpacing hideExt
                    size={content.fontSize}
                    color={content.color}
                    family={content.fontFamily}
                    onSizeChange={value => handleContentChange('fontSize',value)}
                    onColorChange={color => {handleContentChange('color',color)}}
                    onFontChange={value => handleContentChange('fontFamily',value)}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </>
  )
}