/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/1/22.
 * Description:
 * Modified By:
 */
import React,{useState} from 'react'
import {Collapse,Tooltip,Row,Col} from 'antd4'
import { QuestionCircleOutlined } from '@ant-design/icons';
import ShowHideConfig from "../../../common/ShowHideConfig";
import {SHOW_HIDE_TYPE} from "../../../common/constant";
const {Panel} = Collapse

export default function ShowHideWarp({variables,onChange}){

    let [show,setShow] = useState(null)
    let [showVar,setShowVar] = useState(undefined)
    let [showEval,setShowEval] = useState('return !!value')

    function handleChange(key,value) {
        let defEval
        switch(key){
            case '_show':
                setShow(value)
                if(value == SHOW_HIDE_TYPE.custom)
                    defEval = showEval
                break
            case '_show_var':
                setShowVar(value)
                break
            case '_show_eval':
                setShowEval(value)
        }
        onChange(key,value,defEval)
    }

    return (
        <Collapse bordered={false} size="small">
            <Panel
                key="show-hide"
                header={
                    <>
                        显示/隐藏
                        <Tooltip placement="top" title="会覆盖组件内的显示/隐藏配置">
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </>
                }
            >
                <ShowHideConfig
                    i="multi-show-hide"
                    _show={show}
                    _show_var={showVar}
                    _show_eval={showEval}
                    variables={variables}
                    onChange={handleChange}
                />
            </Panel>
        </Collapse>
    )
}