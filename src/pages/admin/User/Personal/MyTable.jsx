import React, {useEffect, useRef, useState} from 'react';
import styles from '../style.module.less'
import {Button, Input, Table} from "antd";
import UserList from "@/store/UserList.js";
import {SearchOutlined} from "@ant-design/icons";
import Search from "@/pages/admin/User/Personal/Search.jsx";

const MyTable = ({showDeleteModal,showEditorModal,users,showAddModal}) => {
    const {loadUsers,loading} = UserList;

    const columns = [
        {
            title: '姓名',
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
            title: '身份',
            dataIndex: 'job',
            align: 'center',
            sort: true,
            width: '120px',
            render:(text,record)=>{
                return <span className={(text==='巡检人员' && styles.inspector) || (text==='维修人员' && styles.repairman) || (text==='会审专家' && styles.auditor)}>{text}</span>
            },
            filters:[
                {
                    text:'巡检人员',
                    value:'巡检人员'
                },
                {
                    text:'会审专家',
                    value:'会审专家'
                },
                {
                    text:'维修人员',
                    value:'维修人员'
                }
            ],
            onFilter:(value, record) => record.job.indexOf(value) === 0
        },
        {
            title: '修改时间',
            dataIndex: 'updateTime',
            align: 'center',
            width: '200px',
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
                    <Button onClick={()=>showEditorModal(record)}>编辑</Button>
                    <Button className={styles.redBtn} onClick={showDeleteModal}>拉黑</Button>
                </div>
            )
        },
    ];
    return (
        <>
            <Button onClick={loadUsers} className={styles.refresh}>刷新列表</Button>
            <Button className={`${styles.refresh} ${styles.blueBtn}`} onClick={showAddModal}>添加人员</Button>
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
        </>
    );
};

export default MyTable;
