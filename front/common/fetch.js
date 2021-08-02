import React from 'react'
import fetch from 'cross-fetch'
import {encrypt} from "../utils/crypto.util";
import {getToken, saveToken} from "../utils/token.util";

export default function myfetch(url,body){
    body = formatBody(body)
    body = auth(body)
    body = security(body)
    return fetch(url,body)
        .then(res => {
            let authorization = res?.headers?.map?.authorization
            if(authorization)
                saveToken(authorization)
            return res
        })
}
function formatBody(body){
    if(!body) body = {}
    if(!body.headers)
        body.headers = {}
    return body
}
function auth(body){
    let token = getToken()
    if(token)
        body.headers['Authorization'] = `Bearer ${token}`
    return body
}
function security(body) {
    let hash = new Date().getTime()
    body.headers['hash'] = btoa(encrypt(''+hash))

    let csrfHeaderEl = document.getElementById("_csrf_header")
    let csrfEl = document.getElementById("_csrf")
    if(!csrfHeaderEl || !csrfEl)
        return body

    let csrfHeader = csrfHeaderEl.value
    let csrf = csrfEl.value
    body.headers[csrfHeader] = csrf

    if(body.method == 'POST' && !body.noenc){
        if(body.body && typeof body.body === 'string'){
            body.headers['encode'] = 'UTF-8'
            body.body = btoa(encrypt(body.body,body.headers['hash']))
        }
    }
    return body
}