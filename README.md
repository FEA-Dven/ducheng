# ducheng
# 都城前后端点餐系统
### 线上地址: https://dywsweb.com/food/login
## fontend文件夹为都城前端项目，前端架构用了koa2配合webpack构建，引用React全家桶和antd库
## backend文件夹为都城后端项目，后端框架用了koa2，项目用了mysql和redis，需要自行安装，服务配置例子为config/config.example.js，需新建一份config.js。db配置为config/db.example.js，需新建一份db.js
## 分别进入两个文件夹 cnpm install
## 前端开发 npm run dev
## 后端开发 pm2 start app.js --watch
## 如果需要本地调试，进入./fontend/app/config.js export const API_HOST = API_HOSTS['prod'] => export const API_HOST = API_HOSTS['dev']。
