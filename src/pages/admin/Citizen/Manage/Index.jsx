import React, {useEffect, useRef, useState} from 'react';
import styles from '../style.module.less'
import {Button, Input, Table} from "antd";
import UserList from "@/store/UserList.js";
import {SearchOutlined} from "@ant-design/icons";
import Search from "./Search.jsx";
import {observer} from "mobx-react";
import Block from "@/pages/admin/Citizen/Block.jsx";

const Index = () => {
    const {loadUsers,loading,users} = UserList;

    const columns = [
        {
            title:'用户ID',
            dataIndex: 'id',
            align: 'center',
            width: '150px'
        },
        {
            title: '微信名称',
            dataIndex: 'nickName',
            align: 'center',
            width: '150px',
            filterSearch: true,
            onFilter: (text, record) => record.nickName.startsWith(text),
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            align: 'center',
            width: '150px',
        },
        {
            title: '登录限制',
            dataIndex: 'status',
            align: 'center',
            width: '100px',
            render:(text, record)=>{
                return <span style={{color:record.status===1?'green':'red'}}>{record.status===1?'无限制':'受限'}</span>
            }
        },
        {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            width: '20%',
            fixed:'right',
            render:(text,record)=>(
                <div className={styles.btnContainer}>
                    <Block id={record.id}/>
                </div>
            )
        },
    ];

    useEffect(() => {
        loadUsers('','城镇居民')
    }, []);
    return (
        <div className={styles.container}>
            <Button onClick={loadUsers}>刷新列表</Button>
            <Search/>
            <Table
                loading={loading}
                rowKey={record => record.id}
                columns={columns}
                dataSource={users}
                bordered={true}
                locale={{
                    triggerAsc:'',
                    triggerDesc:''
                }}
                scroll={{x:true}}
            />
        </div>
    );
};

export default observer(Index);
