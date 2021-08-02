/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/15.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Row,Col,Button,Input,Card} from 'antd4'
import { UploadOutlined,DeleteOutlined } from '@ant-design/icons';
import {genImageUrl} from "../../../../utils/util";
import {emptyImage} from "../../../../utils/util";

export default function CoverConfiger({url:storeUrl,onCut,onChange}){

    let [url,setUrl] = useState('')
    useEffect(() => setUrl(storeUrl),[storeUrl])

    return (
        <>
            <Row>
                <Col span={6}>封面</Col>
                <Col span={18}>
                    <Input
                        size="small"
                        placeholder={'输入图片地址'}
                        value={url}
                        onChange={e => {setUrl(e.target.value)}}
                        onBlur={e => onChange(e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={6}></Col>
                <Col span={18}>
                    <Button size="small" onClick={onCut}>
                        <UploadOutlined /> 截取封面
                    </Button>
                    <Button
                        style={{borderColor: '#ff4d4f', color: '#ff4d4f'}}
                        size="small" type="dashed" icon={<DeleteOutlined/>}
                        onClick={() => onChange('')}
                    >删除</Button>
                </Col>
            </Row>
            <Row>
                <Col span={2}></Col>
                <Col span={22}>
                    <Card>
                        <div
                            className={"datav-background"}
                            style={{
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundSize: 'contain', height: 100,
                                backgroundImage: url ? `url(${genImageUrl(url)})` : `url(${genImageUrl(emptyImage)})`
                            }}
                        >
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    )
}