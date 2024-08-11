import React, {useState} from 'react';
import styles from "./style.module.less";
import {Button, Form, Image, Input, message, Modal, Upload} from "antd";
import News from "@/store/knowledgeBase/News.js";

const EditorModal = ({isAdd = true,data}) => {
    const [isOpen,setOpen] = useState(false)
    const {TextArea} = Input
    const {addNews,updateNews} = News

    const showModal = ()=>{
        setOpen(true)
    }

    const hideModal =()=>{
        setOpen(false);
    }

    const finishHandler = async (values)=>{
        try {
            if(isAdd){
                await addNews(values)
                hideModal();
                return ;
            }
            await updateNews(data.id,values);
            hideModal()
        }
        catch (e){
            console.log(e)
        }
    }

    return (
        <>
            {isAdd ? <Button className={`${styles.refresh} blueBtn`} onClick={showModal}>发布新闻</Button>:<Button className='blueBtn' onClick={showModal}>编辑</Button>}
            <Modal title={isAdd?"发布新闻":'编辑新闻'}
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
                    multiple={false}
                    autoComplete="off"
                    initialValues={!isAdd&&{
                        coverUrl:data.coverUrl,
                        title:data.title,
                        description:data.description,
                        href:data.href
                    }}
                    onFinish={finishHandler}
                >
                    <Form.Item
                        label="来源"
                        name="source"
                        required={true}
                    >
                        <Input size={"large"} placeholder='请输入新闻来源'/>
                    </Form.Item>
                    <Form.Item
                        label="封面"
                        name="coverUrl"
                        required={true}
                    >
                        <Input size={"large"} placeholder='请输入新闻封面链接'/>
                    </Form.Item>


                    <Form.Item
                        label="标题"
                        name="title"
                        required={true}
                    >
                        <Input size={"large"} placeholder='请输入新闻标题'/>
                    </Form.Item>

                    <Form.Item
                        label="描述"
                        name="description"
                        required={true}
                    >
                        <TextArea style={{height:'120px'}} placeholder='请输入新闻描述'/>
                    </Form.Item>

                    <Form.Item
                        label="链接"
                        name="href"
                        required={true}
                    >
                        <Input size={"large"} placeholder='请输入新闻链接'/>
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
