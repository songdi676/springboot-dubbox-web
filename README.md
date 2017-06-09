# springboot-dubbox-web

https://github.com/zhangxd1989/springboot-dubbox 前端管理
![预览](https://github.com/zhangxd1989/springboot-dubbox-web/blob/master/image.jpg)

- install node.js
- go to the app root

```
>npm install -g grunt-cli
>npm install -g bower
>npm install
>bower install
>grunt build:dev
>grunt build:angular
>npm start
```
### 特别说明：增加echarts插件，路由配置项路径匹配为/vendor目录下的echarts。
##### **`npm install`** 将node_moduel/echarts/dist/echarts.js复制到 /vendor下

###### 以上做法主要是因本地无法上传echarts.js 文件，文件大小受限制