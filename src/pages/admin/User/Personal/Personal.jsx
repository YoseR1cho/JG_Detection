import React, {useEffect, useRef, useState} from 'react';
import Table from "./MyTable.jsx";
import styles from '../style.module.less'
import {Button, Modal} from "antd";
import EditorModal from "./EditorModal.jsx";
import UserList from "@/store/UserList.js";
import {observer} from "mobx-react";
import AddModal from "@/pages/admin/User/Personal/AddModal.jsx";

const Personal = () => {
    const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
    const [isEditorOpen, setIsEditorOpen] = React.useState(false);
    const [isAddOpen,setIsAddOpen] = React.useState(false);
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

    const showAddModal = () => {
        setIsAddOpen(true);
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
                <Modal title="拉黑用户"
                       open={isDeleteOpen}
                       footer={<div className={styles.deleteContainer}>
                           <Button onClick={()=>setIsDeleteOpen(false)} className='blueBtn'>取消</Button>
                           <Button type='primary' onClick={()=>setIsDeleteOpen(false)} className='redBtn'>拉黑</Button>
                       </div>}
                       maskClosable={false}
                >
                    <h2 style={{
                        textAlign:'center',
                        display:'block',
                        margin:'50px 0',
                        fontWeight:400
                    }}>您确定拉黑该用户吗？</h2>
                </Modal>
                <AddModal setIsAddOpen={setIsAddOpen} isAddOpen={isAddOpen}/>
                <Table showDeleteModal={showDeleteModal} showAddModal={showAddModal} showEditorModal={showEditorModal} users={users && users.filter(item=>item.job==='会审专家'||item.job==='巡检人员'||item.job==='维修人员')}/>
            </div>
    );
};

export default observer(Personal);
