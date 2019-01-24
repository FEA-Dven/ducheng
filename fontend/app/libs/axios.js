import Axios from 'axios';
import { API_HOST } from '@config';
import Cookies from 'js-cookie';
import { Message } from 'antd';
import { getUserInfoFromCookie, clearUserInfoCookie } from '@libs/util';
class httpRequest {
    constructor () {
        this.options = {
            method: '',
            url: ''
        };
        // 存储请求队列
        this.queue = {};
    }

    // 销毁请求实例
    destroy (url) {
        delete this.queue[url];
        const queue = Object.keys(this.queue);
        return queue.length;
    }

    // 请求拦截
    interceptors (instance, url) {
        // 添加请求拦截器
        instance.interceptors.request.use(config => {
            if (!config.url.includes('/users')) {
                config.headers['x-access-token'] = Cookies.get('token');
            }
            return config;
        }, error => {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use((res) => {
            let { data } = res;
            if (data.err !== 0) {
                return Promise.reject(data);
            } else {
                return Promise.resolve(data);
            }
        }, (error) => {
            let res = error.response || {data:{msg:'no response'}};
            return Promise.reject(res.data);
        });
    }

    // 创建实例
    create () {
        let conf = {
            baseURL: API_HOST,
            // timeout: 2000,
            headers: {
                token: getUserInfoFromCookie().token,
                fid: getUserInfoFromCookie().fid,
                'Content-Type': 'application/json; charset=utf-8',
                'X-URL-PATH': location.pathname
            }
        };
        return Axios.create(conf);
    }

    // 合并请求实例
    mergeReqest (instances = []) {}

    // 请求实例
    request (options) {
        let instance = this.create();
        this.interceptors(instance, options.url);
        options = Object.assign({}, options);
        this.queue[options.url] = instance;
        return instance(options);
    }
}
export default httpRequest;
