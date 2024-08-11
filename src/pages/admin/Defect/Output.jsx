import React from 'react';
import styles from './style.module.less'
import {observer} from "mobx-react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, ConfigProvider, DatePicker, Form, Input, message, Select} from "antd";
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import TextArea from "antd/es/input/TextArea.js";
import Event from "@/store/knowledgeBase/Event.js";

dayjs.locale('zh-cn');

const Output = () => {
    const [form] = Form.useForm()
    const params = useParams()
    const navigate = useNavigate()
    const {outputEvent} = Event

    const finishHandler = async (values)=>{

        if(!params.id){
            message.error('销项错误！')
            navigate('/admin/defect/inspect')
            return;
        }

        await outputEvent(params.id);
        message.success('销项成功')
    }

    return (
        <div className={styles.auditContainer}>
            <h2>闭环销项</h2>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 12,
                }}
                style={{
                    maxWidth: 1200,
                }}
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"
                className={styles.form}
                form={form}
                onFinish={finishHandler}
            >
                <Form.Item
                    label="落实情况"
                    name="situation"
                    required={true}
                >
                    <TextArea rows={6} placeholder='请在此填写落实情况'/>
                </Form.Item>

                <Form.Item
                    label="验收说明"
                    name="illustration"
                    required={true}
                >
                    <TextArea rows={6} placeholder='请在此填写验收说明'/>
                </Form.Item>
                <ConfigProvider locale={locale}>
                    <Form.Item
                        name='date'
                        label='销毁日期'
                        placeholder='选择销毁日期'
                        required={true}
                    >
                        <DatePicker maxDate={dayjs()} minDate={dayjs().subtract(60,'day')}/>
                    </Form.Item>
                </ConfigProvider>
                <Form.Item
                    wrapperCol={{
                        offset:6,
                        span: 16,
                    }}
                >
                    <div className={styles.btn_container}>
                        <Button type="primary" htmlType="submit" className={styles.blueBtn}>审核通过</Button>
                        <Button type="primary"  className={styles.redBtn}>误报删除</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default observer(Output);
