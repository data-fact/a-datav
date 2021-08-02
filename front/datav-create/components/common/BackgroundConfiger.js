/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/18.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import update from 'immutability-helper';
import {Button,Row,Col,Radio,Input,Upload,Card,Select,Slider,InputNumber,notification} from 'antd4'
import { DeleteOutlined,PlusOutlined,UploadOutlined } from '@ant-design/icons';
import Palette from "../../../lib/palette/Palette";
import {genImageUrl} from "../../../utils/util";
import {BACKGROUND_REPEAT_TYPE, BACKGROUND_TYPE, GRADIENT_TYPE} from "../../common/constant";
import AInputNumber from "../../../lib/input-number/AInputNumber";
import {getBackgroundImageStyle} from "../../utils/util";

export default function BackgroundConfiger(
    {
        id,type,onTypeChange,
        color,onColorChange,image,onImageChange,
        gradient,onGradientChange,
        borderRadius,onBorderRadiusChange,
        repeatType,onRepeatTypeChange
    }){

    function handleColorChange(rgba) {
        onColorChange(rgba)
    }

    let [uploading,setUploading] = useState(false)
    let [url,setUrl] = useState('')
    let [gradientAngle,setGradientAngle] = useState(0)

    useEffect(() => {
        setUrl(image)
    },[image])
    useEffect(() => {
        setGradientAngle(gradient.angle)
    },[gradient])

    function handleChange(res) {
        let {response,status} = res.file
        if(status == 'uploading')
            setUploading(true)
        if(status == 'error'){
            setUploading(false)
            notification.warn({message: '上传失败',description: response})
        }
        if(status == 'done'){
            setUploading(false)
            onImageChange(response)
        }
    }

    function handleGradientTypeChange(type) {
        onGradientChange(update(gradient,{type: {$set: type}}))
    }
    function handleGradientAngleChange(angle) {
        onGradientChange(update(gradient,{angle: {$set: angle}}))
    }
    function handleAddGradientColor() {
        let colors = [...gradient.colors,'rgba(138,170,251,1)']
        onGradientChange(update(gradient,{colors: {$set: colors}}))
    }
    function handleUpdateGradientColor(index,rgba) {
        let colors = [...gradient.colors]
        colors[index] = rgba
        onGradientChange(update(gradient,{colors: {$set: colors}}))
    }
    function handleDeleteGradientColor(index) {
        let colors = [...gradient.colors]
        colors.splice(index,1)
        onGradientChange(update(gradient,{colors: {$set: colors}}))
    }

    let style = getBackgroundImageStyle({
        bgType:type, gradient, color, image, borderRadius, repeatType, size: 'contain'
    })
    return (
        <Radio.Group
            size="small" value={type} style={{fontSize: 14}}
            onChange={e => onTypeChange(e.target.value)}
        >
            <Row>
                <Col span={8}>背景圆角</Col>
                <Col span={14}>
                    <AInputNumber
                        options={{size: 'small',min: 0}}
                        unit="px" value={borderRadius}
                        onBlur={onBorderRadiusChange}
                    />
                </Col>
            </Row>
            <div style={{marginBottom: 8}}>
            <Row>
                <Col span={8}>
                    <Radio
                        value={BACKGROUND_TYPE.color}
                    >背景颜色</Radio>
                </Col>
                <Col span={14}>
                    <Palette
                        title="背景颜色" color={color}
                        onChange={handleColorChange}
                        onDelete={() => handleColorChange('')}
                    />
                </Col>
            </Row>
            </div>
            <div style={{marginBottom: 8}}>
            <Row>
                <Col span={8}>
                    <Radio
                        value={BACKGROUND_TYPE.gradient}
                    >背景渐变色</Radio>
                </Col>
                <Col span={14}>
                    <Select
                        size="small"
                        style={{width: 200}}
                        placeholder="渐变类型"
                        value={gradient.type}
                        onChange={handleGradientTypeChange}
                    >
                        <Select.Option value={GRADIENT_TYPE.linear}>线性渐变</Select.Option>
                        <Select.Option value={GRADIENT_TYPE.radial}>径向渐变</Select.Option>
                    </Select>
                </Col>
            </Row>
            {
                gradient.type == GRADIENT_TYPE.linear &&
                <Row>
                    <Col span={2}></Col>
                    <Col span={5}>渐变角度</Col>
                    <Col span={8}>
                        <Slider
                            style={{margin: 10}}
                            min={0}
                            max={360}
                            value={gradientAngle}
                            onChange={setGradientAngle}
                            onAfterChange={handleGradientAngleChange}
                        />
                    </Col>
                    <Col span={8}>
                        <AInputNumber
                            options={{style:{margin: 5},min:0,max: 360}}
                            unit={'度'} value={gradientAngle}
                            // onChange={setGradientAngle}
                            onBlur={handleGradientAngleChange}
                        />
                    </Col>
                </Row>
            }
                <Row>
                    <Col span={2}></Col>
                    <Col span={6}>渐变色</Col>
                </Row>
                <Row>
                    <Col span={2}></Col>
                    <Col span={22} style={{display: 'flex',flexWrap: 'wrap'}}>
                    {
                        gradient.colors.map((color,i) => (
                            <Palette
                                color={color}
                                onChange={color => handleUpdateGradientColor(i,color)}
                                onDelete={() => handleDeleteGradientColor(i)}
                            />
                        ))
                    }
                    </Col>
                </Row>
                <Row>
                    <Col span={2}></Col>
                    <Col span={22}>
                        <Button
                            style={{width: '100%',margin: '10px 0 10px 0'}}
                            size="small" type="dashed" icon={<PlusOutlined/>}
                            onClick={handleAddGradientColor}
                        >添加渐变色</Button>
                    </Col>
                </Row>

            </div>
            <div style={{marginBottom: 8}}>
            <Row>
                <Col span={8}>
                    <Radio
                        value={BACKGROUND_TYPE.image}
                    >背景图</Radio>
                </Col>
                <Col span={14}>
                    <Input
                        size="small"
                        placeholder={'输入图片地址'}
                        value={url}
                        onChange={e => {setUrl(e.target.value)}}
                        onBlur={() => onImageChange(url)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={8}></Col>
                <Col span={14}>
                    <Upload
                        action={`../upload/image/${id}`}
                        accept="image/*"
                        name="image"
                        showUploadList={false}
                        onChange={handleChange}
                    >
                        <Button size="small" loading={uploading}>
                            <UploadOutlined /> 上传背景图
                        </Button>
                    </Upload>
                    <Button
                        style={{borderColor: '#ff4d4f', color: '#ff4d4f'}}
                        size="small" type="dashed" icon={<DeleteOutlined/>}
                        onClick={() => onImageChange('')}
                    >删除</Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card>
                        <div
                            className={"datav-background"}
                            style={{...style,height:100}}
                        >
                        </div>
                        <Radio.Group size="small" value={repeatType} onChange={e => onRepeatTypeChange(e.target.value)}>
                            <Radio.Button value={BACKGROUND_REPEAT_TYPE.adapt}>自适应</Radio.Button>
                            <Radio.Button value={BACKGROUND_REPEAT_TYPE.repeat}>平铺</Radio.Button>
                            <Radio.Button value={BACKGROUND_REPEAT_TYPE.noRepeat}>原图</Radio.Button>
                        </Radio.Group>
                    </Card>
                </Col>
            </Row>
            </div>
        </Radio.Group>
    )
}