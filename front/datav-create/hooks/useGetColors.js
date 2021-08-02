/**
 *  获取美化里的颜色
 */
import React, { useState, useEffect } from 'react'
import useCanvasReducer from "../reducers/useCanvasReducer";
import themes from "../common/style/themes";
import seriesColors from "../common/style/series_colors";
export default function useGetColors () {
  let [canvas] = useCanvasReducer()
  let { colors, theme } = canvas
  let [seriesColorsValue, setSeriesColorsValue] = useState([])
  let [themesColorsValue, setThemesColorsValue] = useState([])
  useEffect(() => {
    let value = seriesColors[colors]["value"]
    setSeriesColorsValue(value)
  }, [colors])
  useEffect(() => {
    let value = themes[theme].value().color
    setThemesColorsValue(value)
  }, [theme])
  if (colors !== "empty") {
    // 1.如果系列色有颜色就返回系列色列表
    return seriesColorsValue
  }
  else {
    // 2.如果系列色是空的就返回主题颜色列表
    return themesColorsValue
  }
}