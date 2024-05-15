import React, {useState} from 'react';
import styles from "../style.module.less";
import {Button, Form, Input, Modal, Select, Upload} from "antd";
import {formItemLayout} from "@/utils/config.js";
import Reason from "@/store/Reason.js";
import {normFile, picHandler} from "@/utils/index.js";
import {PlusOutlined} from "@ant-design/icons";
import Process from "@/store/Process.js";

const ProcessModal = ({isAdd = true,data}) => {
    const [isOpen,setOpen] = useState(false)
    const {TextArea} = Input
    const {addProcess,updateProcess,process} = Process

    const showModal = ()=>{
        setOpen(true)
    }

    const hideModal = ()=>{
        setOpen(false);
    }

    const finishHandler = async (values)=>{
        try {
            if(isAdd){
                addProcess(values);
                hideModal()
                return ;
            }
            updateProcess(data.id,values)
            hideModal()
        }catch (e){
            console.log(e)
        }
    }

    return (
        <>
            {isAdd ? <Button className={`${styles.refresh} blueBtn`} onClick={showModal}>新增步骤</Button>:<Button className='blueBtn' onClick={showModal}>编辑</Button>}
            <Modal title={isAdd?"新增作业步骤":'编辑作业步骤'}
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
                    initialValues={data && {
                        step:data.step,
                        title:data.title,
                        content:data.content
                    }}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: '请输入标题！',
                            },
                        ]}
                    >
                        <Input placeholder='请输入作业步骤标题'/>
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: '请输入内容！',
                            },
                        ]}
                    >
                        <TextArea placeholder='请输入作业步骤内容' style={{height:'150px'}}/>
                    </Form.Item>

                    <Form.Item

                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button htmlType="submit" className='blueBtn' style={{marginRight:'30px'}}>
                            {isAdd?'发布':'更改'}
                        </Button>
                        <Button onClick={()=>setOpen(false)}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ProcessModal;
