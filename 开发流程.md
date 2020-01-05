# 开发步骤

## 第一步：后端（nodejs+mysql+sequelize）

- 新建项目（可用eggjs，也可不用）
- 项目目录：
  - Router：路由
    - 只用来写路由对应的哪个控制器
  - Controller：控制器
    - 对请求参数进行检验，组装
    - 调用service进行业务处理
    - 通过 HTTP 将结果响应给用户
  - Service：服务
    - 实现业务逻辑的封装
    - 直接对数据库进行操作（增删改查）
  - Model：数据
    - 定义数据模型（建表）

## 第二步：前端（React）
- 新建项目
  
  1. 利用原生React
  
     ```
     // 1. 安装react-app脚手架并新建项目
     npx create-react-app my-app
     
     // 2. 引入antd，配置按需加载
     
     // 3. 引入redux、router
     
     // 4. 开始开发
     ```
  2. 利用umi
  
     ```js
     // 1. 安装umi依赖
     npm init -y
     npm install umi -S
     
     // 2. 新建umi配置(在config/config.js中)
     // umi-plugin-react 这个插件集成了常用的一些进阶的功能：npm install umi-plugin-react -S
     // 安装antd：npm install antd -S
     // 安装antd-pro：npm install ant-design-pro -S ；umi的配置，已经自动支持antd-pro的按需加载
     export default {
       plugins: [
         ['umi-plugin-react', {
           antd: true, //引入antd
           dva: true
         }],
       ],
     };
     
     // 3. 新建src目录用于开发
     
     // 4. package.json中添加
     "scripts": {
         "dev": "umi dev",
         "build": "umi build"
     }
     
     // 5. 开始开发
     ```
