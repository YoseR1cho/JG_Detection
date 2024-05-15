import React, { useRef, useState} from 'react';
import {
    UserOutlined,
    SmileOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ScheduleOutlined,
    TeamOutlined,
    AppstoreAddOutlined,
    CodepenOutlined,
    BookOutlined,
    AppstoreOutlined,
    BarsOutlined,
    WechatWorkOutlined,
    CarryOutOutlined, BulbOutlined, HomeOutlined, SolutionOutlined, GoldOutlined
} from '@ant-design/icons';
import {Button, Layout, Menu, Spin, theme} from 'antd';
import styles from './style.module.less'
import {Outlet, useNavigate} from "react-router-dom";
import avatar from "@/assets/矢量.png"
import icon from "@/assets/icon.png"
import User from "@/store/User.js";
import {observer} from "mobx-react";
import Breadcrumb from "@/Layout/admin/Breadcrumb.jsx";
import useLogin from "@/utils/hooks/useLogin.js";
const { Sider,Header } = Layout;
const items = [
    {
        label:'前台',
        key:'/',
        icon:<HomeOutlined />,
        path:'/admin'
    },
    {
        label:'系统管理',
        key:'user',
        icon:<AppstoreAddOutlined />,
        children:[
            {
                label:'系统设置',
                key:'user/index',
                icon:<TeamOutlined />,
                path:'/admin/user/index'
            },
            {
                label:'管理员设置',
                key:'user/manager',
                icon:<SolutionOutlined />,
                path:'/admin/user/manager'
            },
            {
                label:'人员管理',
                key:'user/personal',
                icon:<UserOutlined/>,
                path:'/admin/user/personal'
            }
        ],
    },
    {
        label:'缺陷事件处理',
        key:'defect',
        icon:<ScheduleOutlined />,
        path:' ',
        children: [
            {
                label:'巡检工单',
                key:'/admin/defect/inspect',
                icon:<CarryOutOutlined />,
                path:'/admin/defect/inspect'
            },
            {
                label:'居民反馈',
                key:'/admin/defect/citizen',
                icon:<BookOutlined />,
                path:'/admin/defect/citizen'
            },
        ]
    },
    {
        label:'居民信息管理',
        key:'citizen',
        icon:<GoldOutlined />,
        children:[
            {
                label:'用户反馈',
                key:'citizen/feedback',
                icon:<BulbOutlined />,
                path:'/admin/citizen/feedback'
            },
            {
                label:'用户管理',
                key:'citizen/manage',
                icon:<TeamOutlined />,
                path:'/admin/citizen/manage'
            },
        ],
    },
    {
        label:'数据可视化',
        key:'/admin/visualization',
        icon:<CodepenOutlined />,
        path:'/admin/visualization'
    },
    {
        label:'知识库管理',
        key:'knowledge',
        icon:<BookOutlined />,
        children: [
            {
                label:"隐患知识",
                key:'/admin/knowledge/danger',
                icon:<AppstoreOutlined />
            },
            {
                label:"维检事项",
                key:'/admin/knowledge/matters',
                icon:<BarsOutlined />
            },
            {
                label:"新闻速递",
                key:'/admin/knowledge/news',
                icon:<WechatWorkOutlined />
            }
        ]
    },
];
const App = (props) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    const navigateTo = useNavigate();
    const {nickName} = User;
    const {loading} = useLogin(true);
    const menuClick = (e)=>{
        // 点击跳转到对应路由    编程式导航
        navigateTo(e.key);
    }

    const nameRef = useRef();

    return (
        <Spin spinning={loading}>
            <Layout className={styles.layout}>
                <Sider
                    breakpoint="lg"
                    collapsed={collapsed}
                >
                    <div className={styles.logo}>
                        {/*<img src={avatar} alt="" className={styles.avatar}/>*/}
                        {/*<h1 className={styles.info} ref={nameRef}>后台管理</h1>*/}
                        {collapsed?<img src={icon} alt="" className={styles.icon}/>:<img src={avatar} alt="" className={styles.avatar}/>}
                    </div>
                    <div className={styles.menu_container}>
                        <Menu
                            className={styles.menu}
                            theme="light"
                            mode="inline"
                            defaultSelectedKeys={['4']}
                            items={items}
                            onClick={menuClick}

                        />
                    </div>
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: '#1E1E1E',
                            display:"flex",
                            alignItems:"center",
                            height:'80px'
                        }}
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => {
                                setCollapsed(!collapsed)
                                nameRef.current.style.display = collapsed?'block':'none';
                            }}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                                color:"#fff"
                            }}
                        />
                        <Breadcrumb/>
                    </Header>
                    <div className={styles.main}>
                        <Outlet/>
                    </div>
                </Layout>
            </Layout>
        </Spin>
    );
};
export default observer(App);
