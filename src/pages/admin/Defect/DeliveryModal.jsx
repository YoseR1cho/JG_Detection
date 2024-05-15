import React, {useState} from 'react';
import {Button, message, Modal, Select} from "antd";
import styles from "@/pages/admin/Defect/style.module.less";

const DeliveryModal = ({workSheet}) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [personal,setPersonal] = useState('');
    const personOk = () => {
        setIsModalOpen(false);
    };
    const personCancel = () => {
        setIsModalOpen(false);
    };
    const deliveryHandler = async ()=> {
        if(!personal){
            message.warning('请指定一名维修人员！')
            return ;
        }
        try {
            await deliveryWorkSheet({id,workId:personal})
            message.success('指定维修人员成功！')
        }catch (e){
            message.error('指定维修人员失败，请重试！')
        }
    }
    return (
        <Modal title="派送维修人员"
               open={isModalOpen}
               onOk={personOk}
               onCancel={personCancel}
               footer={<Button type='primary' className={styles.blueBtn} onClick={deliveryHandler}>确认</Button>}
               destroyOnClose={true}
        >
            <Select
                className={styles.select}
                style={{
                    width: 300,
                }}
                placeholder='请选择选择派送人员'
                options={users.filter(item=>item.job==='巡检人员').map(item=>{
                    return {
                        label:item.nickName,
                        value:item.id
                    }
                })}
                onSelect={value=>setPersonal(value)}
            />
        </Modal>
    );
};

export default DeliveryModal;
