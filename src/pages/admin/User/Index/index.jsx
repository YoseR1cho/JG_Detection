import React, {useEffect, useState} from 'react';
import styles from "@/pages/admin/User/style.module.less";
import Automation from "@/pages/admin/User/Index/Automation.jsx";
import Charts from "@/pages/admin/User/Index/Charts.jsx";
import AppChart from "@/pages/admin/User/Index/AppChart.jsx";
import TodoCharts from "@/pages/admin/User/Index/TodoCharts.jsx";
import {getViews} from "@/utils/api.js";

const Index = () => {
    const [views,setViews] = useState([0,0,0,0,0,0,0])
    console.log(views);
    useEffect(() => {
        getViews().then(res=>{
            const data = res.data.records.map(item=>item.num)
            setViews(data)
        })
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.top_wrapper}>
                <TodoCharts/>
                <Charts data={views}/>
            </div>
            <div className={styles.bottom_wrapper}>
                {/*<div className={styles.inspect}></div>
                <div className={styles.repair}></div>*/}
                <AppChart data={views}/>
                <Automation />
            </div>

        </div>
    );
};

export default Index;
