import React, {useEffect, useRef} from 'react';
import styles from "@/pages/admin/User/style.module.less";
import * as echarts from "echarts";
import {getViews} from "@/utils/api.js";

const Charts = ({data}) => {
    const chartsRef = useRef();

    useEffect(() => {
        let myChart = echarts.init(chartsRef.current);

        let yMax = 50;
        let option = {
            dataset: {
                source: [
                    ["周一", data[0]],
                    ["周二", data[1]],
                    ["周三", data[2]],
                    ["周四", data[3]],
                    ["周五", data[4]],
                    ["周六", data[5]],
                    ["周日", data[6]],
                ],
            },
            backgroundColor: "#fff",
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                },
            },
            title: {
                text: "近7天访问量",
                top: 0,
                left: "center",
                textStyle: {
                    fontWeight: "bold",
                    fontSize: 18,
                    color: "#666666",
                },
            },
            grid: {
                left: "8%",
                right: "4%",
                bottom: "15%",
                top: "15%",
            },
            xAxis: {
                type: "category",
                axisLine: {
                    lineStyle: {
                        color: "#dddddd",
                    },
                },
                axisTick: {
                    show: false,
                    alignWithLabel: true,
                    lineStyle: {
                        color: "#f3f3f3",
                    },
                },
                axisLabel: {
                    fontSize: 14,
                    textStyle: {
                        color: "#666666",
                        fontFamily: "Microsoft YaHei",
                    },
                },
            },

            yAxis: {
                type: "value",
                min: 0,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#dddddd",
                    },
                },
                data: [1, 2, 3],
                axisTick: {
                    show: true,
                    alignWithLabel: true,
                    lineStyle: {
                        color: "#dddddd",
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#dddddd",
                        type: [6, 3],
                        dashOffset: 2,
                    },
                },
                axisLabel: {
                    padding: [0, 5, 0, 0],
                    fontSize: 14,
                    textStyle: {
                        color: "#666666",
                        fontFamily: "Microsoft YaHei",
                    },
                },
            },
            series: [
                {
                    type: "bar",
                    barWidth: 30,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: "#00e7e0",
                                },
                                {
                                    offset: 1,
                                    color: "#00d0c2",
                                },
                            ]),
                            barBorderRadius: [4, 4, 0, 0],
                        },
                    },
                },
            ],
        };

        option && myChart.setOption(option);

    }, [data]);
    return (
        <div className={styles.charts}>
            <div ref={chartsRef} ></div>
        </div>
    );
};

export default Charts;
