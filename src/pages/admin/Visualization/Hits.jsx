import React, {useEffect, useRef} from 'react';
import styles from "@/pages/admin/Visualization/style.module.less";
import * as echarts from 'echarts'
import Event from '@/store/knowledgeBase/Event.js'
import {observer} from "mobx-react";

const Hits = () => {
    const hitsRef = useRef();

    useEffect(() => {
        let myChart = echarts.init(hitsRef.current);


        let option = {
            title: {
                text: "近7天隐患识别次数",
                top: 0,
                left: "center",
                textStyle: {
                    fontWeight: "bold",
                    fontSize: 18,
                    color: "#666666",
                },
            },
            tooltip: {
                trigger: "axis",
            },
            xAxis: {
                type: 'category',
                data:['周一','周二','周三','周四','周五','周六','周日']

            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false,
                },
            },
            series: [
                // ==============================================
                {
                    name: '识别总数',
                    type: 'line',
                    data: [90,89,87,48,37,48,60,40],
                    lineStyle: {
                        color: 'pink' // 设置第二条折线颜色
                    },
                },
                //折线图流光配置
                {
                    name: '滑行的光点',
                    type: 'lines',
                    coordinateSystem: 'cartesian2d',
                    polyline: true,
                    effect: {
                        show: true,//是否展示
                        period:10,//时间
                        trailLength:0.1,//尾部长度
                        symbolSize: 8,//点大小
                        symbol: 'circle',//点的类型
                        color: 'red',//颜色
                    },
                    data: [{
                        //coords:[['x轴数据'，y轴数据]] 一一对应拼接
                        coords: [
                            [0, 90],
                            [1, 89],
                            [2, 87],
                            [3, 48],
                            [4, 37],
                            [5, 48],
                            [6, 60],
                            [7, 40],
                        ]
                    }]
                }
            ]
        };


        option && myChart.setOption(option);
    }, []);


    return (
        <div className={styles.hits} ref={hitsRef}>

        </div>
    );
};

export default observer(Hits);
