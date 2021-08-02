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
import Main from "./main/Main";
import {SupportProvider} from "./reducers/useSupportReducer";
import {CanvasProvider} from "./reducers/useCanvasReducer";

export default function Context() {

    return (
        <SupportProvider>
            <CanvasProvider>
                <Main/>
            </CanvasProvider>
        </SupportProvider>
    )
}