import React, {useEffect} from 'react';
import { Table,Image} from "antd";
import styles from '../style.module.less'
import {observer} from "mobx-react";
import DeleteModal from "@/pages/admin/Knowledge/DeleteModal.jsx";
import Feature from "@/store/Feature.js";
import FeatureModal from "@/pages/admin/Knowledge/DangerousKnowledge/Feature/FeatureModal.jsx";

const Index = () => {
    const {features,loading,loadFeatures} = Feature

    const columns = [
        {
            title: '例图',
            dataIndex: 'coverUrl',
            align: 'center',
            width: '150px',
            filterSearch: true,
            render:(text)=>text?<Image src={text} className={styles.img}/>:''
        },
        {
            title: '隐患类型',
            dataIndex: 'defectType',
            width: '150px',
            align: "center",
            filters:[
                {
                    text:'完好',
                    value:'完好'
                },
                {
                    text:'破损',
                    value:'破损'
                },
                {
                    text:'丢失',
                    value:'丢失'
                },
                {
                    text:'未覆盖',
                    value:'未覆盖'
                },
                {
                    text:'井圈问题',
                    value:'井圈问题'
                },
                {
                    text:'其他类型',
                    value:'其他类型'
                }
            ],
            onFilter:(value, record) => record.defectType.indexOf(value) === 0,
            render:(text)=>{
                return <span style={{fontWeight:text==='其他类型'?400:800,fontSize:'16px'}}>{text}</span>
            }
        },
        {
            title: '特征',
            dataIndex: 'content',
            align: 'left',
            width: '250px',
        },
        {
            title: '风险等级',
            dataIndex: 'riskLevel',
            width: '150px',
            align: "center",
            filters:[
                {
                    text:'无风险',
                    value:'无风险'
                },
                {
                    text:'一级风险',
                    value:'一级风险'
                },
                {
                    text:'二级风险',
                    value:'二级风险'
                },
                {
                    text:'三级风险',
                    value:'三级风险'
                }
            ],
            onFilter:(value, record) => record.riskLevel.indexOf(value) === 0,
            render:(text)=>{
                return <span style={{color:(text==='三级风险' && 'red') || (text==='二级风险' && 'orange') || (text==='一级风险' && '#e6d70d') || (text==='无风险' && '#008f00'),fontSize:'16px'}}>{text}</span>
            }
        },
        {
            title: '风险说明',
            dataIndex: 'description',
            width: '300px',
            align: "left",
        },
        {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            width: '20%',
            fixed:'right',
            render:(text,record)=>(
                <div className={styles.btnContainer}>
                    <FeatureModal isAdd={false} data={record}/>
                    <DeleteModal id={record.id} text='特征'/>
                </div>
            )
        },
    ];

    useEffect(() => {
        loadFeatures()
    }, []);
    return (
            <Table
                loading={loading}
                rowKey={record => record.id}
                columns={columns}
                dataSource={features}
                bordered={true}
                locale={{
                    triggerAsc:'',
                    triggerDesc:''
                }}
                scroll={{x:true}}
                pagination={{pageSize:5}}
            />
    );
};

export default observer(Index);
