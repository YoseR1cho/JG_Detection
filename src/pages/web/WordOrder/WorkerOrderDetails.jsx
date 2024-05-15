import React, {useState} from 'react';
import {Button, Modal} from 'antd';
import styles from './style.module.less'
import ImgZoom from '@/components/History/Img_Zoom'
import ReceiveModal from "@/pages/web/WordOrder/ReceiveModal.jsx";
import DisposeModal from "@/pages/web/WordOrder/DisposeModal.jsx";
import DetailMap from "@/components/DetailMap/index.jsx";


const WorkOrderDetails = ({data}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };



    return (
        <div>

            <Button type="primary" onClick={showModal} className={styles.btn}>
                查看详情
            </Button>
            {(data.status==='待维修人员接单' && <ReceiveModal data={data}/>) || (data.status==='维修人员已接单，待维修' && <DisposeModal data={data}/>)}



            <Modal
                title="工单详情"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={<></>}
                destroyOnClose={true}
            >
                <ImgZoom data={data}/>
                <div className={styles.itemContainer}><span>派发时间:</span><div>{data.createTime}</div></div>
                <div className={styles.modal}>
                    <span>识别等级:
                        <span> {data.riskLevel}</span>
                    </span>
                    <span className={data.className == 'green' ? styles.green : (data.className == 'red' ? styles.red : styles.yellow)}>
                    </span>
                </div>
                <div className={styles.itemContainer}><span>隐患类型:</span><div>{data.defectType}</div></div>
                {data.advice && <div className={styles.itemContainer}><span>建议：</span><div>{data.advice}</div></div>}
                <div className={styles.itemContainer}><span>事件地点:</span><div>{data.address}</div></div>
                <div className={styles.itemContainer}><span>经纬度:</span><div>{data.longitude} {data.latitude}</div></div>
                <DetailMap lng={data.longitude} lat={data.latitude}/>
            </Modal>
            {/*<Modal
            title="事件确认"
            open={confirm}
            className={styles.confirm_modal}
            onCancel={()=>setConfirm(false)}
            width={600}
            footer={props.data.status===0&&
                <>
                    <Button type="primary" onClick={showModal} className={styles.noBtn}>无需维修</Button>
                    <Button type="primary" onClick={showModal} className={styles.yesBtn}>提交维修</Button>
                </>
            }
        >
        </Modal>*/}

        </div>
    );
};
export default WorkOrderDetails;
