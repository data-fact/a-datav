import React, { useState, useEffect, useRef } from 'react'
import useGetColors from '../../../../hooks/useGetColors'
import useHandleEvent from "../../../../hooks/useHandleEvent";
import { Progress } from 'antd4'
import BigNumber from 'bignumber.js'
export default function Renderer({ component }) {
  let { i: id, _ready, w, h, line_size, _data: data, noFinishColor, colors, formatter, showText, fontSize, color, fontFamily } = component
  let [colorObj, setColorObj] = useState(null)
  let getColors = useGetColors()
  let handleEvent = useHandleEvent()
  useEffect(() => {

    let obj = null
    if (colors[0] === '' && colors[1]) {
      obj = {
        '0%': colors[1],
        '100%': colors[1],
      }
    }
    if (colors[1] === '' && colors[0]) {
      obj = {
        '0%': colors[0],
        '100%': colors[0],
      }
    }
    if (colors[1] && colors[0]) {
      obj = {
        '0%': colors[0],
        '100%': colors[1],
      }
    }
    if (colors[1] === '' && colors[0] === '') {
      obj = {
        '0%': getColors[0],
        '100%': getColors[getColors.length - 1],
      }
    }
    setColorObj(obj)
  }, [colors, getColors])
  function formatterName(percent) {
    formatter = formatter.replace(/{value}/g, percent)
    return <span style={{ fontSize: `${fontSize}px`, fontFamily: fontFamily, color: color, whiteSpace: 'pre-line' }}>
      {formatter}
    </span >
  }
  function handleClick() {
    let value = data && data[0] ? data[0].value : 0
    handleEvent(id, 'click', { value })
  }
  if (!(_ready && data[0] && data[0].value))
    return null
  return (

    <Progress type="dashboard" percent={new BigNumber(data[0].value).multipliedBy(100)} width={w > h ? h : w} trailColor={noFinishColor} strokeWidth={line_size}
      format={formatterName}
      strokeColor={colorObj} showInfo={showText} onClick={handleClick} />
  )
}