/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/29.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import update from 'immutability-helper';
import VscodeEditor from "../../../../../lib/vscode-editor/VscodeEditor";

export default function StaticDataConfiger({id,config,onChange}){

    function handleBlur(val) {
        onChange(update(config,{data: {$set: val}}))
    }

    return (
        <VscodeEditor
            id={id}
            height={180}
            options={{language: 'json',minimap: {enabled: false}}}
            value={config.data}
            onBlur={handleBlur}
        />
    )
}