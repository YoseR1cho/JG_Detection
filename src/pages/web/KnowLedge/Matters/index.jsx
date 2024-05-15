import React, {useState} from 'react';
import styles from './style.module.less'
import {PlusOutlined, VerticalAlignTopOutlined} from "@ant-design/icons";
import MyModal from "@/pages/web/KnowLedge/Matters/MyModal.jsx";
import Matter from "@/store/Matter.js";
import {observer} from "mobx-react";
import {Pagination} from "antd";

const Index = () => {
    const {matters,addMatter} = Matter
    return (
        <div className={styles.overall}>
            <div className={styles.title}>维检事项</div>
            <div className={styles.wrapper}>
                <ul className={styles.list}>
                    {matters.map(item=>(
                        <li key={item.id}>
                            <div className={styles.article_left}>
                                <div className={styles.article_title}>{item.question}</div>
                                <div className={styles.detail}>{item.solution}</div>
                                <div className={styles.tip}>
                                    <span>{item.userInfo || '来源'}</span>
                                    <div className={styles.divide}></div>
                                    <span>{item.createTime}</span>
                                </div>
                            </div>
                            <div className={styles.imgContainer}>
                                <img src={item.coverUrl} alt="事项图片" />
                            </div>

                        </li>
                    ))}
                </ul>
                <MyModal addArticle={(newArticle)=>addMatter(newArticle)}/>
                <button className={styles.top} onClick={()=>scroll(0,0)}><VerticalAlignTopOutlined /></button>
            </div>
            <Pagination defaultCurrent={1} total={matters.length} pageSize={7}/>
        </div>
    );
};

export default observer(Index);
