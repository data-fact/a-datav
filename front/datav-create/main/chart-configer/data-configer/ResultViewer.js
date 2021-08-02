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
import VscodeEditor from "../../../../lib/vscode-editor/VscodeEditor";

export default function ResultViewer({id,data}){

    return (
        <VscodeEditor
            id={id}
            height={180}
            options={{language: 'json',minimap: {enabled: false},readOnly: true}}
            value={JSON.stringify(data,null,2)}
        />
    )
}