# React + Vite

本项目用yarn进行包管理

开发环境下快速构建项目命令：
    1. yarn(未安装yarn 请先npm i yarn -g安装yarn)
    2. yarn dev

生产环境： 
    yarn build


项目目录
    public  项目无关静态资源
    src 项目主目录
        assets 静态资源
        components  组建
            Button  插入井盖图片按钮组件
            CopeUpload  处理上传图片组件
            DetailMap   检测地点可视化展示组件
            Dropdown    下拉框
            History     历史图片展示组件
            loading     loading logo组件
            Magnify     容器
            MapContainer    地点选择组件
            Overlays    识别结果报告组件
            Pulic       包含登录、注册等公共组件 
            Selector    选择器
            Upload      自定义上传组件
    Layout  公共页面布局
    mock    mock文件
    pages   页面
        admin   后台管理系统
            Defect  缺陷处理模块
            Knowledge  知识库管理模块
            User  用户管理模块和首页
        web     前台
            Detection   隐患识别
            Record  识别记录
            KnowLedge   知识库模块
                DangerKnowLedge 隐患知识模块
                News    新闻速递模块
                Matters     维检事项
            Login   登录公共界面
            WorkOrder   维修人员查看工单
    store   mobx全局数据
    style   全局样式
    utils   自定义工具
        hooks.js   自定义hooks
        api.js     项目api管理
        axios.js   axios封装
        config.js  项目数据配置
        index.js   项目工具函数
        login.js    登录工具函数
    .eslintrc.cjs   eslint配置文件
    index.html  项目根html文件
    package.json    项目管理核心文件
    vite.config.js  vite配置文件
