const request = require('request');
const querystring = require("querystring");
const logger = require('./../util/logger.js');

/**
 *  通用请求
 */
class CommonRequest {

    constructor() {
        this._init();
    }

    _init(){
        this.timeout = 30000;
        this.json = false;
        this.method = undefined;
        this.strictSSL = false;
        this.headers = { 
            'Content-Type': 'application/json'
        }
    }
    
    post(url,param,data) {
        if (!url) {
            throw new Error("need a url for request")
        }
        this.method = "POST";
        this.url = url;
        this._setParam(param);
        if(data){
            this.body = data;
        }
        return this;
    }

    get(url, param) {
        if (!url) {
            throw new Error("need a url for request");
        }
        this.method = "GET";
        this.url = url;
        this._setParam(param);
        return this;
    }

    _setParam(param){
        if (param) {
            let reqParam = querystring.stringify(param)
            this.url = this.url + '?' + reqParam
        }
    }

    setHeaders(header, val) {
        if (header && val) {
            this.headers[header] = val;
        }
        return this;
    }

    toJson() {
        this.json = true;
        return this;
    }

    ssl() {
        this.strictSSL = true
        return this;
    }

    settimeout(timeout) {
        if (timeout > 0) {
            this.timeout = timeout;
        }
        return this;
    }
    
    binary(){
        this.encoding = "binary";
        return this;
    }

    buffer(){
        this.encoding = null;
        return this;
    }

    /**
     * 设置额外的参数
     * @param {*} key 
     * @param {*} val 
     */
    setExtraOption(key, val) {
        if (key && val) {
            this[key] = val;
        }
        return this;
    }

    async go() {
        if (!this.method) {
            throw (new Error("please choose a get or post method for request"));
        }
        let self = this;
        return new Promise(function (resolve, reject) {
            let option = self;
            request(option, function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    resolve(body);
                } else {
                    console.log(err)
                    console.log(response.statusCode)
                    // db创建出现异常，需要进行告警
                    // logger.getLogger('error').error("请求外部资源失败：", err.stack);
                    // reject();
                }
            })
        })
    }

}



// const fs = require("fs")
// let accessToken = "11_cObNOTz6MbU-XQA-meISCZPBgdNBG41uxt3jUUG7WPNrX8Vo8fMZeXOSPdDGQciT9ORFsDZlgbXETxoZ75OwKD_fRTM0-oytX4rC2wJWG0VHh-phRSSR3MrDOzIAYFgABAQOV"
// 获取小程序码
// async function getWXCode() {
//     let data = {
//         scene:"151511545efe",
//     };
//     let imgData = await new CommonRequest()
//     .post("https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=" + accessToken,null,data)
//     .toJson()
//     .ssl().binary().go()
//     fs.writeFile(__dirname + "/003.jpg", imgData,"binary",function (err) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("success")
//         }
//     })
// }

// getWXCode()


// 上传图片
// async function uploadWX(){
//     let result = await new CommonRequest()
//     .post("https://api.weixin.qq.com/cgi-bin/media/upload",{
//         access_token:accessToken,
//         type: 'image',
//     })
//     .ssl()
//     .setExtraOption("formData",{
//         attachments: [
//             fs.createReadStream(__dirname + "/003.jpg")
//         ],
//     }).go()
//     console.log(result)
// }
// uploadWX()



module.exports = {
    CommonRequest: CommonRequest
}
