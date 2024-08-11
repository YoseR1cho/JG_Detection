import React, {useEffect, useState} from 'react';
import styles from './style.module.less'
import {observer} from "mobx-react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Event from '@/store/knowledgeBase/Event.js'
import { Spin } from "antd";
import result from '@/assets/display2.jpg'
import DetailMap from "@/components/DetailMap/index.jsx";

const Detail = () => {
    const [data,setData] = useState({id:'',analyzedUrl:'',address:'',createTime:'',riskLevel:'',defectType:'',longitude:undefined,latitude:undefined})
    const {eventList,loading,loadEventList,loadAppEventList}  = Event;
    const navigate = useNavigate()
    const state = useLocation()?.state
    const locationState = useLocation().pathname.split('/').includes('inspect')
    const params = useParams();

    useEffect(() => {
        if(!state.status){
            navigate(locationState?'/admin/defect/inspect':'/admin/defect/citizen')
            return ;
        }
        locationState?loadEventList(state.status):loadAppEventList(state.status)
        eventList.length>0 && setData(eventList.find(item=>item.id===params.id))
    }, []);



    return (
        <Spin spinning={loading}>
            <div className={styles.container}>
                <h2>查看详情</h2>
                <img src={
                    data.analyzedUrl
                } alt=""/>
                <div className={styles.data_container}>
                    <div className={styles.big}>
                        <span className={styles.des}>发生地点:</span>
                        <span className={styles.data}>{data.address}</span>
                    </div>
                    <div className={styles.small}>
                        <span className={styles.des}>识别时间:</span>
                        <span className={styles.data}>{data.createTime}</span>
                    </div>
                    <div className={styles.big}>
                        <span className={styles.des}>风险程度:</span>
                        <span className={styles.data} style={{color:(data.riskLevel==='三级风险' && 'red') || (data.riskLevel==='二级风险' && 'orange') || (data.riskLevel==='无风险' && '#008f00')}}>{data.riskLevel}</span>
                    </div>
                    <div className={styles.small}>
                        <span className={styles.des}>隐患类型:</span>
                        <span className={styles.data}>{data.defectType}</span>
                    </div>
                    <div className={styles.big}>
                        <span className={styles.des}>经度:</span>
                        <span className={styles.data}>{data.longitude}</span>
                    </div>
                    <div className={styles.small}>
                        <span className={styles.des}>纬度:</span>
                        <span className={styles.data}>{data.latitude}</span>
                    </div>
                    <DetailMap lng={state && state.lng} lat={state && state.lat}/>
                </div>
            </div>
        </Spin>
    );
};

export default observer(Detail);
