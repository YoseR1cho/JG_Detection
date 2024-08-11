import React, { useEffect, useState } from "react";
import styles from "@/pages/web/WordOrder/style.module.less";

import { List } from "antd";
import Details from "./RecordDetails.jsx";
import Grade_Selector from "@/components/Selector/Grade_Selector/index.jsx";

import { observer } from "mobx-react";
import { useStores } from "@/store/index.js";

const RecordHistoryList = () => {
    const { Record } = useStores();
    const { recordList, loading, loadRecordList } = Record;
    const [gradeLevel, setGradeLevel] = useState("");

    const data = Array.from({
        length: recordList && recordList.length,
    }).map((_, i) => ({
        createTime: recordList[i].createTime,
        level: recordList[i].riskLevel,
        index: i,
        originalUrl: recordList[i].originalUrl,
        area: recordList[i].address,
        location: `${recordList[i].longitude}  ${recordList[i].latitude}`,
        defectType: recordList[i].defectType,
        inspector: recordList[i].inspectedInfo.match(/人:([^;]+)/)[1],
    }));

    useEffect(() => {
        loadRecordList();
    }, []);

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 5,
            }}
            className={styles.wrapper}
            header={
                <div className={styles.header}>
                    <span className={styles.gradeText}>等级筛选</span>
                    <Grade_Selector
                        level={gradeLevel}
                        setLevel={setGradeLevel}
                    />
                </div>
            }
            loading={loading}
            dataSource={
                gradeLevel
                    ? data.filter((item) => item.level === gradeLevel)
                    : data
            }
            renderItem={(item) => (
                <List.Item
                    key={item.title}
                    actions={[]}
                    extra={
                        <img
                            width={220}
                            height={150}
                            alt="logo"
                            src={item.originalUrl}
                        />
                    }
                >
                    <List.Item.Meta
                        //   avatar={<Avatar src={item.avatar} />}
                        title={
                            <a className={styles.title}>
                                <span>隐患类型：</span>
                                <span className={styles.desc}>
                                    {item.defectType}
                                </span>
                                <span>风险等级：</span>
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
                            </a>
                        }
                        description={item.area}
                    />
                    <List.Item.Meta
                        description={
                            <div>
                                <span style={{ marginRight: "1rem" }}>
                                    {item.inspector}
                                </span>
                                <span>{item.createTime}</span>
                            </div>
                        }
                    />
                    {item.content}
                    <span>
                        <Details data={recordList[item.index]} />
                    </span>
                </List.Item>
            )}
        />
    );
};
export default observer(RecordHistoryList);
