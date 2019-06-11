# ducheng(都城前后端点餐系统)
```
线上地址: https://dywsweb.com/food/login
```
### 目录文件简介

fontend文件夹为都城前端项目，前端架构用了koa2配合webpack构建，引用React全家桶和antd库

backend文件夹为都城后端项目，后端框架用了koa2，项目用了mysql和redis，需要自行安装，服务配置例子为config/config.example.js，需新建一份config.js。db配置为config/db.example.js，需新建一份db.js

## 项目开发

### 进入文件夹fontend 
```
npm install
```
```
npm run dev
```
### 本地开发路径
```
http://localhost:3006/food/login
```
### 进入文件夹backend
```
npm install
```
### 安装全局pm2
```
npm install pm2 -g
```
### 监听模式
```
pm2 start app.js --watch
```

### 查看日志
```
pm2 logs 
```

如果需要本地调试，进入./fontend/app/config.js export const API_HOST = API_HOSTS['prod'] => export const API_HOST = API_HOSTS['dev']。
