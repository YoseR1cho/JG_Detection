import styles from "./style.module.less";
import React, { useEffect, useState } from "react";

import { List } from "antd";

import { observer } from "mobx-react";
import { useStores } from "@/store/index.js";

const App = observer(() => {
    const { Reason } = useStores();
    const { dataList, loadReasons, loading } = Reason;

    useEffect(() => {
        loadReasons();
    }, []);
    return (
        <div className={styles.overall}>
            <div className={styles.banner}>
                <div>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 4,
                        }}
                        dataSource={dataList}
                        renderItem={(item) => (
                            <List.Item
                                key={item.title}
                                extra={
                                    <img
                                        className={styles.img}
                                        width={240}
                                        alt="pic"
                                        src={item.coverUrl}
                                    />
                                }
                            >
                                <List.Item.Meta
                                    title={<a>{item.title}</a>}
                                    description={item.description}
                                />
                                <span className={styles.text}>
                                    {item.content}
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
