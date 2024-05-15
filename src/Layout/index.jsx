import React, {useEffect, useState} from 'react';
import styles from "@/Layout/style.module.less";
import logo from '@/assets/321.jpg'
import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import {getUser, removeUser} from "@/utils/login.js";
import { message, Space, Spin,Dropdown as Drop} from "antd";
import Dropdown from "@/components/Dropdown/dropdown.jsx";
import {DownOutlined} from "@ant-design/icons";
import {request} from "@/utils/axios.js";
import {observer} from "mobx-react";
import User from "@/store/User.js";
import {loginById, logout as _logout} from "@/utils/api.js";
import useLogin from "@/utils/hooks/useLogin.js";
import News from "@/store/News.js";

const Index = () => {
    const navigateTO = useNavigate()
    const {nickName,job} = User;
    const {loading} = useLogin();
    const logout = ()=>{
        _logout().then(()=>{
            message.success('登出成功！')
            removeUser();
            setTimeout(()=>{
                navigateTO('/login')
            },1000)
        }).catch(()=>{
            message.error('登出失败！')
        })
    }

    const items = [
        {
          key:'1',
          label:(
                <span onClick={logout}>退出登录</span>
            )
        },
    ];

    return (
        <div className={styles.main}>
            <Spin spinning={loading} style={{
                height:'100%'
            }}>
                <div className={styles.header}>
                    <div className={styles.left_wrapper}>
                        <img src={logo} alt="logo"/>
                        <ul>
                            <NavLink
                                style={({isActive })=>isActive?{color:'#4D90FE'}:null}
                                to={'/'}>隐患识别</NavLink>
                            {/*{(job==='超管'||job==='巡检人员') &&  <NavLink
                            style={({isActive })=>isActive?{color:'#4D90FE'}:null}
                            to={'/record'}>识别记录</NavLink>}*/}
                            <NavLink
                                style={({isActive })=>isActive?{color:'#4D90FE'}:null}
                                to={'/record'}>识别记录</NavLink>

                            {(job==='超管'||job==='维修人员') &&  <NavLink
                                style={({isActive })=>isActive?{color:'#4D90FE'}:null}
                                to={'/workOrder'}>工单</NavLink>}
                            <NavLink>知识库<Dropdown/></NavLink>
                            {(job==='超管'||job==='会审专家') &&  <NavLink
                                to={'/admin/user/index'}>后台管理系统</NavLink>}

                        </ul>
                    </div>
                    <div className={styles.right_wrapper}>
                        <span className={styles.nickname}>{nickName || 'null'}</span>
                        <Drop
                            menu={{
                                items,
                            }}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Drop>
                    </div>
                </div>
                <Outlet/>
            </Spin>
        </div>
    );
};

export default observer(Index);
