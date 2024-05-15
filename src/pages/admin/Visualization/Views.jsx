import React, {useEffect, useRef} from 'react';
import styles from "@/pages/admin/Visualization/style.module.less";
import * as echarts from 'echarts'
import {observer} from "mobx-react";
import {getDefectNum, getViews} from "@/utils/api.js";

const Views = () => {
    const chartsRef = useRef();

    useEffect(() => {
        let myChart = echarts.init(chartsRef.current);

        getDefectNum().then(res=>{
            let yMax = 50;
            const data = res.data
            console.log(data);
            let option = {
                backgroundColor: '#fff',
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}:{c}',
                },
                legend: [
                    {
                        top: 'center',
                        orient: 'vertical',
                        right: '10%',
                        itemWidth: 16,
                        itemHeight: 16,
                        icon: 'circle',
                        itemGap: 20,
                        textStyle: {
                            color: '#4E5969',
                            fontSize: 18,
                            padding: [0, 0, 0, 10],
                        },
                        data: ['井盖完好', '井盖破损', '井盖缺失', '井盖未盖（翘起）', '井圈问题'],

                    }],
                grid: {
                    containLabel: true,
                },
                title: {
                    text: '各种缺陷个数',
                    textStyle: {
                        rich: {
                            a: {
                                fontSize: 14,
                                color: '#1D2129',
                            },
                        },
                    },
                    x: '32%',
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['40%', '60%'],
                        center: ['40%', '50%'],
                        color: [
                            '#86DF6C',
                            '#ffd324',
                            '#d20e0e',
                            '#ff7100',
                            '#219bff',
                        ],
                        label: {
                            position: 'outside',
                            show: true,
                            color: '#4E5969',
                            fontSize: 16,
                            formatter: function (params) {
                                console.log(params);
                                if (params.name !== '') {
                                    return params.percent + '%'
                                }
                            },
                        },
                        labelLine: {
                            show: true,
                            length2: 30,
                            length: 10,
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                borderColor: '#fff',
                            },
                        },
                        data: [
                            { value: data['井盖完好'], name: '井盖完好' },
                            { value: data['井盖破损'], name: '井盖破损' },
                            { value: data['井盖缺失'], name: '井盖缺失' },
                            { value: data['井盖未盖（翘起）'], name: '井盖未盖（翘起）' },
                            { value: data['井圈问题'], name: '井圈问题' },
                        ],
                    },
                ],
            }


            option && myChart.setOption(option);
        })

    }, []);


    return (
        <div className={styles.views} ref={chartsRef}>
        </div>
    );
};

export default Views;
