
/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/10.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import NProgress from 'nprogress'
import { G2 } from '@ant-design/charts';
import useCanvasReducer from "../reducers/useCanvasReducer";
import useSupportReducer from "../reducers/useSupportReducer";
import useFetchDatav from "./useFetchDatav";
import {
    getGlobalCache,
    resetComponents,
    resetDatav,
} from "../common/global_cache";
import useSaveDatav from "./useSaveDatav";
import useSaveComponents from "./useSaveComponents";
import useDeleteComponents from "./useDeleteComponents";
import useFetchComponents from "./useFetchComponents";
import themes from "../common/style/themes";
import {debounce} from "../../utils/util";
import {serializeComponent} from "../utils/util";
import urlUtil from "../../utils/url.util";
// const echarts = require('echarts')

export default function useInit() {

    let [canvas,canvasDispatch] = useCanvasReducer()
    let [support,supportDispatch] = useSupportReducer()
    let {layout,loading} = support

    let fetchComponents = useFetchComponents(res => {
        try{
            let components = {}
            res.forEach(c => {
                let component = JSON.parse(c.data)
                component.i = c.id
                components[component.i] = component
            })
            canvasDispatch({type: 'INIT_COMPONENTS',components})
        }catch(e){
            console.error('组件解析失败',e)
        }

    })
    let fetchDatav = useFetchDatav(res => {
        if(res.data){
            let params = urlUtil.getParamObjByUrl()
            document.title = res.name
            res.data.id = window._datav_id
            res.data.name = res.name
            res.data.variables = Object.assign(res.data.variables || {},params)
            canvasDispatch({type: 'INIT_DATAV',datav:res.data})
            fetchComponents(window._datav_id)
        }
    })
    useEffect(() => {
        //window.datav_id 在html中定义
        fetchDatav(window._datav_id)
    },[])

    useEffect(() => {
        if(loading)
            NProgress.start();
        else
            NProgress.done();
    },[loading])
}
export function useAutoCommit() {

    let [doCommit,setDoCommit] = useState({dbc: null})
    let [canvas] = useCanvasReducer()
    let saveDatav = useSaveDatav()
    let saveComponents = useSaveComponents()
    let deleteComponents = useDeleteComponents()

    useEffect(() => {
        let func = debounce((canvas) => {
            let {components} = canvas
            let cache = getGlobalCache()
            let {needCommitDatav,addedIds,changedIds,deletedIds} = cache
            if(needCommitDatav){
                //保存datav
                saveDatav(canvas)
                resetDatav()
            }
            deletedIds = [...deletedIds]
            addedIds = [...addedIds].filter(c => deletedIds.indexOf(c) < 0)
            changedIds = [...changedIds].filter(c => deletedIds.indexOf(c) < 0)
            if(addedIds.length || changedIds.length){
                let updates = []
                addedIds.forEach(id => {
                    let component = serializeComponent(components[id],canvas.id)
                    component.create = true
                    updates.push(component)
                })
                changedIds.forEach(id => updates.push(serializeComponent(components[id],canvas.id)))
                //更新组件
                saveComponents(updates)
            }
            if(deletedIds.length){
                //删除组件
                deleteComponents(deletedIds)
            }
            if(addedIds.length || changedIds.length || deletedIds.length)
                resetComponents()
        },3000)
        setDoCommit({dbc: func})
    },[])
    useEffect(() => {
        doCommit.dbc && doCommit.dbc(canvas)
    },[canvas])
}

export function useWindowSizeChange(elementId){

    let [width,setWidth] = useState(0)
    let [height,setHeight] = useState(0)

    useEffect(() => {
        //监听屏幕大小改变
        let resizeObserver = new ResizeObserver(entries => {
            setWidth(entries[0].target.clientWidth)
            setHeight(entries[0].target.clientHeight)
        })
        resizeObserver.observe(document.getElementById(elementId))
    },[])
    return [width,height]
}
export function useRegisterChartTheme(){

    useEffect(() => {
        Object.keys(themes).forEach(name => {
            let theme = themes[name]
            echarts.registerTheme(name,theme.value())
            if(theme.antv)
                G2.registerTheme(name,theme.antv())
        })
    },[])
}
