import React, {useEffect, useRef, useState} from 'react';
import Table from "./MyTable.jsx";
import styles from '../style.module.less'
import {Button, Modal} from "antd";
import EditorModal from "@/pages/admin/User/Manager/EditorModal.jsx";
import UserList from "@/store/UserList.js";
import {observer} from "mobx-react";
import Automation from "@/pages/admin/User/Index/Automation.jsx";
import Charts from "@/pages/admin/User/Index/Charts.jsx";

const Manager = () => {
    const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
    const [isEditorOpen, setIsEditorOpen] = React.useState(false);
    const [userState,setUserState] = useState({
        nickName:'',
        identity:'普通员工',
        limit:false,
        id:''
    })
    const {users,loadUsers} = UserList;
    useEffect(() => {
        loadUsers()
    }, []);

    const showDeleteModal = () => {
        setIsDeleteOpen(true);
    };
    const showEditorModal =  (record) => {
        console.log(record)
        setUserState({
            nickName: record.nickName,
            identity: record.job,
            limit:record.status===1?true:false,
            id:record.id
        })
        setIsEditorOpen(true);
    };

    return (
            <div className={styles.main}>
                <EditorModal isEditorOpen={isEditorOpen} setIsEditorOpen={setIsEditorOpen} state={userState}/>
                <Modal title="删除用户信息"
                       open={isDeleteOpen}
                       footer={<div className={styles.deleteContainer}>
                           <Button onClick={()=>setIsDeleteOpen(false)}>取消</Button>
                           <Button type='primary' onClick={()=>setIsDeleteOpen(false)}>删除</Button>
                       </div>}
                >
                </Modal>
                <Table showDeleteModal={showDeleteModal} showEditorModal={showEditorModal} users={users && users.filter(item=>item.job==='超管'||item.job==='管理员')}/>
            </div>
    );
};

export default observer(Manager);
