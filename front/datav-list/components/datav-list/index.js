/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/15.
 * Description:
 * Modified By:
 */
import React from 'react'
import {Row,Col} from 'antd4'
import GroupList from "./GroupList";
import ListContainer from "./ListContainer";
import useMainReducer from "../../reducers/useMainReducer";

export default function DatavList(){

    let [main] = useMainReducer()

    return (
        <>
            <Row>
                <Col span={4}>
                    <GroupList/>
                </Col>
                <Col span={20}>
                    <ListContainer list={main.list}/>
                </Col>
            </Row>
        </>
    )
}