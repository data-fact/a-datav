/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/11/13.
 * Description:
 * Modified By:
 */
import { DownOutlined } from '@ant-design/icons';
import { Col, Drawer, Dropdown, Menu, Row } from 'antd4';
import React from 'react';
import StyleFilterConfig from "../../../lib/style-filter-config/StyleFilterConfig";
import seriesColors from "../../common/style/series_colors";
import themes from "../../common/style/themes";
import useCanvasReducer from "../../reducers/useCanvasReducer";
import ColorBox from "./ColorBox";

export default function BeautifyBox({ visible, onClose, onThemeChange, onSeriesColorsChange, onFiltersChange }) {

    let [canvas] = useCanvasReducer()

    let { name, bgColor, value } = themes[canvas.theme]
    let colors = value().color || []
    return (
        <Drawer
            title="美化工具箱"
            placement="left"
            width={500}
            onClose={onClose}
            visible={visible}
        >
            <div style={{ marginBottom: 8 }}>
                <Row>
                    <Col span={6}>图表主题</Col>
                    <Col span={18}>
                        <Dropdown
                            trigger={['click']}
                            overlay={
                                <Menu>
                                    {
                                        Object.keys(themes).map(key => {
                                            let { name, bgColor, value } = themes[key]
                                            let colors = value().color || []
                                            return <Menu.Item key={Date.now()}>
                                                <ColorBox
                                                    name={key}
                                                    title={name}
                                                    backgroundColor={bgColor || '#fff'}
                                                    colors={colors.splice(0, 5)}
                                                    onChange={onThemeChange}
                                                />
                                            </Menu.Item>
                                        })
                                    }
                                </Menu>
                            }
                            placement="bottomLeft"
                        >
                            {
                                <div>
                                    <ColorBox
                                        name={canvas.theme}
                                        title={name}
                                        backgroundColor={bgColor || '#fff'}
                                        icon={<DownOutlined />}
                                        colors={colors.splice(0, 5)}
                                    />
                                </div>
                            }
                        </Dropdown>
                    </Col>
                </Row>
            </div>
            <div style={{ marginBottom: 8 }}>
                <Row>
                    <Col span={6}>图表系列色</Col>
                    <Col span={18}>
                        <Dropdown
                            trigger={['click']}
                            overlay={
                                <Menu>
                                    {
                                        Object.keys(seriesColors).map(key => {
                                            let colors = seriesColors[key]
                                            return <Menu.Item key={Date.now()}>
                                                <ColorBox
                                                    name={key}
                                                    title={colors.name}
                                                    backgroundColor={'#fff'}
                                                    colors={[...colors.value].splice(0, 5)}
                                                    onChange={onSeriesColorsChange}
                                                />
                                            </Menu.Item>
                                        })
                                    }
                                </Menu>
                            }
                            placement="bottomLeft"
                        >
                            {
                                <div>
                                    <ColorBox
                                        name={canvas.colors}
                                        title={canvas.colors}
                                        backgroundColor={'#fff'}
                                        icon={<DownOutlined />}
                                        colors={[...seriesColors[canvas.colors].value].splice(0, 5)}
                                    />
                                </div>
                            }
                        </Dropdown>
                    </Col>
                </Row>
            </div>
            <div style={{ marginBottom: 8 }}>
                <Row>
                    <Col span={6}>组件滤镜</Col>
                    <Col span={14}>
                        <StyleFilterConfig filters={canvas.styleFilters} onChange={onFiltersChange} />
                    </Col>
                </Row>
            </div>
        </Drawer>
    )
}