
import {genImageUrl, isObject} from "../../utils/util";
import {BACKGROUND_REPEAT_TYPE, BACKGROUND_TYPE, GRADIENT_TYPE, SHOW_HIDE_TYPE} from "../common/constant";
import seriesColors from "../common/style/series_colors";
/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
export function genFunctionStr(name, paramList, body) {
  return `${name} = function (${paramList}){
        "use strict";
        ${body}
    }`
}

export function updateDataAndFieldStatus(dataFieldMap, data) {
  try {
    dataFieldMap = { ...dataFieldMap }
    let keys = Object.keys(dataFieldMap)
    let ok = true

    keys.forEach(k => dataFieldMap[k].status = dataFieldMap[k].required ? 2 : 3)
    if (!data || !Array.isArray(data) || !data.length) {
      ok = false
      return { dataFieldMap, data, ok }
    }

    data = [...data]
    data.forEach((d, i) => {
      keys.forEach(key => {
        let { map, required } = dataFieldMap[key]
        if (map && d[map])
          d[key] = d[map]
        //d不满足要求，之后将会被删除
        if (dataFieldMap[key].status != 3 && !d[key])
          data[i] = false
        if (dataFieldMap[key].status == 1 || dataFieldMap[key].status == 3) {
          return
        }
        if (required)
          dataFieldMap[key].status = d[key] === undefined ? 2 : 1
        else
          dataFieldMap[key].status = 3
      })
    })
    //清理异常数据
    data = data.filter(d => d)

    keys.forEach(key => {
      if (dataFieldMap[key].status == 2)
        ok = false
    })
    return { dataFieldMap, data, ok }
  } catch (e) {
    console.error("更新数据和字段状态失败", e)
    return { dataFieldMap: {}, data: [] }
  }

}

export function execDataFilter(data, dataFilter, vars) {
  // Object.keys(vars).forEach(k => {
  //     let v = vars[k]
  //     if(!v)
  //         vars[k] = `""`
  //     else if(isNaN(v))
  //         vars[k] = `"${v}"`
  // })
  dataFilter.forEach(df => {
    try {
      let filterFunction
      // let value = eval('`'+df.value+'`')
      eval(genFunctionStr('filterFunction', 'data,vars', df.value || ''))
      data = filterFunction(data, vars)
    } catch (e) {
      console.error("过滤器执行失败 id:" + df.id, e)
    }
  })
  return data
}
export function evalVarsStr(str, vars) {
  try {
    return eval('`' + str + '`')
  } catch (err) {
    console.error(`字符串解析失败 str:${str},vars:${JSON.stringify(vars)}`)
  }
  return ''
}

export function getVariableArr(str) {
  if (!str)
    return []
  let arr = str.match(/\$\{vars\.((\w|-|\s|[\u4e00-\u9fa5])+)\}/ig) || []
  arr = arr.map(v => v.match(/\$\{vars\.(\S*)\}/)[1]).filter(v => !!v)
  return arr
}
export function getVariableArr1(str) {
  if (!str)
    return []
  let arr = str.match(/vars\.((\w|-|\s|[\u4e00-\u9fa5])+)/ig) || []
  arr = arr.map(v => v.replace('vars.', '')).filter(v => !!v)
  return arr
}

let pageX = 0, pageY = 0
export function monitorMouse() {
  document.body.addEventListener('mousemove', e => {
    pageX = e.pageX
    pageY = e.pageY
  })
}
export function getMousePosition(scale, interval, e) {
  let position = document.getElementById('datav-canvas-main').getBoundingClientRect()
  let x = (e ? e.pageX : pageX) - position.left
  let y = (e ? e.pageY : pageY) - position.top
  x = Math.ceil(x / (scale || 1))
  y = Math.ceil(y / (scale || 1))
  x = Math.round(x / interval) * interval
  y = Math.round(y / interval) * interval
  return { x, y }
}

export function serializeComponent(component, datavId) {
  component = { ...component }
  let { i: id, _name: name, _typeId: type, isCreate } = component
  component._data = []
  component._data_cache = []
  component._data_default_or = "[]"
  return {
    id, name, type, datavId, data: JSON.stringify(component)
  }
}

export function sortComponentsToKey(components) {
  return Object.keys(components)
    .sort((id1, id2) => (
      (components[id1]._z_index || 0) - (components[id2]._z_index || 0)
    ))
    .sort((id1, id2) => (
      (components[id2]._mark_color || '').localeCompare(components[id1]._mark_color || '')
    ))
}

const variableCounter = {}
export function getVariableCounter(variable, value) {
  let counter = variableCounter[variable]
  if (!counter)
    variableCounter[variable] = { value, count: 1 }
  if (value != variableCounter[variable].value) {
    variableCounter[variable].value = value
    variableCounter[variable].count += 1
  }
  return variableCounter[variable].count
}

function getBackgroundImage(bgType, gradient, image) {
  switch (bgType) {
    case BACKGROUND_TYPE.image:
      return `url(${genImageUrl(image)})`
    case BACKGROUND_TYPE.gradient:
      let { type, angle, colors } = gradient
      angle = type == GRADIENT_TYPE.linear ? `${angle}deg,` : ''
      return `${type}-gradient(${angle}${colors.join(',')})`
  }
  return ''
}
export function getBackgroundImageStyle(config) {
  let { bgType, gradient, color, image, borderRadius, repeatType, size } = config
  let style = {
    height: '100%', width: '100%',
    // backgroundColor: bgType == BACKGROUND_TYPE.color && color,
    backgroundColor: bgType != BACKGROUND_TYPE.gradient && color,
    backgroundImage: getBackgroundImage(bgType, gradient, image),
    borderRadius
  }
  if (bgType == BACKGROUND_TYPE.image) {
    switch (repeatType) {
      case BACKGROUND_REPEAT_TYPE.repeat:
        style.backgroundRepeat = 'repeat'
        break
      case BACKGROUND_REPEAT_TYPE.noRepeat:
        style.backgroundRepeat = 'no-repeat'
        break
      case BACKGROUND_REPEAT_TYPE.adapt:
        style.backgroundSize = size
        style.backgroundRepeat = 'no-repeat'
    }
    style.backgroundPosition = 'center'
  }
  return style
}

export function componentShouldShow(component,variables) {
  let {_show,_show_var,_show_eval} = component
  if(_show == SHOW_HIDE_TYPE.hide)
    return false
  if(_show == SHOW_HIDE_TYPE.custom){
    if(!_show_var || !_show_eval)
      return false
    let show = false
    let value = variables[_show_var]
    let counter = getVariableCounter(_show_var,value)
    //执行自定义表达式
    try{
      let evalFunction
      eval(genFunctionStr('evalFunction','value,counter',_show_eval))
      show = evalFunction(value,counter)
    }catch(e){
      console.error("过滤器执行失败 id:" + i,e)
    }
    return show
  }
  return true
}

export function genColorStyle(colors,seriesColors,width = '',deg = 180) {
  let style = {}
  let newColors = colors.filter(c => !!c)
  if(!newColors.length && seriesColors.length){
    newColors = [seriesColors[0],seriesColors[seriesColors.length - 1]]
  }
  if(newColors.length == 1)
    style.color = newColors[0]
  else if(newColors.length > 1){
    style.gradientColor = `linear-gradient(${deg}deg, ${newColors[0]}, ${newColors[1]}) ${width}`
  }
  return style
}