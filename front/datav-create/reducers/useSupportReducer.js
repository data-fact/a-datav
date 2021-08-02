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

export const initialState = {
    layout: {
        layer: {
            show: false,
            // disabled: false
        },
        componentList: {
            show: true
        },
        chartEditor: {
            show: true
        },
        toolbar: {
            show: true,
        },
    },

    screen: {
        scale: 0.6,
        interval: 10
    },

    mousePosition: {
        x: 0,
        y: 0
    },

    showVariables: false,
    viewModel: false,
    loading: false,
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_LAYOUT':
            var show = state.layout[action.subType].show
            return update(state,{
                layout: {
                    [action.subType]: {
                        show: {$set: !show}
                    }
                }
            })
        case 'CHANGE_SCREEN_SCALE':
            return update(state,{screen: {scale: {$set: action.scale}}})
        case 'CHANGE_SCREEN_GRID_INTERVAL':
            return update(state,{screen: {interval: {$set: action.value}}})
        case 'SET_SHOW_VARIABLES':
            return update(state,{showVariables: {$set: action.show}})
        case 'CHANGE_VIEW_MODEL':
            return update(state,{viewModel: {$set: action.viewModel}})
        case 'SET_LOADING':
            return update(state,{loading: {$set: action.loading}})
        case 'SET_MOUSE_POSITION':
            return update(state,{mousePosition: {$set: action.position}})
        default: throw new Error('Unexpected action');
    }
};
const SupportContext = React.createContext();

export const SupportProvider = ({ children }) => {
    const contextValue = useReducer(reducer, JSON.parse(JSON.stringify(initialState)));
    return (
        <SupportContext.Provider value={contextValue}>
            {children}
        </SupportContext.Provider>
    );
};
const useSupportReducer = () => {
    const contextValue = useContext(SupportContext);
    return contextValue;
};

export default useSupportReducer