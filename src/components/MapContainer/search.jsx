import React, {forwardRef} from 'react';
import styles from './style.module.less'
import {SearchOutlined} from "@ant-design/icons";

const Search = () => {
    return (
        <div className={styles.search}>
            <label htmlFor="input"><SearchOutlined /></label>
            <input type="text" id="tip-input"/>
        </div>
    );
}

export default Search;
