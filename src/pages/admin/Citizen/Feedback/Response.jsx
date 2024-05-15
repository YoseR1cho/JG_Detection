import React, {useState} from 'react';
import {Button, Form, Input, message, Modal, Select, Upload} from "antd";
import {formItemLayout} from "@/utils/config.js";
import {normFile} from "@/utils/index.js";
import {PlusOutlined} from "@ant-design/icons";
import styles from "@/pages/admin/Knowledge/DangerousKnowledge/style.module.less";
import {replyFeedback} from "@/utils/api.js";

const Response = ({id,status,refresh}) => {
    const [isOpen,setOpen] = useState(false)
    const openHandler = ()=>setOpen(true)
    const cancelHandler = ()=>setOpen(false)

    const finishHandler = (values)=>{
        replyFeedback(id,values.suggestion).then(res=>{
            refresh()
            message.success('回复成功')
            cancelHandler()
        }).catch(e=>{
            message.error('回复错误，请稍后重试！')
        })
    }
    return (
        <>
            {!status && <Button onClick={openHandler} className='blueBtn'>回复</Button>}
            <Modal title='意见回复'
                   open={isOpen}
                   onCancel={()=>setOpen(false)}
                   footer={<></>}
                   destroyOnClose={true}
                   maskClosable={false}
            >
                <Form
                    {...formItemLayout}
                    variant="filled"
                    style={{
                        maxWidth: 800,
                        marginTop:'30px'
                    }}
                    onFinish={finishHandler}
                >
                    <Form.Item
                        label="意见回复"
                        name="suggestion"
                        rules={[
                            {
                                required: true,
                                message: '请输入回复！',
                            },
                        ]}
                        wrapperCol={{
                            span:16
                        }}
                    >
                        <Input.TextArea className={styles.reasonInput} placeholder='请输入您对该意见的回复' />
                    </Form.Item>

                    <Form.Item

                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button htmlType="submit" className='blueBtn' style={{marginRight:'30px'}}>
                            回复
                        </Button>
                        <Button onClick={cancelHandler}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Response;
