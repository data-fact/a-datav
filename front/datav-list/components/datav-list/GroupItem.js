/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/17.
 * Description:
 * Modified By:
 */
import React,{useRef,useState,useEffect} from 'react'
import {Input,Popconfirm} from 'antd4'
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { useHover,useControllableValue } from 'ahooks';

export default function GroupItem({folder,count,checkedGroupId,onClick,onChange,onDelete}){

    const ref = useRef();
    const isHovering = useHover(ref);
    const [edit,setEdit] = useState(false)
    let [name,setName] = useState('')
    useEffect(() => setName(folder.name),[folder.name])

    function handleEditClick() {
        setEdit(!edit)
    }
    function handleBlur(value){
        setEdit(false)
        onChange(folder.id,value)
    }
    function handleDelete(){
        onDelete(folder.id)
    }

    let style = {cursor: 'pointer', padding: '10px', width: '100%'}
    if(checkedGroupId == folder.id)
        style.backgroundImage = 'linear-gradient(90deg, #177ddc, transparent)'
    else if(isHovering)
        style.color = '#177ddc'

    return <p
        ref={ref} style={style}
        onClick={() => onClick(folder.id)}
    >
        <span className="span-ellipsis" style={{width: '70%'}}>
        {
            edit ?
                <Input
                    style={{background: 'rgb(23, 27, 34)'}}
                    size="small" value={name}
                    onChange={e => setName(e.target.value)}
                    onBlur={e => handleBlur(e.target.value)}
                /> :
                folder.name
        }
        </span>
        <span
            className="span-ellipsis"
            style={{width: '30%', textAlign: 'right'}}
        >
            {
                 folder.id !== '' && folder.id != 'all' && (isHovering || checkedGroupId == folder.id) ?
                    <>
                        <EditOutlined style={{paddingRight: 8}} onClick={handleEditClick}/>
                        <Popconfirm placement="top" title={'确定删除？'}
                                    onConfirm={handleDelete}
                                    okText="是" cancelText="否">
                            <DeleteOutlined/>
                        </Popconfirm>
                    </>
                    :
                    count
            }
        </span>
    </p>
}