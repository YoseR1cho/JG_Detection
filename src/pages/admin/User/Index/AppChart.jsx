import React, {useEffect, useRef} from 'react';
import * as echarts from "echarts";
import styles from "@/pages/admin/User/style.module.less";

const AppChart = ({data}) => {
    const chartsRef = useRef();

    useEffect(() => {
        let myChart = echarts.init(chartsRef.current);

        let option = {
            backgroundColor: '#FFF',
            grid: {
                top: '12%',
                bottom: '8%',
                left: '5%',
                right: '4%',
                width: '850px'
            },
            tooltip: {
                trigger: 'axis',
                label: {
                    show: true
                },
            },
            title: {
                text: "小程序访问量",
                top: 0,
                left: "center",
                textStyle: {
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "#666666",
                },
            },
            xAxis: {
                boundaryGap: true, //默认，坐标轴留白策略
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false,
                    alignWithLabel: true
                },
                data: [
                    '周一', '周二', '周三', '周四', '周五', '周六',
                    '周日'
                ]
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: '#E5E5E5'
                    }
                },
                axisTick: {
                    show: false
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: '#fff'
                    }
                }
            },
            series: [{
                showSymbol: false,
                smooth: true, // 开启平滑处理
                type: 'line',
                // symbol: 'circle',
                // symbolSize: 7,
                lineStyle: {
                    color: '#17a6fa',
                    shadowBlur: 12,   //模糊程度
                    shadowColor: 'rgba(0, 0, 0, 0.12)',  //阴影颜色
                    shadowOffsetX: 0,
                    shadowOffsetY: 4,
                    width: 4,
                },
                itemStyle: {
                    color: 'rgb(33,148,246)',
                    borderWidth: 1,
                    borderColor: '#FFF'
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 136, 212, 0.2)'
                        }, {
                            offset: 1,
                            color: 'rgba(0, 136, 212, 0)'
                        }], false),
                        // shadowColor: 'rgba(0, 0, 0, 0.1)',
                        // shadowBlur: 10
                    }
                },
                label: {
                    show: false,
                    distance: 1,
                    emphasis: {
                        show: true,
                        offset: [25, -2],
                        // backgroundColor: {
                        //     image: uploadedDataURL
                        // },
                        color: '#FFF',
                        padding: [8, 20, 8, 6],
                        //width:60,
                        // height: 36,
                        // formatter: function(params) {
                        //     var name = params.name;
                        //     var value = params.data;
                        //     var str = name + '\n数据量：' + value;
                        //     return str;
                        // },
                        // rich: {
                        //     bg: {
                        //         backgroundColor: {
                        //             image: uploadedDataURL
                        //         },
                        //         width: 78,
                        //         //height:42,
                        //         color: '#FFF',
                        //         padding: [20, 0, 20, 10]
                        //     },
                        //     br: {
                        //         width: '100%',
                        //         height: '100%'
                        //     }

                        // }
                    }
                },
                data: data.map(item=>(item-3)<0?0:(item-3))
            }]
        };
        option && myChart.setOption(option);

    }, [data]);
    return (
        <div className={styles.charts}>
            <div ref={chartsRef} ></div>
        </div>
    );
};

export default AppChart;
