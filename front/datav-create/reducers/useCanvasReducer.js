/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React,{ useReducer,useContext } from "react";
import update from 'immutability-helper';
import {backupState, pushChanged} from "../common/global_cache";
import {BACKGROUND_REPEAT_TYPE, BACKGROUND_TYPE, GRADIENT_TYPE, SCALE_TYPE} from "../common/constant";

export const initialState = {
    id: '',
    name: '',
    focusId: ['screen'],
    theme: 'dark',
    colors: 'default',
    styleFilters: [],
    filters: {
        // [id]: {id,name,value,descr,saved}
    },
    variables: {}, //全局变量
    image: '',
    screen: {
        width: 1920,
        height: 1080,
        bgType: BACKGROUND_TYPE.color,
        gradient: {
            type: GRADIENT_TYPE.linear,
            angle: 0,
            colors: []
        },
        repeatType: BACKGROUND_REPEAT_TYPE.adapt,
        // color: 'rgba(255,255,255,1)',
        // color: 'rgba(74,74,74,1)',
        color: 'rgba(14,42,66,1)',
        image: '',
        scaleType: SCALE_TYPE.full,
        borderRadius: 0
    },
    components: {
        // [id]: {组件中声明的state}
    }
}
const reducer = (state, action) => {
    let newState
    switch (action.type) {
        case 'INIT':
        case 'BACKUP':
            return action.state
        case 'INIT_DATAV':
            var newDatav = update(state,{$merge: action.datav})
            newDatav.components = state.components
            return newDatav
        case 'INIT_COMPONENTS':
            newState = update(state,{components: {$set: action.components}})
            pushChanged(newState,'datav')
            return newState
        case 'CHANGE_FOCUS_ID':
            if(!action.focusId || !action.focusId.length)
                action.focusId = ['screen']
            return update(state,{focusId: {$set: action.focusId}})

        case 'CHANGE_SCREEN_WIDTH':
            newState = update(state,{screen: {width: {$set: action.value}}})
            pushChanged(newState,'datav')
            return newState
        case 'CHANGE_SCREEN_HEIGHT':
            newState = update(state,{screen: {height: {$set: action.value}}})
            pushChanged(newState,'datav')
            return newState
        case 'CHANGE_SCREEN_BACKGROUND_TYPE':
            newState = update(state,{screen: {bgType: {$set: action.value}}})
            pushChanged(newState,'datav')
            return newState
        case 'CHANGE_SCREEN_COLOR':
            newState = update(state,{screen: {color: {$set: action.value}}})
            pushChanged(newState,'datav')
            return newState
        case 'CHANGE_SCREEN_GRADIENT':
            newState = update(state,{screen: {gradient: {$set: action.value}}})
            pushChanged(newState,'datav')
            return newState
        case 'CHANGE_SCREEN_IMAGE':
            newState = update(state,{screen: {image: {$set: action.value}}})
            pushChanged(newState,'datav')
            return newState
        case 'CHANGE_SCREEN_SCALE_TYPE':
            newState = update(state,{screen: {scaleType: {$set: action.value}}})
            pushChanged(newState,'datav')
            return newState
        case 'CHANGE_SCREEN_BORDER_RADIUS':
            newState = update(state,{screen: {borderRadius: {$set: action.value}}})
            pushChanged(newState,'datav')
            return newState
        case 'CHANGE_SCREEN_REPEAT_TYPE':
            newState = update(state,{screen: {repeatType: {$set: action.repeatType}}})
            pushChanged(newState,'datav')
            return newState
        case 'RESET_SCREEN':
            newState = update(state,{screen: {$set: initialState.screen}})
            pushChanged(newState,'datav')
            return newState
        case 'ADD_FILTER':
            var {id,filter} = action
            newState = update(state,{filters: {[id]: {$set: filter}}})
            pushChanged(newState,'datav')
            return newState
        case 'UPDATE_FILTER':
            var {id,filter} = action
            newState = update(state,{filters: {[id]: {$merge: filter}}})
            pushChanged(newState,'datav')
            return newState
        case 'CREATE_VARIABLE':
            var {key,value} = action
            newState = update(state,{variables: {[key]: {$set: value}}})
            pushChanged(newState,'datav')
            return newState
        case 'UPDATE_VARIABLE':
            var {oldKey,key,value} = action
            if(oldKey || oldKey === '')
                delete state.variables[oldKey]
            newState = update(state,{variables: {[key]: {$set: value}}})
            pushChanged(newState,'datav')
            return newState
        case 'DELETE_VARIABLE':
            var newVariables = {...state.variables}
            delete newVariables[action.key]
            newState = update(state,{variables: {$set: newVariables}})
            pushChanged(newState,'datav')
            return newState
        case 'CHANGE_THEME':
            newState = update(state,{theme: {$set: action.theme}})
            pushChanged(newState,'datav')
            return newState
        case 'CHANGE_COLORS':
            newState = update(state,{colors: {$set: action.colors}})
            pushChanged(newState,'datav')
            return newState
        case 'CHANGE_STYLE_FILTERS':
            newState = update(state,{styleFilters: {$set: action.styleFilters}})
            pushChanged(newState,'datav')
            return newState
        case 'CHANGE_COVER_IMAGE':
            newState = update(state,{image: {$set: action.image}})
            pushChanged(newState,'datav')
            return newState

        case 'ADD_COMPONENT':
            var {id,component} = action
            component.i = id
            newState = update(state,{
                focusId: {$set: [id]},
                components: {[id]: {$set: component}}
            })
            pushChanged(newState,'addedIds', [id])
            return newState
        case 'DELETE_COMPONENT':
            var ids = action.id ? [action.id] : state.focusId
            if(!ids || (ids.length <= 1 && ids[0] == 'screen'))
                return state
            var components = {...state.components}
            ids.forEach(id => {
                let {_parent_id,_child_ids} = components[id]
                if(_parent_id){
                    delete components[_parent_id]
                }
                if(_child_ids && Object.keys(_child_ids).length){
                    Object.keys(_child_ids).forEach(key => {
                        if(_child_ids[key]){
                            delete components[_child_ids[key].id]
                        }
                    })
                }
                delete components[id]
            })
            newState = update(state,{focusId: {$set: ['screen']}, components: {$set : components}})
            pushChanged(newState,'deletedIds',ids)
            return newState
        case 'UPDATE_COMPONENT_DATA':
            // if(action.component._data_status == 3){}
            var {id,component} = action
            newState = state.components[id] ? update(state,{components: {[id]: {$merge: component}}}) : state
            backupState(newState)
            return newState
        case 'UPDATE_COMPONENT':
            var {id,component} = action
            //如果是初始化，不覆盖原组件x,y,w,h
            if(component._ready){
                let {x,y,w,h} = state.components[id]
                component.x = x || component.x
                component.y = y || component.y
                component.w = w || component.w
                component.h = h || component.h
            }
            newState = update(state,{components: {[id]: {$merge: component}}})
            pushChanged(newState,'changedIds',[id])
            return newState
        case 'UPDATE_COMPONENTS':
            var {components} = action
            var ids = Object.keys(components)
            if(!ids.length)
                return state
            var spec = {components: {}}
            ids.forEach(id => {
                spec.components[id] = {$merge: components[id]}
            })
            newState = update(state,spec)
            pushChanged(newState,'changedIds',ids)
            return newState
        default: throw new Error('Unexpected action');
    }
};
const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
    const contextValue = useReducer(reducer, JSON.parse(JSON.stringify(initialState)));

    return (
        <CanvasContext.Provider value={contextValue}>
            {children}
        </CanvasContext.Provider>
    );
};
const useCanvasReducer = () => {
    const contextValue = useContext(CanvasContext);
    return contextValue;
};

export default useCanvasReducer