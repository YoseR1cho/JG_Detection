import React, {useState} from 'react';
import styles from "./style.module.less";
import {Button, Form, Image, Input, Modal, Upload} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import Matter from "@/store/Matter.js";
import {normFile, picHandler} from "@/utils/index.js";

const EditorModal = ({isAdd = true,data}) => {
    const [isOpen,setOpen] = useState(false)
    const {TextArea} = Input
    const {addMatter,updateMatter} = Matter;

    const showModal = ()=>{
        setOpen(true)
    }

    const hideModal = ()=>{
        setOpen(false)
    }
    const finishHandler = async (values)=>{
        try {
            if(!values.coverUrl){
                if(isAdd){
                    addMatter(values);
                    hideModal()
                    return ;
                }
                updateMatter(data.id,values)
                hideModal()
                return ;
            }
            picHandler(values.coverUrl[0]).then(res=>{
                values.coverUrl = res.data;
                if(isAdd){
                    addMatter(values);
                    hideModal()
                    return ;
                }
                updateMatter(data.id,values)
                hideModal()
            })
        }catch (e){
            console.log(e)
        }

    }

    return (
        <>
            {isAdd ? <Button className={`${styles.refresh} blueBtn`} onClick={showModal}>发布事项</Button>:<Button className='blueBtn' onClick={showModal}>编辑</Button>}
            <Modal title={isAdd?"发布事项":'编辑事项'}
                   open={isOpen}
                   onCancel={()=>setOpen(false)}
                   footer={<></>}
                   destroyOnClose={true}
                   maskClosable={false}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    style={{
                        maxWidth: 700,
                        marginTop:30
                    }}
                    autoComplete="off"
                    initialValues={!isAdd&&{
                        question:data.question,
                        solution:data.solution
                    }}
                    onFinish={finishHandler}
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
                        label="问题描述"
                        name="question"
                    >
                        <Input size={"large"} placeholder='请输入问题描述'/>
                    </Form.Item>

                    <Form.Item
                        label="解决方案"
                        name="solution"
                    >
                        <TextArea style={{height:'120px'}} placeholder='请输入解决方案'/>
                    </Form.Item>

                        <Form.Item

                            wrapperCol={{
                                offset: 8,
                                span: 18,
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
