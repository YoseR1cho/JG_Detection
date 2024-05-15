import React, {useEffect, useState} from 'react';
import styles from "@/pages/admin/User/style.module.less";
import {message, Switch} from "antd";
import {getSystemStatus, setSystemStatus} from "@/utils/api.js";
import {CaretLeftOutlined, CaretRightOutlined} from "@ant-design/icons";

const Automation = () => {
    const [isChecked,setChecked] = useState(false)
    const [loading,setLoading] = useState(false)
    const onChange = async (checked) => {
        try {
            setLoading(true)
            await setSystemStatus(checked?1:0)
            setLoading(false)
            setChecked(checked)
            message.success('修改系统状态成功！')
        }catch (e){
            setLoading(false)
            message.error('修改系统状态失败！')
        }
    };

    useEffect(() => {
        getSystemStatus().then(res=>{
            setChecked(res.data!=='智能辅助化模式')
        }).catch(()=>{
            message.error('获取系统业务模式失败！')
        })
    }, []);
    return (
        <div className={styles.automation}>
            <h2>业务模式切换</h2>
            <div className={styles.switchBtn}>
                <p  className={isChecked && styles.active}>智能辅助与自动化切换</p>
                <Switch defaultChecked={isChecked} onChange={onChange} checked={isChecked} loading={loading}/>
            </div>
            <div className={styles.info}>
                <p style={{color:isChecked &&'green'}}>按钮点击后系统从智能辅助模式切换为自动化模式</p>
                <p><CaretRightOutlined />自动化模式： 无需审核人员，隐患检测后能够自动形成工单，并且能够自动派发工单<CaretLeftOutlined /></p>
                <p><CaretRightOutlined />智能辅助模式： 自动识别井盖图像，需要审核人员审核形成工单，指定工单进行派发<CaretLeftOutlined /></p>
            </div>
        </div>
    );
};

export default Automation;
