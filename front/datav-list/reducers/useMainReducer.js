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
    loading: false,
    saveLoading: false,
    showCreateNew: false,
    showMoveModel: false,
    moveId: undefined,
    showCopyModel: false,
    copyId: undefined,
    showCopyTemplateModel: false,
    copyTemplateId: undefined,
    showTemplateModel: false,
    showQRCodeModel: false,
    moveFolderId: undefined,
    list: [],
    folderList: [],
    templateList: [],
    checkedGroupId: 'all',
    user: null
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return update(state,{loading: {$set: action.loading}})
        case 'SET_SAVE_LOADING':
            return update(state,{saveLoading: {$set: action.loading}})
        case 'SET_SHOW_CREATE_NEW':
            return update(state,{showCreateNew: {$set: action.show}})
        case 'SET_MOVE_MODEL':
            return update(state,{
                showMoveModel: {$set: action.show},
                moveId: {$set: action.id}
            })
        case 'SET_COPY_MODEL':
            return update(state,{
                showCopyModel: {$set: action.show},
                copyId: {$set: action.id}
            })
        case 'SET_COPY_TEMPLATE_MODEL':
            return update(state,{
                showCopyTemplateModel: {$set: action.show},
                copyTemplateId: {$set: action.id}
            })
        case 'SET_SHOW_TEMPLATE_MODEL':
            return update(state,{showTemplateModel: {$set: action.show}})
        case 'SET_MOVE_FOLDER_ID':
            return update(state,{moveFolderId: {$set: action.id}})
        case 'SET_LIST':
            return update(state,{list: {$set: action.list}})
        case 'SET_FOLDER_LIST':
            return update(state,{folderList: {$set: action.list}})
        case 'SET_TEMPLATE_LIST':
            return update(state,{templateList: {$set: action.list}})
        case 'SET_CHECKED_GROUP_ID':
            return update(state,{checkedGroupId: {$set: action.groupId}})
        case 'SET_USER':
            return update(state,{user: {$set: action.user}})
        default: throw new Error('Unexpected action');
    }
};
const Context = React.createContext();

export const Provider = ({ children }) => {
    const contextValue = useReducer(reducer, JSON.parse(JSON.stringify(initialState)));

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};
const useMainReducer = () => {
    const contextValue = useContext(Context);
    return contextValue;
};

export default useMainReducer