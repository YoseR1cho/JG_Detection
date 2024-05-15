import React from 'react';
import { Card, List } from 'antd';
import Process from "@/store/Process.js";
import {observer} from "mobx-react";
import styles from '../style.module.less'
const App = () => {
    const {process} = Process

    return (
            <List
                grid={{
                    gutter: 16,
                    column: 1,
                }}
                dataSource={process}
                renderItem={(item) => (
                    <List.Item>
                        <Card className={styles.card} title={<div><span className={styles.step}>{item.step}</span>{item.title}</div>}>{item.content}</Card>
                    </List.Item>
                )}
            />
    );
}
export default observer(App);
