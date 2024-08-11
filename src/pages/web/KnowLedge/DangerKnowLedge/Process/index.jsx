import styles from "../reasons/style.module.less";
import React from "react";

import Affairs from "./Affairs.jsx";

import { observer } from "mobx-react";

const App = observer(() => {
    return (
        <div className={styles.overall}>
            <div className={styles.banner}>
                <Affairs />
            </div>
        </div>
    );
});
export default App;
