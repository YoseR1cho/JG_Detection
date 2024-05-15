import React, {useEffect} from 'react';
import styles from '../style.module.less'
import {Button, Input, Table} from "antd";
import UserList from "@/store/UserList.js";
import Search from "@/pages/admin/User/Manager/Search.jsx";
import Password from "@/pages/admin/User/Password.jsx";



const MyTable = ({showDeleteModal,showEditorModal,users}) => {
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
            filters:[
                {
                    text:'超管',
                    value:'超管'
                },
                {
                    text:'管理员',
                    value:'管理员'
                }
            ],
            onFilter:(value, record) => record.job.indexOf(value) === 0,
            render:(text)=><span style={{fontSize:'17px',fontWeight:600}}>{text}</span>
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
                    <Password id={record.id}/>
                </div>
            )
        },
    ];

    return (
        <>
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
