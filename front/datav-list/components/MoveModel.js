/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/17.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Modal,Select} from 'antd4'
import useMainReducer from "../reducers/useMainReducer";
import useUpdateDatav from "../hooks/useUpdateDatav";
import useFetchList from "../hooks/useFetchList";
const {Option} = Select

export default function MoveModel(){

    let [main,dispatch] = useMainReducer()
    let fetchList = useFetchList()
    let updateDatav = useUpdateDatav(() => {
        fetchList()
        handleCancel()
    })

    function handleOk() {
        updateDatav({id: main.moveId, folderId: main.moveFolderId})
    }
    function handleCancel() {
        dispatch({type: 'SET_MOVE_MODEL',show: false,id: undefined})
    }
    function handleChangeFolder(id) {
        dispatch({type: 'SET_MOVE_FOLDER_ID',id})
    }
    return (
        <Modal
            title="移动分组"
            visible={main.showMoveModel}
            okText="移动"
            cancelText="取消"
            onCancel={handleCancel}
            onOk={handleOk}
        >
            <Select
                placeholder="选择分组" style={{ width: "100%" }}
                value={main.moveFolderId}
                onChange={handleChangeFolder}
            >
                <Option value={""}>未分组</Option>
                {
                    main.folderList.map(folder => (
                        <Option value={folder.id}>{folder.name}</Option>
                    ))
                }
            </Select>
        </Modal>
    )
}