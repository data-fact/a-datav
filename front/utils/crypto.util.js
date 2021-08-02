const CryptoJS = require('crypto-js');  //引用AES源码js

const ivStr = 'f88ab3eeb36fe0e1'
const iv = CryptoJS.enc.Latin1.parse(ivStr)

export function decrypt(word,keyStr) {
    keyStr = formatKey(keyStr)
    let key = CryptoJS.enc.Latin1.parse(keyStr)
    let decrypted = CryptoJS.AES.decrypt(word, key, {iv: iv, padding: CryptoJS.pad.ZeroPadding});
    return decrypted.toString(CryptoJS.enc.Utf8)
}

export function encrypt(word,keyStr) {
    keyStr = formatKey(keyStr)
    let key = CryptoJS.enc.Latin1.parse(keyStr)
    let encrypted = CryptoJS.AES.encrypt(word, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    return encrypted.toString()
}

function formatKey(key){
    let formatted = key;
    if(!formatted || formatted.length < 16)
        formatted = ivStr;
    if(formatted.length > 16)
        formatted = formatted.substr(0,16);
    return formatted;
}