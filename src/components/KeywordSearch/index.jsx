import React, {useState} from 'react';
import styles from './style.module.less'
import {Button, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const Index = ({load}) => {
    const [filterOpt,setFilterOpt] = useState('');

    const searchHandler = ()=>{
        if(filterOpt.trim()===''){
            load()
            return;
        }
        load(filterOpt)
    }

    return (
        <div className={styles.search_container}>
            <Input placeholder="请输入关键词搜索" value={filterOpt} onChange={e=>setFilterOpt(e.target.value)} />
            <Button className={styles.blueBtn} onClick={searchHandler} ><SearchOutlined /></Button>
        </div>
    );
};

export default Index;
