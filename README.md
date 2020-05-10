# mhzqx-weChatApp
微信小程序-点餐系统（包含前端，后台及数据库表）

### 小程序预览 

由于没有正式上线使用，仅作为demo使用，所以请移步csdn预览动图：https://blog.csdn.net/weixin_43388844/article/details/96728376

### 满汉子全席——点餐小程序

本小弟参加实训使用微信开发者工具写的点餐小程序项目，同时使用nodejs编写后台部分来操作数据库，和我一样初学小程序或nodejs的可以在本项目中学习了解关于小程序代码结构组织，模块化，构建等内容，入门小程序及nodejs的好选择。

### 技术栈及工具

工具：微信开发者工具 vscode mysql

前端： html + css + js + 小程序api + weui

后台： nodejs + express框架 + mysql数据库

### 起手式

star and fork本项目

安装node环境

git clone https://github.com/nopapername/mhzqx-weChatApp.git  (本项目地址)

###### 前端小程序页面打开步骤：

使用微信开发者工具导入 mhzqx小程序文件夹中的工程

编译运行

###### 后台运行步骤：

导入mhzqx.sql表数据到你的数据库中

cd mhzqxNODE后台 （进入mhzqxNODE后台 文件夹目录下）

修改db文件夹目录下的dbConfig.js文件 为你自己的数据库配置

重点：修改routes文件夹下customer.js里面的appid和secret为自己小程序号的小程序id和密钥

npm install （建议使用淘宝镜像cnpm）

npm start

### 交流

有任何问题可以在这里提issue，也可加q：1019825864，欢迎各位star小弟的--！
