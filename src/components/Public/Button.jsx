import React from 'react';
import styles from './styles.module.less'

const Button = (props) => {

    return (
        <button type='submit' disabled={props.loading} className={styles.btn}>
            {props.loading?(<svg className={styles.circular} viewBox="25 25 50 50">
                <circle className={styles.path} cx="50" cy="50" r="20" fill="none" />
            </svg>):props.children}
        </button>
    );
};

export default Button;
