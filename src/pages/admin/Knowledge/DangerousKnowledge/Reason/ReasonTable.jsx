import React from 'react';
import {Button, Image, Table} from "antd";
import styles from '../style.module.less'
import {observer} from "mobx-react";
import EditorModal from "./EditorModal.jsx";
import Reason from "@/store/knowledgeBase/Reason.js";
import DeleteModal from "@/pages/admin/Knowledge/DeleteModal.jsx";

const Index = () => {
    const {dataList,loading,updateReason} = Reason

    const columns = [

        {
            title: '封面',
            dataIndex: 'coverUrl',
            align: 'center',
            width: '150px',
            render:(text)=>text?<Image src={text} className={styles.img}/>:'-'
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
            title: '描述',
            dataIndex: 'description',
            align: 'left',
            width: '300px',
        },
        {
            title: '原因',
            dataIndex: 'content',
            align: 'left',
            width: '250px',
        },
        {
            title: '创建日期',
            dataIndex: 'createTime',
            align: 'center',
            width: '150px',
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
                    <DeleteModal id={record.id} text='寻因'/>
                </div>
            )
        },
    ];
    return (
            <Table
                loading={loading}
                rowKey={record => record.id}
                columns={columns}
                dataSource={dataList}
                bordered={true}
                locale={{
                    triggerAsc:'',
                    triggerDesc:''
                }}
                scroll={{x:true}}
                pagination={{pageSize:7}}
            />
    );
};

export default observer(Index);
