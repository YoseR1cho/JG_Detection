import React from 'react';
import { Table} from "antd";
import styles from '../style.module.less'
import {observer} from "mobx-react";
import ProcessModal from "./ProcessModal.jsx";
import Process from "@/store/knowledgeBase/Process.js";
import DeleteModal from "@/pages/admin/Knowledge/DeleteModal.jsx";

const Index = () => {
    const {process,loading,updateProcess} = Process

    const columns = [
        {
            title: '步骤',
            dataIndex: 'step',
            align: 'center',
            width: '100px',
            render:(text)=>(<div className={styles.step}>{text}</div>),
        },
        {
            title: '标题',
            dataIndex: 'title',
            align: 'center',
            width: '200px',
            filterSearch: true,
            render:(text)=><p style={{fontSize:'18px',fontWeight:600}}>{text}</p>
        },
        {
            title: '内容',
            dataIndex: 'content',
            align: 'left',
            width: '300px',
        },
        {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            width: '20%',
            fixed:'right',
            render:(text,record)=>(
                <div className={styles.btnContainer}>
                    <ProcessModal isAdd={false} data={record}/>
                    <DeleteModal id={record.id} text='作业步骤'/>
                </div>
            )
        },
    ];
    return (
            <Table
                loading={loading}
                rowKey={record => record.id}
                columns={columns}
                dataSource={process}
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
