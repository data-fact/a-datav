const urlUtil = {

    getQueryString: function (name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r !== null) return decodeURI(r[2]);
        return null;
    },
    getHashString: function (name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.hash.substr(1).match(reg);
        if (r !== null) return decodeURI(r[2]);
        return null;
    },
    getParamsByUrl: function(url){
        if(!url)
            url = window.location.href
        url = decodeURI(url)
        let index = url.indexOf('?')
        if(index < 0) return []
        let arr = url.substr(index + 1).split('&')
        return arr.map(a => {
            var p = a.split('=')
            return {name: p[0] || '',value: p[1] || ''}
        })
    },
    getParamObjByUrl: function(url){
        if(!url)
            url = window.location.href
        url = decodeURI(url)
        let obj = {}
        let index = url.indexOf('?')
        if(index < 0) return obj
        let arr = url.substr(index + 1).split('&')
        arr.forEach(a => {
            let p = a.split('=')
            let key = p[0] || ''
            obj[key] = p[1] || ''
        })
        return obj
    },
    encodeParam: function(obj){
        return btoa(encodeURIComponent(JSON.stringify(obj)))
    },
    decodeParam: function(param){
        let obj = null
        if(param){
            try{
                param = decodeURIComponent(atob(param))
                obj = JSON.parse(param)
            }catch(e){
                console.error('参数解析异常',e)
            }
        }
        return obj
    },
    parseCanvasParams: function(){
        let params = this.getQueryString('aleiye')
        return new UrlUtil().decodeParam(params)
    },
    localQuery: function (_that, name) {
        let value = '';
        if (!this.isEmpty(_that) &&
            !this.isEmpty(_that.props) &&
            !this.isEmpty(_that.props.location) &&
            !this.isEmpty(_that.props.location.query)) {
            value = _that.props.location.query[name];
        }
        if (this.isEmpty(value)) {
            value = this.getQueryString(name);
        }
        return value;
    },

    isNull: function (obj) {
        return obj === null || typeof obj === 'undefined' || obj === undefined;
    },

    isEmpty: function (obj) {
        return this.isNull(obj) || obj === '';
    }
}

export default urlUtil