const API_HOSTS = {
    'prod': 'https://dywsweb.com/foodapi/',
    'dev': 'http://localhost:3008/'
};
/*
token在Cookie中存储的天数，默认1天
 */
export const cookieExpires = 1;

/*
API请求的域名           
 */
export const API_HOST = API_HOSTS['dev'];
