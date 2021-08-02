/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import update from 'immutability-helper';
import FieldMapConfiger from "./FieldMapConfiger";
import useUpdateComponent from "../../../hooks/useUpdateComponent";
import ResultConfiger from "./ResultConfiger";
import DataSourceDrawer from "./DataSourceDrawer";
import useUpdateData from "../../../hooks/use-update-data/useUpdateData";
import useFilterData from "../../../hooks/useFilterData";

export default function DataConfiger({filters,variables,component}){

    let {i:id,_name:name,_typeName:typeName,_ready:ready} = component

    let [visible,setVisible] = useState(false)

    let updateComponent = useUpdateComponent()
    let filterData = useFilterData()

    if(!ready)
        return null

    function handleUpdate(fieldMap) {
        updateComponent(id,fieldMap)
        filterData(id,update(component,{$merge: fieldMap}))
    }

    return (
        <>
            <FieldMapConfiger component={component} onChange={handleUpdate}/>
            <ResultConfiger component={component} onShowDataSource={() => setVisible(true)}/>
            <DataSourceDrawer
                visible={visible}
                filters={filters}
                variables={variables}
                component={component}
                onChange={handleUpdate}
                onClose={() => setVisible(false)}
            />
        </>
    )
}