import React, {useEffect, useRef, useState} from 'react';
import styles from './style.module.less'
import {observer} from "mobx-react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Button, Checkbox, ConfigProvider, DatePicker, Form, Input, message, Select, Spin} from "antd";
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import TextArea from "antd/es/input/TextArea.js";
import { deleteWorkSheet} from "@/utils/api.js";
import Event from '@/store/knowledgeBase/Event.js'

dayjs.locale('zh-cn');

const Confirm = () => {
    const [data,setData] = useState({id:'',analyzedUrl:'',address:'',createTime:'',riskLevel:'',defectType:''});
    const [levelFilter,setLevelFilter] = useState('')
    const params = useParams()
    const [form] = Form.useForm()
    const navigate = useNavigate();
    const [other,setOther] = useState(false)
    const {auditEvent,eventList,loading} = Event


    useEffect(() => {
        if(eventList.length>0){
            setData(eventList.find(item=>item.id===params.id))
            setLevelFilter(data.riskLevel)
            form.setFieldsValue({riskLevel:data.riskLevel})
            return;
        }
        navigate(-1)
    }, [data]);

    const finishHandler = async (values)=>{
        const date = dayjs(values.date).format('YYYY-MM-DD HH:mm:ss')
        const {advice,ifUrgent,riskLevel,defectType} = values;

        await auditEvent({id:params.id,date:date,advice,ifUrgent,riskLevel,defectType:other?values.other:defectType});
        message.success('审核成功，待派送')
        navigate(`/admin/defect/inspect/delivery/${params.id}`)
        // await auditWorkSheet({date,eventName,advice,isUrgent,id:data.id});
    }

    const deleteHandler = async (id)=>{
        await deleteWorkSheet(id);
        navigate(-1);
    }

    return (
        <Spin spinning={loading}>
            <div className={styles.auditContainer}>
                <h2>事件审核</h2>
                <img src={
                    data?.analyzedUrl
                } alt="识别结果"/>
                <Form
                    name="basic"
                    labelCol={{
                        span: 7,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    style={{
                        maxWidth: 1200,
                    }}
                    initialValues={{
                        riskLevel:data?.riskLevel
                    }}
                    autoComplete="off"
                    className={styles.form}
                    form={form}
                    onFinish={finishHandler}
                >
                    <Form.Item
                        label='调整风险等级'
                        name='riskLevel'
                        required={true}
                    >
                        <Select
                            style={{
                                width: 150,
                            }}
                            onChange={e=>{
                                setLevelFilter(e)
                                form.setFieldsValue({defectType:null})
                            }}
                            placeholder='请调整风险等级'
                            options={[
                                {
                                    value: '无风险',
                                    label: '无风险',
                                },
                                {
                                    value: '一级风险',
                                    label: '一级风险',
                                },
                                {
                                    value: '二级风险',
                                    label: '二级风险',
                                },
                                {
                                    value: '三级风险',
                                    label: '三级风险',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label='调整隐患类型'
                        name='defectType'
                        required={true}
                    >
                        <Select
                            style={{
                                width: 150,
                            }}
                            placeholder='请调整隐患类型'
                            onChange={(value)=>setOther(value==='其他')}
                            options={
                                levelFilter==='无风险'&&[
                                    {
                                        value: '完好',
                                        label: '完好',
                                    },
                                    {
                                        value: '其他',
                                        label: '其他'
                                    }

                                ]||
                                levelFilter==='二级风险'&&[
                                    {
                                        value: '破损',
                                        label: '破损',
                                    },
                                    {
                                        value: '其他',
                                        label: '其他'
                                    }
                                ]||
                                levelFilter==='三级风险'&&[
                                    {
                                        value: '丢失',
                                        label: '丢失',
                                    },
                                    {
                                        value: '未覆盖',
                                        label: '未覆盖',
                                    },
                                    {
                                        value: '其他',
                                        label: '其他'
                                    }
                                ]||
                                levelFilter==='一级风险'&&[
                                    {
                                        value: '井圈问题',
                                        label: '井圈问题',
                                    },
                                    {
                                        value: '其他',
                                        label: '其他'
                                    }]
                            }
                        />
                    </Form.Item>
                    { other && <Form.Item
                    label="其他隐患类型"
                    name="other"
                    required={true}
                    wrapperCol={{
                        span:6
                    }}
                >
                    <Input placeholder='请填写其他隐患类型'/>
                </Form.Item>}
                    <ConfigProvider locale={locale}>
                        <Form.Item
                            name='date'
                            label='完成期限'

                        >
                            <DatePicker minDate={dayjs()} placeholder='选择完成期限' showTime/>
                        </Form.Item>
                    </ConfigProvider>

                    <Form.Item
                        label="审核建议"
                        name="advice"
                    >
                        <TextArea rows={6} placeholder='请在此填写您的建议'/>
                    </Form.Item>

                    <Form.Item
                        name="ifUrgent"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 11,
                            span: 16,
                        }}
                    >
                        <Checkbox>需要紧急处理</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset:4,
                            span: 16,
                        }}
                    >
                        <div className={styles.btn_container}>
                            <Button type="primary" htmlType="submit" className={styles.blueBtn}>审核通过</Button>
                            <Button type="primary"  className={styles.redBtn} onClick={()=>deleteHandler(data.id)}>误报删除</Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </Spin>
    );
};

export default observer(Confirm);
