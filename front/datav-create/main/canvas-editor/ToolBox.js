/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/19.
 * Description:
 * Modified By:
 */
import React,{useState} from 'react'
import {Tooltip,Card,Switch,Button} from 'antd4'
import { BgColorsOutlined,FullscreenOutlined,GlobalOutlined } from '@ant-design/icons';
import BeautifyBox from "./BeautifyBox";

export default function ToolBox({viewModel,onViewModelChange,onShowVariables,onThemeChange,onSeriesColorsChange,onFiltersChange}){

    let [beautifyShow,setBeautifyShow] = useState(false)

    function handleFullScreen() {
        document.getElementById('datav-canvas-main').requestFullscreen()
    }

    return (
        <>
            <Card
                size="small" bordered={false}
            >
                {/*<div>*/}
                {/*    主题，滤镜，全局变量，查看模式*/}
                {/*</div>*/}
                <Tooltip placement="bottom" title="美化工具箱">
                    <Button type="primary" shape="round" icon={<BgColorsOutlined/>} size="small" onClick={e => {
                        setBeautifyShow(true)
                        // dispatch({type: 'CHANGE_THEME',theme: 'default'})
                    }} >
                        美化
                    </Button>
                </Tooltip>

                <Tooltip placement="bottom" title="全屏">
                    <FullscreenOutlined
                        style={{float: 'right',margin: 5}}
                        onClick={handleFullScreen}
                    />
                </Tooltip>
                <Tooltip placement="bottom" title="查看全局变量">
                    <GlobalOutlined
                        style={{float: 'right',margin: 5}}
                        onClick={onShowVariables}
                    />
                </Tooltip>
                <Switch
                    style={{float: 'right',margin: 5}}
                    size="small" checkedChildren="编辑模式" unCheckedChildren="查看模式"
                    checked={viewModel}
                    onChange={onViewModelChange}
                />
            </Card>
            <BeautifyBox
                visible={beautifyShow}
                onClose={() => setBeautifyShow(false)}
                onThemeChange={onThemeChange}
                onSeriesColorsChange={onSeriesColorsChange}
                onFiltersChange={onFiltersChange}
            />
        </>
    )
}