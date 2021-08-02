/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/28.
 * Description:
 * Modified By:
 */
import React, { useState, useEffect } from 'react'
import { Modal, notification, Button } from 'antd4'
import { useKeyPress } from 'ahooks'
import useCanvasReducer from "../reducers/useCanvasReducer";
import useSupportReducer from "../reducers/useSupportReducer";
import { cancelRollbackAction, getRollbackAction } from "../common/global_cache";
import { getMousePosition } from "../utils/util";
import common_state, { hideAttrs } from "../components/common/common_state";
import { useAddComponent } from "./useAction";
import useUpdateComponent from "./useUpdateComponent";
import useSaveAll from "./useSaveAll";
import {getOsInfo} from "../../utils/util";
const { confirm } = Modal

let osInfo = getOsInfo()
let metaKey = osInfo.name == 'Mac' ? 'meta' : 'ctrl'
const xyArrowMap = { 'ArrowRight': '+', 'ArrowLeft': '-', 'ArrowUp': '-', 'ArrowDown': '+', }
export default function useShortcutKey () {

  let [canvas, canvasDispatch] = useCanvasReducer()
  let [support] = useSupportReducer()
  let { scale,interval } = support.screen
  let addComponent = useAddComponent()
  let updateComponent = useUpdateComponent()
  let saveAll = useSaveAll()

  function handleAddComponent (component) {
    let { _typeId, _typeNav, _typeName } = component
    if (!(_typeId && _typeNav && _typeName))
      throw Error('组件异常')
    let position = getMousePosition(scale,interval)
    return addComponent({ ...component, ...position }, null, null)
  }
  //撤销
  useKeyPress([`${metaKey}.z`], (e) => {
    if (document.activeElement != document.body)
      return
    let direction = e.shiftKey ? 1 : -1
    let state = getRollbackAction(direction)
    if (state) {
      canvasDispatch({ type: 'BACKUP', state })
      notification.info({
        message: '保存变更',
        description: '是否保存撤销操作?',
        btn: (<>
          <Button
            size="small"
            onClick={() => {
              let state = cancelRollbackAction()
              canvasDispatch({ type: 'BACKUP', state })
              saveAll(state)
              notification.close('BACKUP_KEY')
            }}
          >
            取消
                    </Button>
          <Button
            type="primary" size="small"
            onClick={() => {
              saveAll(state)
              notification.close('BACKUP_KEY')
            }}
          >
            保存
                    </Button>
        </>),
        key: 'BACKUP_KEY',
        duration: null
      })
    }
  })
  //删除组件
  useKeyPress(['Backspace'], (e) => {
    if (document.activeElement != document.body || canvas.focusId[0] == 'screen')
      return
    confirm({
      title: '是否确定删除组件?',
      // content: `此操作无法撤销`,
      content: `已选中${canvas.focusId.length}个组件`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk () {
        canvasDispatch({ type: 'DELETE_COMPONENT' })
        notification.success({message: '组件删除成功'})
      },
    });
  })
  //复制组件
  useKeyPress([`${metaKey}.c`], (e) => {
    if (document.activeElement != document.body)
      return
    let [id] = canvas.focusId
    if (id && id != 'screen') {
      navigator.clipboard.writeText(JSON.stringify(canvas.components[id]))
      notification.success({message: '组件复制成功'})
    }
  })
  //粘贴组件
  useKeyPress([`${metaKey}.v`], (e) => {
    if (document.activeElement != document.body)
      return
    navigator.clipboard.readText()
      .then(text => {
        let component = JSON.parse(text)
        component = { ...hideAttrs, ...common_state, ...component }
        component._child_ids = {}
        // if(component._child_ids && Object.keys(component._child_ids).length){
        //     Object.keys(component._child_ids).forEach(key => {
        //         let val = component._child_ids[key]
        //         if(!val.id) return
        //         let subComponent = canvas.components[val.id]
        //         let subId = handleAddComponent(subComponent)
        //         updateComponent(subId,{...component,i:subId,_parent_id:id})
        //         component._child_ids[key].id = subId
        //     })
        // }
        let id = handleAddComponent(component)
        updateComponent(id, { ...component, i: id })
        notification.success({message: '组件粘贴成功'})
      })
      .catch(err => {
        console.error('粘贴失败', err)
      })

  })
  //调整组件层级
  useKeyPress(['alt.ArrowUp', 'alt.ArrowDown'], (e) => {
    if (document.activeElement != document.body)
      return
    let { focusId, components } = canvas
    let newComponents = {}
    focusId.forEach(id => {
      if (id == 'screen') return
      let value = components[id]['_z_index']
      if (value <= 0 && e.key == 'ArrowDown')
        return
      value = e.key == 'ArrowUp' ? value + 1 :
        e.key == 'ArrowDown' ? value - 1 : value
      newComponents[id] = { '_z_index': value }
    })
    canvasDispatch({ type: 'UPDATE_COMPONENTS', components: newComponents })
    notification.success({message: '组件层级调整成功',key: 'shortcut-zindex'})
  })
  //调整组件位置、宽高
  useKeyPress(['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'], (e) => {
    if (document.activeElement != document.body)
      return
    if (e.altKey) return
    let x = e.shiftKey ? 'w' : 'x'
    let y = e.shiftKey ? 'h' : 'y'
    let key = e.key == 'ArrowRight' || e.key == 'ArrowLeft' ? x : y
    let { focusId, components } = canvas
    let { interval } = support.screen
    let newComponents = {}
    focusId.forEach(id => {
      if (id == 'screen') return
      let value = components[id][key]
      value = xyArrowMap[e.key] == '+' ? value + interval : value - interval
      newComponents[id] = { [key]: value }
    })
    canvasDispatch({ type: 'UPDATE_COMPONENTS', components: newComponents })
    notification.success({message: `组件${key == 'x' || key == 'y' ? '位置' : '大小'}调整成功`,key: 'shortcut-move-size'})
  })
}

// export function useMouseMonitor() {
//     let [support,supportDispatch] = useSupportReducer()
//     let {scale} = support.screen
//     const { run } = useDebounceFn(
//         (e) => {
//             console.log(scale)
//             let position = document.getElementById('datav-canvas-main').getBoundingClientRect()
//             let x = e.pageX - position.left
//             let y = e.pageY - position.top
//             x = Math.ceil(x / (scale || 1)) - 50
//             y = Math.ceil(y / (scale || 1)) - 50
//             supportDispatch({type: 'SET_MOUSE_POSITION', position: {x,y}})
//         },
//         {
//             wait: 200,
//         },
//     );
//     function handleMouseMove(e){
//         run(e)
//     }
//     useEffect(() => {
//         setTimeout(() => {
//             document.getElementById('datav-canvas-main')
//                 .addEventListener('mousemove',handleMouseMove)
//         },1000)
//         return () => {
//             document.getElementById('datav-canvas-main')
//                 .removeEventListener('mousemove',handleMouseMove)
//         }
//     },[scale])
// }