import React from 'react';
import styles from './style.module.less'
import {CloseOutlined, DownloadOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import Magnify from "@/components/Magnify/index.jsx";
import Image from "@/store/Image.js";
import State from "@/store/State.js";
import result from '@/assets/display2.jpg'

const Index = () => {
    const {downloadImage,name,url,pos,setInitialize,analyzedImg} = Image;
    const {setOpen,setMap} = State;

    const cancelHandler =()=>{
        setMap(false);
        setOpen(0);
        setInitialize();
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.left_header}>
                    <div className={styles.info}>
                        <h3>隐患报告</h3>
                        <p>2024进步猫猫</p>
                    </div>
                    <button onClick={downloadImage}><DownloadOutlined /> 下载</button>
                </div>
                <button className={styles.right_header} onClick={cancelHandler}><CloseOutlined /></button>
            </div>
            <div className={styles.content}>
                <div className={styles.side_info}>
                    <div className={styles.top_wrapper}>
                        <h2>原始图片</h2>
                        <Magnify/>
                    </div>
                    <div className={styles.bottom_wrapper}>
                        <h3>{name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className={styles.main_content}>
                    <div className={styles.identified_img}>
                        <img src={analyzedImg.url} alt="识别后图片"/>
                    </div>
                    <div className={styles.report}>
                        <h2>识别结果报告</h2>
                        <div className={styles.report_item}>

                            <h3>识别结果类型</h3>
                            <hr/>
                            <div className={styles.report_content}>
                                <p>{analyzedImg.defectType}</p>
                            </div>
                        </div>
                        <div className={styles.report_item}>
                            <h3>风险等级</h3>
                            <hr/>
                            <div className={styles.report_content}>
                                <p>{analyzedImg.riskLevel}</p>
                            </div>
                        </div>
                        <div className={styles.report_item}>
                            <h3>井盖位置</h3>
                            <hr/>
                            <div className={styles.report_content}>
                                <div className={styles.content_item}><span>{pos.loc}</span></div>
                                <div className={styles.content_item}>
                                    经度：<span>{pos.lng}</span>
                                    纬度：<span>{pos.lat}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.report_item}>
                            <h3>识别日期</h3>
                            <hr/>
                            <div className={styles.report_content}>
                                <span>2024年3月27日</span>
                            </div>
                        </div>
                    </div>
                    <footer></footer>
                </div>
            </div>
        </div>
    );
};

export default observer(Index);
