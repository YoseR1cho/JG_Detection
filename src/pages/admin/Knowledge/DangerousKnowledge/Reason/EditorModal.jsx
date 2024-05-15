import React, {useState} from 'react';
import styles from "../style.module.less";
import {Button, Form, Input, Modal, Select, Upload} from "antd";
import {formItemLayout} from "@/utils/config.js";
import Reason from "@/store/Reason.js";
import {normFile, picHandler} from "@/utils/index.js";
import {PlusOutlined} from "@ant-design/icons";

const EditorModal = ({isAdd = true,data}) => {
    const [isOpen,setOpen] = useState(false)
    const {TextArea} = Input
    const {addInfo,updateReason} = Reason

    const showModal = ()=>{
        setOpen(true)
    }

    const hideModal = ()=>{
        setOpen(false);
    }

    const finishHandler = async (values)=>{
        try {
            if(!values.coverUrl){
                if(isAdd){
                    addInfo(values);
                    hideModal()
                    return ;
                }
                updateReason(data.id,values)
                hideModal()
                return ;
            }
            picHandler(values.coverUrl[0]).then(res=>{
                values.coverUrl = res.data;
                console.log(res)
                if(isAdd){
                    addInfo(values);
                    hideModal()
                    return ;
                }
                updateReason(data.id,values)
                hideModal()
            })
        }catch (e){
            console.log(e)
        }
    }

    return (
        <>
            {isAdd ? <Button className={`${styles.refresh} blueBtn`} onClick={showModal}>新增寻因</Button>:<Button className='blueBtn' onClick={showModal}>编辑</Button>}
            <Modal title={isAdd?"新增寻因":'编辑寻因'}
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
                        riskLevel:data.riskLevel,
                        title:data.title,
                        content:data.content
                    }}
                >
                    <Form.Item
                        label="封面"
                        name="coverUrl"
                        required={true}
                        valuePropName='fileList'
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            beforeUpload={()=>false}
                            maxCount={1}
                        >
                            <button
                                style={{
                                    border: 0,
                                    background: 'none',
                                }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >{isAdd?'上传封面':'更改封面'}
                                </div>
                            </button>
                        </Upload>
                    </Form.Item>
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
                        <Input placeholder='请输入标题'/>
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: '请输入描述！',
                            },
                        ]}
                    >
                        <Input placeholder='请输入寻因的简要描述'/>
                    </Form.Item>

                    <Form.Item
                        label="原因"
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: '请输入原因/建议！',
                            },
                        ]}
                    >
                        <Input.TextArea className={styles.reasonInput} placeholder='请输入发生原因'/>
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

export default EditorModal;
