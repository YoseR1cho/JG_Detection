import React, {useRef, useState} from 'react';
import styles from "@/pages/admin/User/style.module.less";
import {Button, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import News from "@/store/News.js";

const Search = () => {
    const [filterOpt,setFilterOpt] = useState('');
    const {loadNews} = News
    const btnRef = useRef();

    const searchHandler = ()=>{
        loadNews(filterOpt)
        /*if(!filterOpt) {
            setDataList(users);
            return ;
        }
        const filterDatas = users.filter(item=>item.nickName.includes(filterOpt))
        setDataList(filterDatas);*/
    }
    return (
        <div className={styles.search_container}>
            <Input placeholder="请输入关键字搜索" value={filterOpt} onChange={e=>setFilterOpt(e.target.value)} onKeyDown={()=>btnRef.current.click()}/>
            <Button className={styles.blueBtn} onClick={searchHandler} ref={btnRef}><SearchOutlined /></Button>
        </div>
    );
};

export default Search;
