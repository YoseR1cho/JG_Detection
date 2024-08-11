import React, {useEffect} from 'react';
import { Image, Table} from "antd";
import styles from './style.module.less'
import News from "@/store/knowledgeBase/News.js";
import {observer} from "mobx-react";
import EditorModal from "@/pages/admin/Knowledge/News/EditorModal.jsx";
import DeleteModal from "@/pages/admin/Knowledge/DeleteModal.jsx";
import KeywordSearch from "@/components/KeywordSearch/index.jsx";

const Index = () => {
    const {news,loading,loadNews} = News

    const columns = [
        {
            title: '来源',
            dataIndex: 'source',
            align: 'center',
            width: '130px',
            render:(text)=>(<span style={{fontSize:'18px',fontWeight:800}}>{text}</span>)
        },
        {
            title: '封面',
            dataIndex: 'coverUrl',
            align: 'center',
            width: '150px',
            render:(text)=><Image src={text} className={styles.img}/>
        },
        {
            title: '标题',
            dataIndex: 'title',
            align: 'left',
            width: '200px',
            filterSearch: true,
            className:styles.title
        },
        {
            title: '正文',
            dataIndex: 'description',
            align: 'left',
            width: '300px',
        },
        {
            title: '链接',
            dataIndex: 'href',
            align: 'center',
            width: '130px',
            filterSearch: true,
            className:styles.title,
            render:(text)=>(
                <a className={styles.href} href={text} target='_blank'>点击跳转</a>
            )
        },
        {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            width: '20%',
            fixed:'right',
            render:(text,record)=>(
                <div className={styles.btnContainer}>
                    <EditorModal isAdd={false} data={record}/>
                    <DeleteModal id={record.id} text='新闻'/>
                </div>
            )
        },
    ];

    useEffect(() => {
        loadNews()
    }, []);
    return (
        <div>
            <EditorModal />
            <KeywordSearch load={loadNews}/>
            <Table
                loading={loading}
                rowKey={record => record.id}
                columns={columns}
                dataSource={news}
                bordered={true}
                locale={{
                    triggerAsc:'',
                    triggerDesc:''
                }}
                scroll={{x:true}}
                pagination={{pageSize:5}}
            />
        </div>
    );
};

export default observer(Index);
