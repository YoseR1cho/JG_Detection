import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import styles from "@/pages/web/WordOrder/style.module.less";

import ImgZoom from "@/components/History/Img_Zoom/index.jsx";

import { observer } from "mobx-react";
import { useStores } from "@/store/index.js";

const ReceiveModal = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { WorkOrder, Event } = useStores();
    const { loadWorkOrderList } = WorkOrder;
    const { receiveEvent } = Event;
    const showReceiveModal = () => {
        setIsOpen(true);
    };
    const handleReceiveCancel = () => {
        setIsOpen(false);
    };

    const handleReceive = async () => {
        try {
            await receiveEvent(data.id);

            loadWorkOrderList("待维修人员接单");
            message.success("已接单，请查看详情并处理");
            handleReceiveCancel();
        } catch (e) {
            message.error("接单失败,请重试！");
            handleReceiveCancel();
        }
    };
    return (
        <>
            <Button className={styles.blueBtn} onClick={showReceiveModal}>
                接单
            </Button>
            <Modal
                title="确认接单"
                open={isOpen}
                onCancel={handleReceiveCancel}
                footer={
                    <>
                        <Button onClick={handleReceiveCancel}>取消</Button>
                        <Button
                            className={styles.greenBtn}
                            onClick={handleReceive}
                        >
                            确认
                        </Button>
                    </>
                }
                className={styles.modalContainer}
            >
                <ImgZoom data={data}></ImgZoom>
                <div className={styles.itemContainer}>
                    <span>派发时间:</span>
                    <div>{data.createTime}</div>
                </div>
                <div className={styles.modal}>
                    <span>
                        识别等级:
                        <span>{data.riskLevel}</span>
                        {data.risk}
                    </span>
                    <span
                        className={
                            data.className == "green"
                                ? styles.green
                                : data.className == "red"
                                  ? styles.red
                                  : styles.yellow
                        }
                    ></span>
                </div>
                <div className={styles.itemContainer}>
                    <span>事件地点:</span>
                    <div>{data.address}</div>
                </div>
                <div className={styles.itemContainer}>
                    <span>经纬度:</span>
                    <div>
                        {data.longitude} {data.latitude}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default observer(ReceiveModal);
