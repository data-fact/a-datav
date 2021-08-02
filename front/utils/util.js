import {SCALE_TYPE} from "../datav-create/common/constant";

/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
const HAS_PREFIX = window.location.pathname.startsWith("/apsc-datav")
const SLASH_COUNT = (window.location.pathname.match(/\//g) || []).length - (HAS_PREFIX ? 1 : 0)
const IMAGE_URI_PREFIX = `${new Array(SLASH_COUNT - 1).fill('..').join('/')}/`
export function genImageUrl(url) {
    if(!url) return ''
    return url.replace('//',IMAGE_URI_PREFIX)
}
export const emptyImage = `${IMAGE_URI_PREFIX}images/datav-cover-empty.png`

export function hashCode(str) {
    let hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
export function debounce(fn, wait) {
    let callback = fn;
    let timerId = null;

    function debounced() {
        // 保存作用域
        let context = this;
        // 保存参数，例如 event 对象
        let args = arguments;

        clearTimeout(timerId);
        timerId = setTimeout(function() {
            callback.apply(context, args);
        }, wait);
    }

    // 返回一个闭包
    return debounced;
}

export function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

export function dataURLtoFile(dataurl, filename) {//将base64转换为文件，dataurl为base64字符串，filename为文件名（必须带后缀名，如.jpg,.png）
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

export function getScaleStyle(width,height,scaleType) {
    let newStyle = {width,height,transformOrigin: '0 0'}
    let scaleX = document.documentElement.clientWidth / width
    let scaleY = document.documentElement.clientHeight / height
    switch (scaleType) {
        case SCALE_TYPE.full:
            return {
                ...newStyle,
                transform: `scale(${scaleX},${scaleY})`
            }
        case SCALE_TYPE.width:
            return {
                ...newStyle,
                transform: `scale(${scaleX})`
            }
        case SCALE_TYPE.height:
        case SCALE_TYPE.height1:
            return {
                ...newStyle,
                transform: `scale(${scaleY})`
            }
        case SCALE_TYPE.none:
            return {...newStyle}
    }
}
export function getViewStyle(width,height,scaleType) {
    // let scaleX = document.documentElement.clientWidth / width
    // let scaleY = document.documentElement.clientHeight / height
    let style = {height: '100%'}
    switch (scaleType) {
        case SCALE_TYPE.full:
            return {...style, overflow: 'hidden'}
        case SCALE_TYPE.width:
            let {clientHeight,clientWidth} = document.documentElement
            let scale = clientWidth / width
            let calcHeight = scale > 1 ? clientHeight : clientHeight / scale
            return {...style, overflowX: 'hidden',overflowY: 'auto',height: calcHeight}
        case SCALE_TYPE.height:
            return {...style, overflow: 'hidden'}
        case SCALE_TYPE.height1:
            return {...style, overflowX: 'auto',overflowY: 'hidden'}
        case SCALE_TYPE.none:
            return {...style, overflow: 'auto'}
    }
}

export function getOsInfo() {
    var userAgent = navigator.userAgent.toLowerCase();
    var name = 'Unknown';
    var version = 'Unknown';
    if (userAgent.indexOf('win') > -1) {
        name = 'Windows';
        if (userAgent.indexOf('windows nt 5.0') > -1) {
            version = 'Windows 2000';
        } else if (userAgent.indexOf('windows nt 5.1') > -1 || userAgent.indexOf('windows nt 5.2') > -1) {
            version = 'Windows XP';
        } else if (userAgent.indexOf('windows nt 6.0') > -1) {
            version = 'Windows Vista';
        } else if (userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1) {
            version = 'Windows 7';
        } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows 8') > -1) {
            version = 'Windows 8';
        } else if (userAgent.indexOf('windows nt 6.3') > -1) {
            version = 'Windows 8.1';
        } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows nt 10.0') > -1) {
            version = 'Windows 10';
        } else {
            version = 'Unknown';
        }
    } else if (userAgent.indexOf('iphone') > -1) {
        name = 'Iphone';
    } else if (userAgent.indexOf('mac') > -1) {
        name = 'Mac';
    } else if (userAgent.indexOf('x11') > -1 || userAgent.indexOf('unix') > -1 || userAgent.indexOf('sunname') > -1 || userAgent.indexOf('bsd') > -1) {
        name = 'Unix';
    } else if (userAgent.indexOf('linux') > -1) {
        if (userAgent.indexOf('android') > -1) {
            name = 'Android';
        } else {
            name = 'Linux';
        }
    } else {
        name = 'Unknown';
    }
    return { name, version };
}