/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import {debounce} from "../../utils/util";

const MAX_HISTORY = 100
const globalCache = {
    needCommitDatav: false,
    addedIds: new Set(),
    changedIds: new Set(),
    deletedIds: new Set(),
    changedList: [],
    historyIndex: -1
}

export const backupState = (state) => {
    doPushChanged(state)
}
export const pushChanged = (state,type,ids) => {
    if(type == 'datav'){
        globalCache.needCommitDatav = true
    }else{
        if(ids && ids.length){
            ids.forEach(id => {
                globalCache[type].add(id)
            })
        }
    }
    doPushChanged(state)
}
let doPushChanged = debounce((state) => {
    globalCache.historyIndex += 1
    globalCache.changedList[globalCache.historyIndex] = state
    if(globalCache.historyIndex >= MAX_HISTORY){
        globalCache.historyIndex -= 1
        globalCache.changedList.splice(0,1)
    }
},500)


export const resetDatav = () => {
    globalCache.needCommitDatav = false
}
export const resetComponents = () => {
    globalCache.addedIds = new Set()
    globalCache.changedIds = new Set()
    globalCache.deletedIds = new Set()
}
export const getGlobalCache = () => {
    return globalCache
}

export function getRollbackAction(direction) {
    let {changedList,historyIndex} = globalCache
    historyIndex += direction
    if(historyIndex <= 0 || !changedList[historyIndex])
        return null
    globalCache.historyIndex = historyIndex

    return changedList[historyIndex]
}
export function cancelRollbackAction() {
    let {changedList,historyIndex} = globalCache
    historyIndex = changedList.length - 1
    globalCache.historyIndex = historyIndex

    return changedList[historyIndex]
}