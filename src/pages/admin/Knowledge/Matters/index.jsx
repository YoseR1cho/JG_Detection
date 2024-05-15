import React, {useState} from 'react';
import {Button, Table, Image, Input} from "antd";
import styles from './style.module.less'
import {observer} from "mobx-react";
import EditorModal from "./EditorModal.jsx";
import Matter from "@/store/Matter.js";
import DeleteModal from "@/pages/admin/Knowledge/DeleteModal.jsx";
import {SearchOutlined} from "@ant-design/icons";
import KeywordSearch from "@/components/KeywordSearch/index.jsx";

const Index = () => {
    const {matters,addMatter,editMatter,loading,loadMatters} = Matter
    const columns = [
        {
            title: '封面',
            dataIndex: 'coverUrl',
            align: 'center',
            width: '150px',
            render:(text)=>text?<Image src={text} className={styles.myImg}/>:''
        },
        {
            title: '问题描述',
            dataIndex: 'question',
            align: 'center',
            width: '200px',
            filterSearch: true,
            className:styles.title
        },
        {
            title: '解决方案',
            dataIndex: 'solution',
            align: 'left',
            width: '250px',
        },
        {
            title:'上传人员',
            dataIndex:'userInfo',
            align:'center',
            width:'150px',
        },
        {
            title: '上传时间',
            dataIndex: 'createTime',
            align: 'center',
            sort:true,
            width: '200px'
        },
        {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            width: '20%',
            fixed:'right',
            render:(text,record)=>(
                <div className={styles.btnContainer}>
                    <EditorModal isAdd={false} data={record} editMatter={editMatter}/>
                    <DeleteModal id={record.id} text='事项'/>
                </div>
            )
        },
    ];

    return (
        <div>
            <EditorModal addMatter={addMatter} />
            <KeywordSearch load={loadMatters}/>
            <Table
                loading={loading}
                rowKey={record => record.id}
                columns={columns}
                dataSource={matters}
                bordered={true}
                locale={{
                    triggerAsc:'',
                    triggerDesc:''
                }}
                scroll={{x:true}}
                pagination={{pageSize:7}}
            />
        </div>
    );
};

export default observer(Index);
