/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/30.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Input,Card,Button} from 'antd4'
import {colors} from "../../../../common/common";
import VscodeEditor from "../../../../../lib/vscode-editor/VscodeEditor";

const { TextArea } = Input

export default function FilterEditor({id,filter,variables,onSave,onCancel}){

    let {value:storeValue,notSave,native} = filter
    let [value,setValue] = useState("")
    let [tmpValue,setTmpValue] = useState("")
    let [saved,setSaved] = useState(true)

    useEffect(() => {
        setValue(storeValue)
        setTmpValue(storeValue)
    },[storeValue])
    useEffect(() => {
        setSaved(!notSave)
    },[notSave])

    function handleChange(value){
        setValue(value)
        if(saved)
            setSaved(false)
    }
    function handleSave() {
        onSave(tmpValue)
        setSaved(true)
    }
    function handleCancel() {
        if(native || saved)
            onCancel()
        else{
            setValue(storeValue)
            setSaved(true)
        }
    }

    return (
        <>
            <VscodeEditor
                id={id}
                height={180}
                suggestions={Object.keys(variables).map(v => `vars.${v}`)}
                header="filter(data,vars)"
                options={{language: 'javascript',minimap: {enabled: false}}}
                value={value}
                // onBlur={handleChange}
                onChange={val => {
                    setTmpValue(val)
                    saved && setSaved(false)
                }}
            />
            <Card size="small" bodyStyle={{padding: 0}}>
                {
                    saved ?
                        null :
                        <span style={{color: colors.error}}>未保存</span>
                }
                <Button
                    style={{float: 'right'}} size="small" type="primary"
                    onClick={handleSave}
                >
                    {
                        native ? '完成' : '保存'
                    }
                </Button>
                <Button
                    style={{float: 'right'}} size="small" type="ghost"
                    onClick={handleCancel}
                >
                    {
                        native ? '移除' :
                            saved ? '取消' : '撤销'
                    }
                </Button>
            </Card>
        </>
    )
}