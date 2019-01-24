import { message } from 'antd';
import * as UTIL from '@libs/util';
import HttpRequest from '@libs/axios';
const axios = new HttpRequest();
export default async function({ method, url, data })  {
    try {
        let res = await axios.request({
            headers: {},
            url,
            method,
            data
        })

        return res.data;
    } catch (err) {
        if (err.msg) {
            message.error(err.msg);
        }
        UTIL.normalRequestErrorHandler(err);
    }
};
