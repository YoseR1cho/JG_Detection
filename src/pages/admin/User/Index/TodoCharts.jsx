import React, {useEffect, useState} from 'react';
import styles from "@/pages/admin/User/style.module.less";
import {getWorkSheetNum} from "@/utils/api.js";

const TodoCharts = () => {
    const [workSheet,setWorkSheet] = useState([]);
    useEffect(() => {
        getWorkSheetNum().then(res=>{
            setWorkSheet(res.data)
        })
    }, []);
    return (
        <div className={styles.todo}>
            <h2>待办事件</h2>
            <ul>
                <li>
                    <h3>待审核</h3>
                    <div>{workSheet?workSheet['待专家审核']:0}</div>
                </li>
                <li>
                    <h3>待接单</h3>
                    <div>{workSheet?workSheet['待维修人员接单']:0}</div>
                </li>
                <li>
                    <h3>待维修</h3>
                    <div>{workSheet?workSheet['维修人员已接单，待维修']:0}</div>
                </li>
                <li>
                    <h3>待复审</h3>
                    <div>{workSheet?workSheet['维修完成，待专家复审']:0}</div>
                </li>
            </ul>
        </div>
    );
};

export default TodoCharts;
