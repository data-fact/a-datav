import useCanvasReducer from "../../reducers/useCanvasReducer";
import useUpdateComponent from "../useUpdateComponent";
import useFilterData from "../useFilterData";
import {updateDataAndFieldStatus} from "../../utils/util";

/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/21.
 * Description:
 * Modified By:
 */

export default function useHandleData(){

    let filterData = useFilterData()

    return (id,component,data,variables) => {
        // let {_data_fields_or:dataFieldMap,_data_filters:dataFilters,_variables} = component
        // let {dataFieldMap: _data_fields_or,data: _data,ok} = updateDataAndFieldStatus(dataFieldMap,data)
        component._data_cache = data
        // if(ok)
        filterData(
            id,
            component,
            variables
        )
        // else
        //     updateComponent(id,{_data_status: 2})
    }
}