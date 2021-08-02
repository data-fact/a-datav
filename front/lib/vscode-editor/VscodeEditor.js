/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/13.
 * Description:
 * Modified By:
 */
import React,{useState} from 'react'
import {Typography,Modal,Tooltip}from 'antd4'
import { FullscreenOutlined } from '@ant-design/icons';
import './editor.css'
import Editor from "./Editor";

const { Paragraph } = Typography

export default function VscodeEditor(
    {
        width = '100%',height = '100%',header,
        id,options = {},value = '',suggestions = [],onChange,onBlur
    }){

    let [full,setFull] = useState(false)

    return (
        <>
            {
                header ?
                    <p style={{fontSize: 'small'}} title="function filter(data) {" className="fake-code --start">
                        <span className="--keyword">function</span>{ ` ${header} {`}
                    </p>
                    :
                    null
            }

            <div className="datav-ds-editor" style={{width,height}}>
                <div style={{width: 80}} className="editor-actions">
                    <Paragraph style={{display: 'inline'}} copyable={{ text: value }}></Paragraph>
                    <Tooltip placement="top" title="全屏模式">
                        <FullscreenOutlined title="全屏模式"
                            style={{padding: '0 5px 0 5px',color: '#1890ff'}}
                            onClick={() => setFull(true)}
                        />
                    </Tooltip>
                </div>
                <Editor
                    id={id} options={options} value={value}
                    suggestions={suggestions}
                    onBlur={onBlur}
                    onChange={onChange}
                />
            </div>
            {
                header ?
                    <p style={{fontSize: 'small'}} className="fake-code --end">{`}`}</p>
                    :
                    null
            }
            <Modal
                title="全屏模式"
                width="90%"
                style={{top: 20}}
                visible={full}
                footer={null}
                onCancel={() => setFull(false)}
            >
                <div style={{height: document.body.clientHeight - 150}}>
                    <Editor
                        id={id} options={{...options,minimap: {enabled: true}}} value={value}
                        suggestions={suggestions}
                        onBlur={onBlur}
                        onChange={onChange}
                    />
                </div>
            </Modal>
        </>
    )
}