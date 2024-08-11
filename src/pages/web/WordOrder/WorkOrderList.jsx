import React, { useEffect, useState } from "react";
import styles from "./style.module.less";

import { List, Select } from "antd";
import Details from "./WorkerOrderDetails.jsx";

import { observer } from "mobx-react";
import { useStores } from "@/store/index.js";
const WorkOrderList = () => {
    const { WorkOrder } = useStores();
    const { workOrderList, loadWorkOrderList, loading } = WorkOrder;
    const [filterOpt, setFilterOpt] = useState("待维修人员接单");

    const data = Array.from({
        length: workOrderList && workOrderList.length,
    }).map((_, i) => ({
        id: workOrderList[i].id,
        createTime: workOrderList[i].createTime,
        level: workOrderList[i].riskLevel,
        description: (
            <span>
                <div>{workOrderList[i].advice}</div>
            </span>
        ),
        index: i,
        pic_url: workOrderList[i].analyzedUrl,
        status: workOrderList[i].status,
        ifUrgent: workOrderList[i].ifUrgent,
        inspector: workOrderList[i].inspectedInfo.match(/人:([^;]+)/)[1],
        originalUrl: workOrderList[i].originalUrl,
        repairedUrl: workOrderList[i].repairedUrl,
    }));

    useEffect(() => {
        loadWorkOrderList(filterOpt);
    }, [filterOpt]);

    return (
        <List
            loading={loading}
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {},
                pageSize: 5,
            }}
            className={styles.wrapper}
            header={
                <div className={styles.header}>
                    <span className={styles.gradeText}>状态筛选</span>
                    <Select
                        defaultValue="待维修人员接单"
                        style={{
                            width: 120,
                        }}
                        value={filterOpt}
                        onChange={(value) => setFilterOpt(value)}
                        options={[
                            {
                                value: "待维修人员接单",
                                label: "待接单",
                            },
                            {
                                value: "维修人员已接单，待维修",
                                label: "已接单",
                            },

                            {
                                value: "维修完成，待专家复审",
                                label: "已处理",
                            },
                        ]}
                    />
                </div>
            }
            dataSource={
                filterOpt
                    ? data.filter((item) => item.status === filterOpt)
                    : data
            }
            renderItem={(item) => (
                <List.Item
                    extra={
                        <img
                            width={220}
                            height={150}
                            alt="logo"
                            src={
                                filterOpt === "维修完成，待专家复审"
                                    ? item.repairedUrl
                                    : item.originalUrl
                            }
                        />
                    }
                >
                    <List.Item.Meta
                        //   avatar={<Avatar src={item.avatar} />}
                        title={
                            <a className={styles.title}>
                                <span>派单时间：</span>
                                <span className={styles.desc}>
                                    {item.createTime}
                                </span>
                                <span
                                    className={styles.desc}
                                    style={{
                                        color:
                                            (item.level === "三级风险" &&
                                                "red") ||
                                            (item.level === "二级风险" &&
                                                "orange") ||
                                            (item.level === "一级风险" &&
                                                "#008f00"),
                                    }}
                                >
                                    {item.level}
                                </span>
                                <span
                                    style={{
                                        color:
                                            item.status === "已保存"
                                                ? "deepskyblue"
                                                : "#008c00",
                                    }}
                                    className={styles.status}
                                >
                                    {(item.status === "已保存" && "待接单") ||
                                        (item.status === "已接单" &&
                                            "已接单") ||
                                        (item.status === "已处理" && "已处理")}
                                </span>
                                {item.ifUrgent === 1 && (
                                    <div
                                        className={styles.urgent}
                                        style={{ color: "red" }}
                                    >
                                        需紧急处理
                                    </div>
                                )}
                            </a>
                        }
                    />

                    <p>{item.description}</p>
                    <List.Item.Meta
                        className={styles.extraLabel}
                        description={
                            <div>
                                <span>派单人员：</span>
                                <span style={{ marginRight: "1rem" }}>
                                    {item.inspector}
                                </span>
                            </div>
                        }
                    />
                    <span>
                        <Details data={workOrderList[item.index]} />
                    </span>
                </List.Item>
            )}
        />
    );
};
export default observer(WorkOrderList);
