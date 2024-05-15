import React, {useRef, useState} from 'react';
import styles from "../style.module.less";
import {Button, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import UserList from "@/store/UserList.js";

const Search = () => {
    const [filterOpt,setFilterOpt] = useState('');
    const {loadUsers} = UserList
    const btnRef = useRef();

    const searchHandler = ()=>{
        loadUsers(filterOpt.trim(),'城镇居民')
    }
    return (
        <div className={styles.search_container}>
            <Input placeholder="请输入微信用户名称" value={filterOpt} onChange={e=>setFilterOpt(e.target.value)}/>
            <Button className='blueBtn' onClick={searchHandler} ref={btnRef}><SearchOutlined /></Button>
        </div>
    );
};

export default Search;
