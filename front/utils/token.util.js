import jwt_decode from "jwt-decode";

export function saveToken(token){
    localStorage.setItem('token',token)
}
export function getToken(){
    return localStorage.getItem('token')
}
export function clearToken(){
    localStorage.removeItem('token')
}
export function getTokenUser(){
    let token = localStorage.getItem('token')
    if(!token)
        return null
    return jwt_decode(token)
}
