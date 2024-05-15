import React, { useState } from 'react';
import {Button, Modal} from 'antd';
import styles from './style.module.less'
import ImgZoom from '@/components/History/Img_Zoom/index.jsx'
import DetailMap from "@/components/DetailMap/index.jsx";


const RecordDetails = ({data}) => {
    console.log(data);
    const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.main}>
      <Button type="primary" onClick={showModal} className={styles.btn}>
       查看详情
      </Button>
      <Modal
          title="历史详情"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={<></>}
          destroyOnClose={true}
      >
          <ImgZoom data={data}></ImgZoom>
          <div className={styles.itemContainer}><span>识别时间:</span><div>{data.createTime}</div></div>
          <div className={styles.modal}>
              <span>识别等级:</span><span>{data.riskLevel}</span>
              <span className={data.level === '安全' ? styles.green : (data.level == '危险' ? styles.red : styles.yellow)}>
              </span>
          </div>
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
export default RecordDetails;
