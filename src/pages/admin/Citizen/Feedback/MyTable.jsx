import React, {useEffect, useState} from 'react';
import styles from '../../Defect/style.module.less'
import {Button, Table, ConfigProvider, Input, Radio, Image, DatePicker, Form, message, Checkbox} from "antd";
import Event from "@/store/Event.js";
import {observer} from "mobx-react";
import PicDemonstrator from "@/pages/admin/Defect/PicDemonstrator.jsx";
import {SearchOutlined} from "@ant-design/icons";
import ok from '@/assets/ok.jpg'
import locale from "antd/locale/zh_CN.js";
import dayjs from "dayjs";
import {getFeedback, topFeedback} from "@/utils/api.js";
import Response from "@/pages/admin/Citizen/Feedback/Response.jsx";
import Block from "@/pages/admin/Citizen/Block.jsx";
import Delete from "@/pages/admin/Citizen/Feedback/Delete.jsx";


const MyTable = () => {
    const [dataList,setDataList] = useState([{id:'',userId:'',content:'',status:'',suggestion:'',createTime:'',updateTime:''}]);
    const [loading,setLoading] = useState(false);
    const [filterDate,setFilterDate] = useState(undefined);
    const [refresh,setRefresh] = useState(false)

    const dateChange = (date)=>{
        setFilterDate(date ?date.toDate():null)
    }

    const refreshList = ()=>{
        setRefresh(prevState => !prevState)
    }


    useEffect(() => {
        setLoading(true)
        getFeedback().then(res=>{
            setDataList(res.data.records)
            setLoading(false)
        }).catch(e=>{
            message.error('列表获取失败，请重新打开页面')
            setLoading(false)
        })
    }, [refresh]);



    let columns = [
        {
            title: '置顶',
            dataIndex: 'ifUrgent',
            align: 'center',
            width: '70px',
            render:(text,record)=><Checkbox checked={text===1} onChange={e=> {
                setLoading(true)
                topFeedback(record.id,e.target.checked?1:0).then(()=>{
                    setRefresh(prevState => !prevState)
                    setLoading(false)
                }).catch(()=>{
                    message.error('操作失败！')
                    setLoading(false)
                })

            }}/>
        },
        {
            title: '手机号',
            dataIndex: 'userPhone',
            align: 'center',
            width: '150px',
        },
        {
            title: '反馈意见',
            dataIndex: 'content',
            align: 'center',
            width: '250px'
        },
        {
            title: '反馈回复',
            dataIndex: 'suggestion',
            align: 'center',
            width: '250px',
            render:(text)=>text==='暂无处理意见'?<span style={{color:'#00c700'}}>待回复</span>:text
        },
        {
            title: '反馈时间',
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
            render:(text,record)=>{
                return (
                    <div className={styles.btnContainer}>
                        <ConfigProvider wave={{ disabled: true }}>
                            {/*<Button className='greenBtn'>标记</Button>*/}
                            <Response id={record.id} status={!(record.suggestion==='暂无处理意见')} refresh={refreshList}/>
                            <Block id={record.id}/>
                            <Delete id={record.id} refresh={refreshList}/>
                        </ConfigProvider>
                    </div>
                )
            },

        },
    ];

    return (
        <div>
            <div className={styles.search_container}>
                <ConfigProvider locale={locale}>
                    <DatePicker  placeholder='请选择反馈时间' maxDate={dayjs()}  maxDate={dayjs()} onChange={dateChange}/>
                </ConfigProvider>
                <Button className={styles.blueBtn} onClick={()=>filterEventList(filterDate)}><SearchOutlined /></Button>
            </div>
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
                pagination={{pageSize:9}}
            />
        </div>

    );
};

export default observer(MyTable);
