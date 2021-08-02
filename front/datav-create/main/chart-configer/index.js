/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Card} from 'antd4'
import ScreenConfiger from "./ScreenConfiger";
import useSupportReducer from "../../reducers/useSupportReducer";
import CommonConfiger from "./CommonConfiger";
import useCanvasReducer from "../../reducers/useCanvasReducer";
import MultiConfiger from "../../components/screen/multi-configer";

export default function ChartConfiger(){

    let [canvas,canvasDispatch] = useCanvasReducer()
    let [support,supportDispatch] = useSupportReducer()
    let {focusId,filters,variables,components} = canvas

    function handleAddComponent(id,component){
        canvasDispatch({type: 'ADD_COMPONENT',id,component})
    }
    function handleChangeFocusId(id) {
        canvasDispatch({type: 'CHANGE_FOCUS_ID', focusId: [id]})
    }

    if(focusId.length == 1){
        return (
            <>
                {
                    focusId[0] == 'screen' ?
                        <ScreenConfiger/>
                        :
                        <CommonConfiger
                            variables={variables}
                            filters={filters}
                            component={components[focusId[0]]}
                            onAddComponent={handleAddComponent}
                            onChangeFocusId={handleChangeFocusId}
                        />
                }

            </>
        )
    } else {
        return <MultiConfiger/>
    }

}