/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/14.
 * Description:
 * Modified By:
 */
import React,{useEffect,useRef,useState} from 'react'
import update from 'immutability-helper';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

export default function Editor({id,options = {},value = '',suggestions = [], onChange,onBlur}){

    const editorRef = useRef(null)
    const [editorIns,setEditorIns] = useState(null)
    let [blurValue,setBlurValue] = useState('')
    useEffect(() => {
        if(blurValue){
            onBlur && onBlur(blurValue)
        }
    },[blurValue])

    options = update({
        value,
        language: 'javascript',
        lineNumbersMinChars:0,
        folding: true,
        theme: 'vs-dark',
        scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 10,
        },
        formatOnPaste: true,
        renderValidationDecorations: 'on',
    },{$merge: options})

    function createIns(){
        if (editorRef.current) {
            if(editorIns)
                editorIns.dispose()
            let myEditor = monaco.editor.create(editorRef.current, options)
            myEditor.onDidBlurEditorText(() => {
                setBlurValue(myEditor.getValue())
                // onBlur && onBlur(
                //     // myEditor.getContainerDomNode().getAttribute('_id'),
                //     myEditor.getValue()
                // )
            })
            myEditor.onKeyUp(() => {
                onChange && onChange(
                    // myEditor.getContainerDomNode().getAttribute('_id'),
                    myEditor.getValue()
                )
            })

            setEditorIns(myEditor);
        }
    }

    // useEffect(() => {
    //     createIns()
    // }, [editorRef]);
    useEffect(() => {
        createIns()
    },[id])
    useEffect(() => {
        if(editorIns)
            editorIns.setValue(value)
    },[value])
    useEffect(() => {
        if(editorIns)
            editorIns.updateOptions(options)
    },[options])
    useEffect(() => {
        monaco.languages.registerCompletionItemProvider('javascript', {
            provideCompletionItems: function(model, position) {
                //自定义匹配逻辑....
                // var textUntilPosition = model.getValueInRange({
                //     startLineNumber: 1,
                //     startColumn: 1,
                //     endLineNumber: position.lineNumber,
                //     endColumn: position.column
                // });
                // var match = textUntilPosition.match(/\s*$/);
                // var suggestions = match ? [
                //     {
                //         label: 'context', //显示的提示名称
                //         insertText: 'context' //选择后粘贴到编辑器中的文字
                //     },
                //     {
                //         label: 'abc', //显示的提示名称
                //         insertText: 'def' //选择后粘贴到编辑器中的文字
                //     },
                //     {
                //         label: 'acd', //显示的提示名称
                //         insertText: '123' //选择后粘贴到编辑器中的文字
                //     }
                // ] : [];
                return {
                    suggestions:suggestions.map(s => {
                        if(typeof s == 'object'){
                            s.kind = monaco.languages.CompletionItemKind.Function
                            return s
                        }
                        return {
                            label: s,
                            insertText: s,
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: '全局变量'
                        }
                    })
                };
            },
            triggerCharacters: [] // 写触发提示的字符，可以有多个
        })
    },[suggestions])

    return (
        <div key={id} style={{width: '100%',height: '100%'}} ref={editorRef}></div>
    )
}