import React, {useState} from 'react';
import styles from './style.module.less'
import RiskCake from "@/pages/admin/Visualization/RiskCake.jsx";
import Views from "@/pages/admin/Visualization/Views.jsx";
import Hits from "@/pages/admin/Visualization/Hits.jsx";
import {Spin} from "antd";

const Index = () => {

    return (
        <div className={styles.container}>
                <RiskCake />
                <div className={styles.chartsContainer}>
                    <Views />
                    <Hits/>
                </div>
        </div>
    );
};

export default Index;
