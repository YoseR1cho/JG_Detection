import React, {useRef, useState} from 'react';
import styles from "@/pages/admin/User/style.module.less";
import {Button, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import UserList from "@/store/UserList.js";

const Search = () => {
    const [filterOpt,setFilterOpt] = useState('');
    const {loadUsers} = UserList
    const btnRef = useRef();

    const searchHandler = ()=>{
        loadUsers(filterOpt.trim())
        /*if(!filterOpt) {
            setDataList(users);
            return ;
        }
        const filterDatas = users.filter(item=>item.nickName.includes(filterOpt))
        setDataList(filterDatas);*/
    }
    return (
        <div className={styles.search_container}>
            <Input placeholder="请输入人员姓名" value={filterOpt} onChange={e=>setFilterOpt(e.target.value)}/>
            <Button className={styles.blueBtn} onClick={searchHandler} ref={btnRef}><SearchOutlined /></Button>
        </div>
    );
};

export default Search;
