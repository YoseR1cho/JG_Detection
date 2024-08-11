import React from "react";
import styles from "../style.module.less";

import { Card, List } from "antd";

import { observer } from "mobx-react";
import { useStores } from "@/store/index.js";
const App = () => {
    const { Process } = useStores();
    const { process } = Process;

    return (
        <List
            grid={{
                gutter: 16,
                column: 1,
            }}
            dataSource={process}
            renderItem={(item) => (
                <List.Item>
                    <Card
                        className={styles.card}
                        title={
                            <div>
                                <span className={styles.step}>{item.step}</span>
                                {item.title}
                            </div>
                        }
                    >
                        {item.content}
                    </Card>
                </List.Item>
            )}
        />
    );
};
export default observer(App);
