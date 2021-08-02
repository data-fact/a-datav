/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/15.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect,useRef} from 'react'
import {Card,Divider,Input,Select} from 'antd4'
import { SearchOutlined } from '@ant-design/icons';
import { useVirtualList } from 'ahooks';
import ListItem, {CreaterItem} from "./ListItem";
import useMainReducer from "../../reducers/useMainReducer";
const { Option } = Select

const itemHeight = 250
const marginTop = 210
export default function ListContainer({list}){

    let [main] = useMainReducer()
    let [height,setHeight] = useState(0)

    let [searchText,setSearchText] = useState('')
    let [sortBy,setSortBy] = useState('createTime')

    let containerRef = useRef(null)

    useEffect(() => {
        //监听屏幕大小改变
        let resizeObserver = new ResizeObserver(entries => {
            setHeight(document.body.offsetHeight - marginTop)
        })
        resizeObserver.observe(document.body)
    },[])

    if(main.checkedGroupId != 'all')
        list = list.filter(l => (l.folderId || '') == main.checkedGroupId)
    if(searchText)
        list = list.filter(l => l.name.indexOf(searchText) >= 0)
    list = list.sort((l1,l2) => ('' + l1[sortBy]).localeCompare('' + l2[sortBy]))
    list = ['creater',...list]

    let rowLength = 4
    if(containerRef.current)
        rowLength = Math.floor(containerRef.current.offsetWidth / 250)
    let listLength = list.length < rowLength + 1 ? rowLength + 1 : list.length
    const { list:rows, containerProps, wrapperProps } = useVirtualList(Array.from(Array(Math.ceil(listLength / rowLength)).keys()), {
        overscan: 10,
        itemHeight: itemHeight,
    });

    let checkedFolderName
    if(main.checkedGroupId == 'all')
        checkedFolderName = '全部应用'
    else if(!main.checkedGroupId)
        checkedFolderName = '未分组'
    else{
        let checkedFolder = main.folderList.find(folder => folder.id == main.checkedGroupId)
        checkedFolderName = checkedFolder ? checkedFolder.name : ''
    }

    return (
        <Card
            className="transparent-card" size="small"
            style={{paddingLeft: 10}}
            title={
                <span style={{color: '#177ddc'}}>
                    <Divider
                        type="vertical"
                        style={{height: '1.4em',borderLeft: '3px solid #177ddc'}}
                    />
                    {checkedFolderName}
                </span>
            }
            extra={
                <div style={{display: 'flex'}}>
                    <Input
                        placeholder="搜索" suffix={<SearchOutlined />}
                        onBlur={e => setSearchText(e.target.value)}
                    />
                    <Select
                        value={sortBy} style={{ width: 200 }}
                        onChange={val => setSortBy(val)}
                    >
                        <Option value="name">按名称排序</Option>
                        <Option value="createTime">按创建时间排序</Option>
                        <Option value="modifyTime">按修改时间排序</Option>
                    </Select>
                </div>
            }
        >
            <div
                {...containerProps} style={{height,...containerProps.style}} id="list-container"
                ref={ref => {
                    containerRef['current'] = ref
                    containerProps.ref(ref)
                }}
            >
                <div {...wrapperProps}>
                    {
                        rows.map((item,i) => {
                            return <div style={{
                                display: 'flex',
                                // justifyContent: i == rows.length - 1 ? '' : 'space-around',
                                height: itemHeight
                            }}>
                                {
                                    Array(rowLength).fill(0).map((a,i) => {
                                        let sub = list[item.index * rowLength + i]
                                        if(!sub) return null
                                        if(sub === 'creater')
                                            return <CreaterItem/>
                                        return <ListItem item={sub}/>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
            </div>
        </Card>
    )
}