const co = require('co');
const OSS = require('ali-oss')
const config = require('./../config/bookstore.js');


const client = new OSS({
    region: config.oss.region,
    accessKeyId: config.oss.accessKeyId,
    accessKeySecret: config.oss.accessKeySecret,
    bucket: config.oss.bucket
});


class OssObj {

    static put(filePath, file) {
        return new Promise(function (resolve, reject) {
            co(function* () {
                var result = yield client.put(filePath, file);
                resolve(result);
            }).catch(function (err) {
                errorLog.error(err);
                reject(err)
            });
        });
    }

    async putAsync() {
        try {
            let result = await client.put('object-key', 'local-file');
            console.log(result);
        } catch (e) {
            console.log(er);
        }
    }
}

module.exports = OssObj;