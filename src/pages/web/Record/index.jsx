import React from "react";
import styles from "./style.module.less";

import Content from "./RecordHistoryList.jsx";

const Index = () => {
    return (
        <div>
            <div className={styles.selector}></div>
            <div className={styles.record_content}>
                <Content />
            </div>
        </div>
    );
};
export default Index;
