import React, {useEffect, useState} from 'react';
import styles from './style.module.less'
import {Button, Table, ConfigProvider, Input, Radio, Image, DatePicker, Form} from "antd";
import Event from "@/store/Event.js";
import {observer} from "mobx-react";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import PicDemonstrator from "@/pages/admin/Defect/PicDemonstrator.jsx";
import {SearchOutlined} from "@ant-design/icons";
import display1 from '@/assets/display1.jpg'
import ok from '@/assets/ok.jpg'
import locale from "antd/locale/zh_CN.js";
import dayjs from "dayjs";
import Acceptance from "@/pages/admin/Defect/Acceptance.jsx";


const MyTable = () => {
    const navigate = useNavigate();
    const locationState = useLocation().pathname.split('/').includes('inspect')
    const {eventList,loadEventList,loading,filterList,filterState,filterEventList,loadAppEventList} = Event;
    const [status,setStatus] = useState('待专家审核')
    const [filterDate,setFilterDate] = useState(undefined);

    const dateChange = (date)=>{
        console.log(date?.toDate());
        setFilterDate(date ?date.toDate():null)
    }
    const onDelivery = (record)=>{
        const {level,pic_url,lng,lat,area,id} = record;
        navigate(locationState?`/admin/defect/inspect/delivery/${id}`:`/admin/defect/citizen/delivery/${id}`,{state: {level,pic_url,lng,lat,area}})
    }

    useEffect(() => {
        locationState?loadEventList(status):loadAppEventList(status)
    }, [status,locationState]);

    const statusChange=(e)=>{
        const s = e.target.value;
        setStatus(s);
        loadEventList(s)
    }


    let columns = [
        {
            title: '名称索引',
            dataIndex: 'picId',
            align: 'center',
            width: '100px',
        },
        {
            title: '原始图片',
            dataIndex: 'originalUrl',
            align: 'center',
            width: '150px',
            render:(text)=><Image src={text} className={styles.myImg} alt='预览'/>
        },
        {
            title: '隐患类型',
            dataIndex: 'defectType',
            align: 'center',
            width: '150px',
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
                }
            ],
            onFilter:(value, record) => record.defectType?.indexOf(value) === 0,
        },
        {
            title: '风险等级',
            dataIndex: 'riskLevel',
            align: 'center',
            width: '130px',
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
            title: '检测地点',
            dataIndex: 'address',
            align: 'center',
            width: '300px'
        },
        {
            title: '上传人员',
            dataIndex: 'inspect',
            align: 'center',
            width: '150px',
            render:(text,record)=><span>{record.inspectedInfo.match(/人:([^;]+)/)[1]}</span>
        },
        {
            title: '识别时间',
            dataIndex: 'createTime',
            align: 'center',
            sort:true,
            width: '200px'
        },
        {
            title: '维修结果',
            dataIndex: 'repairedUrl',
            align: 'center',
            width: '150px',
            render:(text,record)=>(
                <PicDemonstrator url={
                    // record.repairedUrl
                    ok
                }/>
            )
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
                            <Acceptance data={record}/>
                            <Button onClick={()=>navigate(locationState?`/admin/defect/inspect/detail/${record.id}`:`/admin/defect/citizen/detail/${record.id}`,{state:{status:record.status,lng:record.longitude,lat:record.latitude}})} className={styles.greenBtn} >查看详情</Button>
                            <Button onClick={()=>navigate(locationState?`/admin/defect/inspect/audit/${record.id}`:`/admin/defect/citizen/audit/${record.id}`,{state:{url:record.pic_url}})} className={styles.blueBtn} style={{display:!(record.status==='待专家审核') && 'none'}}>审核</Button>
                            <Button onClick={()=>onDelivery(record)} className={styles.blueBtn} style={{display:!(record.status==='待维修人员接单') && 'none'}}>派单</Button>
                            <Button onClick={()=>navigate(locationState?`/admin/defect/inspect/reAudit/${record.id}`:`/admin/defect/citizen/reAudit/${record.id}`)} style={{display:!(record.status==='维修完成，待专家复审') && 'none'}} className={styles.blueBtn}>复审</Button>
                            {/*<Button onClick={()=>navigate(locationState?`/admin/defect/inspect/output/${record.id}`:`/admin/defect/citizen/output/${record.id}`)} style={{display:!(record.status==='维修完成，待专家复审') && 'none'}}>销项</Button>*/}
                        </ConfigProvider>
                    </div>
                )
            },

        },
    ];
    // if(status!=='待专家审核')  columns = columns.filter((item) => item.dataIndex !== 'ifConfirm')
    if(status!=='维修完成，待专家复审'&&status!=='专家复审通过，可销项'&&status!=='专家复审未通过，返工')  columns =  columns.filter((item) => item.dataIndex !== 'repairedUrl')

    return (
        <div>
            <div className={styles.search_container}>
                <ConfigProvider locale={locale}>
                    <DatePicker  placeholder='请选择识别日期' maxDate={dayjs()} onChange={dateChange}/>
                </ConfigProvider>
                <Button className={styles.blueBtn} onClick={()=>filterEventList(filterDate)}><SearchOutlined /></Button>
            </div>
            <div className={styles.status_selector}>
                <Radio.Group value={status} onChange={statusChange}>
                    <Radio.Button value="待专家审核">待审核</Radio.Button>
                    <Radio.Button value="待维修人员接单">待接单</Radio.Button>
                    <Radio.Button value="维修人员已接单，待维修">待维修</Radio.Button>
                    <Radio.Button value="维修完成，待专家复审">已维修</Radio.Button>
                    <Radio.Button value="专家复审未通过，返工">已返工</Radio.Button>
                    <Radio.Button value="专家复审通过，可销项">已完毕</Radio.Button>
                </Radio.Group>
            </div>
            <Table
                loading={loading}
                rowKey={record => record.id}
                columns={columns}
                dataSource={filterState?filterList:eventList}
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

export default observer(MyTable);
