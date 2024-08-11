import React, {useState} from 'react';
import {Button, Form, Input, message, Modal, Select, Upload} from "antd";
import {formItemLayout} from "@/utils/config.js";
import {normFile} from "@/utils/index.js";
import {PlusOutlined} from "@ant-design/icons";
import styles from "@/pages/admin/Knowledge/DangerousKnowledge/style.module.less";
import {blockUser, replyFeedback} from "@/utils/api.js";

const Block = ({id}) => {
    const [isOpen,setOpen] = useState(false)
    const openHandler = ()=>setOpen(true)
    const cancelHandler = ()=>setOpen(false)

    const block = ()=>{
        blockUser(id).then(res=>{
            message.success('拉黑成功')
            cancelHandler()
        }).catch(()=>{
            message.error('拉黑失败，请重试')
            cancelHandler()
        })
    }
    return (
        <>
            <Button className='blueBtn' onClick={openHandler}>拉黑</Button>
            <Modal title='拉黑用户'
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
                }}>您确定拉黑该用户吗？</h2>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button  className='redBtn' style={{marginRight:'50px'}} onClick={block}>
                        拉黑
                    </Button>
                    <Button onClick={cancelHandler} className='blueBtn'>
                        取消
                    </Button>
                </Form.Item>
            </Modal>
        </>
    );
};

export default Block;
