import React, {useEffect, useState} from 'react';
import styles from './style.module.less'
import {Button, Table, ConfigProvider, Modal, Select, message} from "antd";
import {observer} from "mobx-react";
import {useNavigate, useParams} from "react-router-dom";
import UserList from "@/store/UserList.js";
import dayjs from "dayjs";
import Event from '@/store/knowledgeBase/Event.js'


const MyTable = () => {
    const navigate = useNavigate();
    const [data,setData] = useState({id:'',analyzedUrl:'',address:'',createTime:'',riskLevel:'',defectType:'',longitude:null,latitude:null,ifUrgent:0});

    const [deliveryList,setDeliveryList] = useState([]);
    const {users} = UserList
    const {deliveryEvent,eventList} = Event
    const params = useParams();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [personal,setPersonal] = useState({name:'',id:null});

    const showModal = () => {
        setIsModalOpen(true);
    };
    const personOk = () => {
        setIsModalOpen(false);
    };
    const personCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        eventList && setData(eventList.find(item=>item.id===params.id))
    }, [data]);


    const deliveryHandler = async ()=> {
        if(!personal){
            message.warning('请指定一名维修人员！')
            personCancel();
            return ;
        }
        try {
            await deliveryEvent({id:params.id,date:data.expectedTime,advice:data.advice,ifUrgent:data.ifUrgent,riskLevel:data.riskLevel,workerId:personal.id});
            setDeliveryList([...deliveryList,{id:!deliveryList?1:deliveryList.length+1,nickName:personal.name,eventName:1,createTime:dayjs(new Date()).format('YYYY.MM.DD HH:mm:ss'),isReceive:false,defectType:data.defectType}])

            // await deliveryWorkSheet({id,workId:personal})
            setPersonal(null)
            personCancel();
            message.success('指定维修人员成功！')
        }catch (e){
            console.log(e)
            setPersonal(null)
            message.error('指定维修人员失败，请重试！')
        }
    }


    const columns = [
        {
            title: '工单编号',
            dataIndex: 'id',
            align: 'center',
            width: '120px',
            sorter:(a,b)=>a.id-b.id
        },
        {
            title: '维修人员姓名',
            dataIndex: 'nickName',
            align: 'center',
            sort: true,
            width: '180px',
        },
        {
            title: '事件名称',
            dataIndex: 'eventName',
            align: 'center',
            width: '300px',
            render:(text,record)=>{
                return record.createTime+record.defectType
            }
        },
        {
            title: '发单时间',
            dataIndex: 'createTime',
            align: 'center',
            sort:true,
            width: '300px'
        },
        {
            title:'事件类型',
            dataIndex: 'defectType',
            hidden:true
        },
        {
            title: '接单状态',
            dataIndex: 'isReceive',
            align: 'center',
            width: '200px',
            render:(text)=>{
                return !text?<span style={{color:'#009fff'}}>已派单</span>:<span style={{color:'green'}}></span>
            }
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
                            <Button disabled={!record.isReceive}>已保存</Button>
                        </ConfigProvider>
                    </div>
                )
            }
        },
    ];

    return (
        <>
            <Modal title="派送维修人员"
                   open={isModalOpen}
                   onOk={personOk}
                   onCancel={personCancel}
                   footer={<Button type='primary' className={styles.blueBtn} onClick={deliveryHandler}>确认</Button>}
                   destroyOnClose={true}
            >
                <Select
                    className={styles.select}
                    style={{
                        width: 300,
                    }}
                    placeholder='请选择选择派送人员'
                    options={users && users.filter(item=>item.job==='维修人员').map(item=>{
                        return {
                            label:item.nickName,
                            value:item.id
                        }
                    })}
                    onSelect={(value,option)=> setPersonal({name:option.label,id:option.value})}
                />
            </Modal>
            <div className={styles.delivery_box}>
                <Button className={styles.blueBtn} type='primary' width='100' onClick={()=>setIsModalOpen(true)}>+ 派单</Button>
            </div>

            <Table
                rowKey={record => record.id}
                columns={columns}
                dataSource={deliveryList}
                bordered={true}
                className={styles.deliver_table}
                locale={{
                    triggerAsc:'',
                    triggerDesc:''
                }}
                scroll={{x:true}}
            />
            <div className={styles.delivery_btn_container}>
                <Button className={styles.greenBtn} type='primary' onClick={()=>{
                    message.success('派单完成，待维修人员接单');
                    navigate('/admin/defect')
                }}>完成派单</Button>
                <Button onClick={()=>navigate(-1)}>取消派单</Button>
            </div>
        </>

    );
};

export default observer(MyTable);
