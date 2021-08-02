import React,{useState} from 'react'
import { Typography, Space, Select } from 'antd4';
import { GithubOutlined,QuestionCircleOutlined } from '@ant-design/icons';
import useMainReducer from "../reducers/useMainReducer";
import useLogout from "../hooks/useLogout";
import LoginModel from "./LoginModel";
import RegisterModel from "./RegisterModel";
import ChangePwdModel from "./ChangePwdModel";
const { Link } = Typography;
const { Option } = Select

export default function LoginBox(){

    let [state] = useMainReducer()
    let [loginVisible,setLoginVisible] = useState(false)
    let [registerVisible,setRegisterVisible] = useState(false)
    let [changePwdVisible,setChangePwdVisible] = useState(false)
    let logout = useLogout()

    function handleSelect(val){
        switch (val){
            case 'logout':
                logout()
                break;
            case 'changepwd':
                setChangePwdVisible(true)
                break;
        }
    }

    return <>
        <Space>
            {
                state.user ?
                    <>
                        <Select
                            value={state.user.sub} style={{ width: 120 }} bordered={false}
                            onChange={handleSelect}
                        >
                            <Option value="changepwd">修改密码</Option>
                            <Option value="logout">注销</Option>
                        </Select>
                    </> :
                    <>
                        <Link
                            style={{fontSize: "larger"}}
                            onClick={() => setLoginVisible(true)}
                        >
                            登录
                        </Link>
                        <Link
                            onClick={() => setRegisterVisible(true)}
                        >
                            注册
                        </Link>
                    </>
            }
            <Link href="/help.html" target="_blank">
                <QuestionCircleOutlined/>帮助
            </Link>
            <Link href="https://github.com/data-fact/a-datav" target="_blank">
                <GithubOutlined/> Github
            </Link>
        </Space>
        <LoginModel visible={loginVisible} onCancel={() => setLoginVisible(false)}/>
        <RegisterModel visible={registerVisible} onCancel={() => setRegisterVisible(false)}/>
        <ChangePwdModel visible={changePwdVisible} onCancel={() => setChangePwdVisible(false)}/>
    </>
}
