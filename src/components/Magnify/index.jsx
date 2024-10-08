import React, { useState } from "react";
import styles from "@/components/Overlays/style.module.less";

import { useStores } from "@/store/index.js";

const Index = () => {
    const { Image } = useStores();
    const { url } = Image;
    const [magnify, setMagnify] = useState(false);

    const clickHandler = (e) => {
        setMagnify(true);
    };
    return (
        <>
            <div className={styles.picContainer}>
                <img
                    src={url}
                    alt="原始图片"
                    onClick={clickHandler}
                    className={magnify ? styles.magnify : ""}
                />
            </div>
            {magnify && (
                <div
                    className={styles.mask}
                    onClick={() => setMagnify(false)}
                />
            )}
        </>
    );
};

export default Index;
