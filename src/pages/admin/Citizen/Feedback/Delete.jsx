import React, {useState} from 'react';
import {Button, Form, Input, message, Modal, Select, Upload} from "antd";
import {formItemLayout} from "@/utils/config.js";
import {normFile} from "@/utils/index.js";
import {PlusOutlined} from "@ant-design/icons";
import styles from "@/pages/admin/Knowledge/DangerousKnowledge/style.module.less";
import {blockUser, deleteFeedback, replyFeedback} from "@/utils/api.js";

const Delete = ({id,refresh}) => {
    const [isOpen,setOpen] = useState(false)
    const openHandler = ()=>setOpen(true)
    const cancelHandler = ()=>setOpen(false)

    const deleteRecord = ()=>{
        deleteFeedback(id).then(res=>{
            message.success('删除成功！')
            cancelHandler()
            refresh()
        }).catch(()=>{
            message.error('删除失败，请重试！')
        })
    }
    return (
        <>
            <Button className='redBtn' onClick={openHandler}>删除</Button>
            <Modal title='删除反馈记录'
                   open={isOpen}
                   onCancel={()=>setOpen(false)}
                   footer={<></>}
                   destroyOnClose={true}
                   maskClosable={false}
            >
                <h2 style={{
                    textAlign:'center',
                    display:'block',
                    margin:'50px 0',
                    fontWeight:400
                }}>您确定删除该反馈记录吗？</h2>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button  className='redBtn' style={{marginRight:'50px'}} onClick={deleteRecord}>
                        删除
                    </Button>
                    <Button onClick={cancelHandler} className='blueBtn'>
                        取消
                    </Button>
                </Form.Item>
            </Modal>
        </>
    );
};

export default Delete;
