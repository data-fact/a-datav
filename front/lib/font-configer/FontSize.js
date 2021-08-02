/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/19.
 * Description:
 * Modified By:
 */
import React,{useEffect,useState} from 'react'
import {Button,Popover,Row,Col}from 'antd4'
import { UpOutlined,DownOutlined } from '@ant-design/icons';
import AInputNumber from "../input-number/AInputNumber";

const sizes = [
    [12,14,16],
    [18,20,24],
    [28,30,32],
    [36,40,48],
    [56,64,72],
    [96,120,144],
]
export default function FontSize({size,onChange}){

    let [visible,setVisible] = useState(false)

    function handleClick(size) {
        setVisible(false)
        onChange(size)
    }

    return (
        <Popover
            title="选择字号"
            trigger="click"
            visible={visible}
            onVisibleChange={setVisible}
            content={
                <div style={{width: 200}}>
                    <Row>
                        <Col span={24} style={{display: 'flex',justifyContent: 'center'}}>
                            <AInputNumber unit="px" value={size} onBlur={size => onChange(size)}/>
                        </Col>
                    </Row>
                    {
                        sizes.map(s1 => (
                            <Row>
                                {
                                    s1.map(s => (
                                        <Col span={8}>
                                            <Button
                                                style={{width: '100%',margin: 5}}
                                                type={s == size ? 'primary' : ''}
                                                onClick={() => handleClick(s)}
                                            >
                                                { s }
                                            </Button>
                                        </Col>
                                    ))
                                }
                            </Row>
                        ))
                    }
                </div>
            }
        >
            <Button>
                <span style={{width: 50}}>{size || '字号'}</span>
                {
                    visible ?
                        <UpOutlined />:
                        <DownOutlined />
                }
            </Button>
        </Popover>
    )
}