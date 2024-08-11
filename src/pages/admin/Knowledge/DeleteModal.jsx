import React, {useState} from 'react';
import {Button, message, Modal} from "antd";
import styles from "@/pages/admin/User/style.module.less";
import {deleteKnowledge} from "@/utils/api.js";
import Reason from "@/store/knowledgeBase/Reason.js";
import Feature from "@/store/knowledgeBase/Feature.js";
import Process from "@/store/knowledgeBase/Process.js";
import Matter from "@/store/knowledgeBase/Matter.js";
import News from "@/store/knowledgeBase/News.js";

const DeleteModal = ({id,text}) => {
    const [open,setOpen] = useState(false);
    const showModal = ()=>{
        setOpen(true)
    }

    const handleCancel  = ()=>{
        setOpen(false)
    }

    const deleteHandle = async ()=>{
        try {
            await deleteKnowledge(id)
            if(text==='寻因'){
                Reason.loadReasons();
            }else if(text==='特征'){
                Feature.loadFeatures();
            }else if(text==='作业步骤'){
                Process.loadProcess()
            }else if(text==='事项'){
                Matter.loadMatters()
            }else{
                News.loadNews()
            }
            message.success('删除成功')
            handleCancel();
        }
        catch (e){
            console.log(e)
            message.error('删除失败')
        }
    }
    return (
        <>
            <Button className='redBtn' onClick={showModal} >删除</Button>
            <Modal title={`删除${text}`} open={open} onCancel={handleCancel} footer={<div className={styles.deleteContainer}>
                <Button onClick={handleCancel}>取消</Button>
                <Button type='primary' onClick={deleteHandle}>删除</Button>
            </div>
            }>
                <p>确定删除该{text}吗？</p>
            </Modal>
        </>
    );
};

export default DeleteModal;
