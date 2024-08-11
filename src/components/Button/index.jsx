import React from "react";
import styles from "./style.module.less";
import { message } from "antd";

import { observer } from "mobx-react";
import { useStores } from "@/store/index.js";

const Button = (props) => {
    const { Image, State } = useStores();
    const { pos, setLoc } = Image;
    const { setMap, setOpen } = State;
    const clickHandler = () => {
        if (!pos.lng) {
            message.warning("您选择井盖位置");
            return;
        }
        setLoc(props.value);
        setOpen(0);
        setMap(true);
    };

    return (
        <button
            type={props.type}
            disabled={props.loading}
            className={styles.btn}
            onClick={clickHandler}
        >
            {props.loading ? (
                <svg className={styles.circular} viewBox="25 25 50 50">
                    <circle
                        className={styles.path}
                        cx="50"
                        cy="50"
                        r="20"
                        fill="none"
                    />
                </svg>
            ) : (
                props.children
            )}
        </button>
    );
};

export default observer(Button);
