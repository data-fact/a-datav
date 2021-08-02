import React from 'react'
import {notification} from 'antd4'
import {clearToken} from "../utils/token.util";

export default function (res,isMessage) {
    switch (res.status) {
        case 500:
            return handle500(res,isMessage)
        case 503:
            return handle503(res,isMessage)
        case 401:
            return handle401(res,isMessage)
        case 403:
            return handle403(res,isMessage)
        default:
            return handleUnkown(isMessage)
    }
}

function handle500(res,isMessage) {
    return res.text()
        .then(err => {
            if(err.indexOf('Read timed out') >= 0){
                showMessage({
                    message: '连接超时',
                    description: '请检查网络情况'
                },isMessage)
                return false
            }else{
                return handleUnkown(isMessage)
            }
        })
}
function handle503(res,isMessage) {
    return res.text()
        .then(err => {
            let messages = err.split('::')
            if(!messages[0])
                throw new Error()
            showMessage({
                message: messages[0],
                description: messages[1] || ''
            },isMessage)
            return false
        })
}
function handle401(res,isMessage){
    console.error('用户名或密码错误')
    showMessage({
        message: '登录失败'
    },isMessage)
    return false
}
function handle403(res,isMessage){
    console.error('登录失效')
    clearToken()
    showMessage({
        message: '登录失效'
    },isMessage)
    window.location.reload()
    return false
}
function handleUnkown(isMessage) {
    console.error('未知异常')
    showMessage({
        message: '未知异常',
        description: '请前往系统日志查看原因'
    },isMessage)
    return false
}
function showMessage(m,isMessage) {
    if(isMessage)
        notification.error(m)
    else
        console.error(m)
}