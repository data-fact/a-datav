/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/15.
 * Description:
 * Modified By:
 */
import React,{useState} from 'react'
// import {Tabs} from 'antd4'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useUpdateComponent from "../../../../hooks/useUpdateComponent";
import useHandleEvent from "../../../../hooks/useHandleEvent";
import useGetColors from "../../../../hooks/useGetColors";
import {genColorStyle} from "../../../../utils/util";
// const {TabPane} = Tabs

const useStyles = makeStyles({
    defaultStyle: props => props.defaultStyle,
    selectedStyle: props => props.selectedStyle,
    indicator: props => props.indicator
});
export default function Renderer({component}){

    let {i:id,_ready,h,_data:data,indicator,defaultStyle,selectedStyle} = component
    let seriesColors = useGetColors()
    let colorStyle = genColorStyle(indicator.colors,seriesColors,1,90)
    const classes = useStyles({
        defaultStyle: {...defaultStyle,height:h,minHeight:0},
        selectedStyle: {...selectedStyle},
        indicator: {
            borderColor: colorStyle.color,borderImage: colorStyle.gradientColor,borderBottomWidth: indicator.width,
            borderBottomStyle: 'solid', height: '100%'
        }
    });
    let [tmpActiveKey,setTmpActiveKey] = useState(undefined)
    let handleEvent = useHandleEvent()

    if(!_ready)
        return null

    function handleChange(e,key){
        setTmpActiveKey(key)
        let index = data.findIndex(d => d.key == key)
        handleEvent(id,'click',null,index)
    }

    let activeRecord = data.find(d => d.active)
    if(activeRecord)
        tmpActiveKey = activeRecord.key
    else if(tmpActiveKey == undefined && data[0])
        tmpActiveKey = data[0].key

    return (
        // <AppBar position="static" color="">
            <Tabs
                value={tmpActiveKey}
                onChange={handleChange}
                indicatorColor=""
                variant="scrollable"
                scrollButtons="auto"
            >
                {
                    data.map(record => {
                        let classeObj = {selected: classes.selectedStyle,root: classes.defaultStyle}
                        if(record.key == tmpActiveKey)
                            classeObj.wrapper = classes.indicator
                        return <Tab
                            classes={classeObj}
                            label={record.name} value={record.key}
                        />
                    })
                }
            </Tabs>
        // </AppBar>
    )
}