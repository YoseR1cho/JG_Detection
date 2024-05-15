import React from 'react';
import styles from './style.module.less'
import png from '@/assets/pngImg.svg'
import jpg from '@/assets/jpgImg.svg'
import Upload from "@/components/Upload/index.jsx";

import {observer} from 'mobx-react'
import State from '@/store/State.js'
import Overlays from "@/components/Overlays/index.jsx";
import Loading from "@/components/loading/index.jsx";
import MapContainer from "@/components/MapContainer/index.jsx";
const Index = () => {
    const {openState,loading} = State;
    return (
            <>
                {openState===1 && <MapContainer/>}
                {openState===2 && <Overlays/>}
                <div className={styles.banner}>
                    <h2>隐患识别</h2>
                    <div className={styles.state}>{!loading?'插入您的井盖图片进行隐患识别':<>正在进行识别<Loading/></>}</div>
                    <div className={styles.picPicker}>
                        {
                            loading ? (
                                <svg className={styles.circular} viewBox="25 25 50 50">
                                    <circle className={styles.path} cx="50" cy="50" r="20" fill="none" />
                                </svg>
                                )
                                    :(<Upload>
                                    <img src={png} alt="png" className={styles.png}/>
                                    <img src={jpg} alt="png"className={styles.jpg}/>
                                    <span className={styles.warn}>点击此处插入井盖图片</span>
                                </Upload>)


                        }
                    </div>
                    <hr/>
                </div>
            </>
    );
};

export default observer(Index);
