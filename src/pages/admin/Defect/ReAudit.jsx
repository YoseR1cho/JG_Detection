import React, {useEffect, useState} from 'react';
import styles from './style.module.less'
import {observer} from "mobx-react";
import { useNavigate, useParams} from "react-router-dom";
import {Button, Form, Input, message, Spin} from "antd";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import Event from '@/store/knowledgeBase/Event.js'

dayjs.locale('zh-cn');

const ReAudit = () => {

    const params = useParams()
    const navigate = useNavigate();
    const [repairedUrl,setRepairedUrl] = useState('');
    const {reAuditEvent,loading,eventList} = Event
    const {TextArea} = Input
    const [advice,setAdvice] = useState('')

    useEffect(() => {
        eventList && setRepairedUrl(eventList.find(item=>item.id===params.id)?.repairedUrl)
    }, [repairedUrl]);



    const reAuditHandler = async (msg)=>{
        if(!params.id){
            message.error('操作出错，请重试')
            navigate(-1)
            return ;
        }
        await reAuditEvent(params.id,msg,advice)
        message.success('复审完成！')
        navigate(-1)
    }



    return (
        <Spin spinning={loading}>
            <div className={styles.auditContainer}>
                <h2>事件复审</h2>
                <img src={repairedUrl} alt="维修图片" className={styles.repairedPic}/>
                <Form.Item
                    label='验收意见'
                    labelCol={{
                        span:6
                    }}
                    wrapperCol={{
                        span:12,
                    }}
                    style={{
                        margin:'30px 0'
                    }}
                >
                    <TextArea placeholder='请在此填写您的验收意见' size={"large"} style={{minHeight:'120px'}} value={advice} onChange={(e)=>setAdvice(e.target.value)}/>
                </Form.Item>
                <div className={styles.btn_container} style={{margin:'30px 0'}}>
                    <Button type="primary" className={styles.blueBtn} onClick={()=>reAuditHandler('专家复审通过，可销项')}>复审通过</Button>
                    <Button type="primary"  className={styles.redBtn} onClick={()=>reAuditHandler('专家复审未通过，返工')}>未通过返工</Button>
                </div>
            </div>
        </Spin>
    );
};

export default observer(ReAudit);
