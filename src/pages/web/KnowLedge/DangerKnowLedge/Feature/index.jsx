import styles from "../reasons/style.module.less";
import React, { useState } from "react";

import { List } from "antd";

import { observer } from "mobx-react";
import { useStores } from "@/store/index.js";

const App = observer(() => {
    const { Feature } = useStores();
    const { features } = Feature;
    const [toggle, setToggle] = useState("三级风险");

    return (
        <div className={styles.overall}>
            <div className={styles.banner}>
                <div className={styles.navigate}>
                    <div className={styles.classify}>
                        <div
                            className={toggle === "三级风险" && styles.active}
                            onClick={() => setToggle("三级风险")}
                        >
                            三级风险
                        </div>
                        <div
                            className={toggle === "二级风险" && styles.active}
                            onClick={() => setToggle("二级风险")}
                        >
                            二级风险
                        </div>
                        <div
                            className={toggle === "一级风险" && styles.active}
                            onClick={() => setToggle("一级风险")}
                        >
                            一级风险
                        </div>
                        <div
                            className={toggle === "无风险" && styles.active}
                            onClick={() => setToggle("无风险")}
                        >
                            无风险
                        </div>
                    </div>
                </div>
                <div>
                    <List
                        itemLayout="vertical"
                        dataSource={features.filter(
                            (item) => item.riskLevel === toggle
                        )}
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 5,
                        }}
                        renderItem={(item, index) => (
                            <List.Item
                                extra={
                                    <img
                                        className={styles.img}
                                        width={240}
                                        alt="pic"
                                        src={item.coverUrl}
                                    />
                                }
                                key={item.id}
                            >
                                <List.Item.Meta
                                    title={<a>{item.defectType}</a>}
                                    description={item.content}
                                />
                                <span className={styles.text}>
                                    {item.description}
                                </span>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
});
export default App;
