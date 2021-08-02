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
import {Input,Select,Tabs,Card,Button,Tooltip,Checkbox} from 'antd4'
import ApiParamTable from "./ApiParamTable";
import VscodeEditor from "../../../../../lib/vscode-editor/VscodeEditor";
import {colors} from "../../../../common/common";
import urlUtil from "../../../../../utils/url.util";

const { Option } = Select
const { TabPane } = Tabs

export default function ApiDataConfiger({id,config:storeConfig,variables,onChange}){

    let [saved,setSaved] = useState(true)
    let [config,setConfig] = useState(storeConfig)

    useEffect(() => setConfig(storeConfig),[storeConfig])

    let {method,url,params,body,show_loading} = config

    function handleMethodChange(method) {
        setSaved(false)
        setConfig({...config,method})
    }
    function handleUrlChange(url) {
        setSaved(false)
        let params = urlUtil.getParamsByUrl(url)
        setConfig({...config,url,params})
    }
    function handleParamsChange(params) {
        setSaved(false)
        let index = url.indexOf('?')
        if(index >= 0)
            url = url.substr(0,index)
        if(params.length)
            url = url + '?' + params.map(p => `${p.name}=${p.value}`).join('&')
        setConfig({...config,url,params})
    }
    function handleBodyChange(body) {
        setSaved(false)
        setConfig({...config,body})
    }
    function handleShowLoadingChange(show_loading) {
        setSaved(false)
        setConfig({...config,show_loading})
    }
    function handleSave() {
        setSaved(true)
        onChange(config)
    }
    function handleReset() {
        setSaved(true)
        setConfig(storeConfig)
    }

    return (
        <>
            <Input
                placeholder="请求URL,支持${vars.key}取值全局变量"
                addonBefore={
                    <Select
                        style={{ width: 90 }}
                        value={method}
                        onChange={value => handleMethodChange(value)}
                    >
                        <Option value="POST">POST</Option>
                        <Option value="GET">GET</Option>
                    </Select>
                }
                value={url}
                onChange={e => handleUrlChange(e.target.value)}
            />
            <Tabs defaultActiveKey="1">
                <TabPane
                    key="1"
                    tab={
                        <Tooltip placement="bottom" title="支持${vars.key}取值全局变量">
                            <span>请求参数</span>
                        </Tooltip>
                    }
                >
                    <ApiParamTable params={params} variables={variables} onChange={handleParamsChange}/>
                </TabPane>
                <TabPane
                    key="2"
                    tab={
                        <Tooltip placement="bottom" title="支持${vars.key}取值全局变量">
                            <span>请求体</span>
                        </Tooltip>
                    }
                >
                    <VscodeEditor
                        id={id}
                        height={180}
                        suggestions={Object.keys(variables).map(v => `vars.${v}`)}
                        options={{language: 'json',minimap: {enabled: false}}}
                        value={body}
                        onBlur={value => handleBodyChange(value)}
                        onChange={() => setSaved(false)}
                    />
                </TabPane>
            </Tabs>
            <Checkbox checked={show_loading} onChange={e => handleShowLoadingChange(e.target.checked)}>
                显示加载中状态
            </Checkbox>
            <Card size="small" bodyStyle={{padding: 0}}>
                {
                    saved ?
                        null :
                        <>
                            <span style={{color: colors.error}}>未保存</span>
                            <Button
                                style={{float: 'right'}} size="small" type="primary"
                                onClick={() => handleSave()}
                            >
                                保存
                            </Button>
                        </>
                }
                <Button
                    style={{float: 'right'}} size="small" type="ghost"
                    onClick={() => handleReset()}
                >
                    重置
                </Button>
            </Card>
        </>
    )
}