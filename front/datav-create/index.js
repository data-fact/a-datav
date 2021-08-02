/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd4'
import locale from 'antd4/lib/locale/zh_CN';
import Context from "./Context";
// import '../common/common'

ReactDOM.render(
    <ConfigProvider locale={locale} componentSize="small">
        <Context/>
    </ConfigProvider>,
    document.getElementById('app')
)
