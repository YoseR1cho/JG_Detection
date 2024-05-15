import React, {useEffect, useRef} from 'react';
import styles from "@/pages/admin/Visualization/style.module.less";
import * as echarts from 'echarts'
import Event from '@/store/Event.js'
import {observer} from "mobx-react";
import {getRiskNum} from "@/utils/api.js";

const RiskCake = () => {
    const containerRef = useRef();
    const {eventList} = Event;

    useEffect(() => {
        let myChart = echarts.init(containerRef.current);

        getRiskNum().then(res=>{
            const data = res.data

            const option = {
                title:{
                    text:'识别风险比率',
                    left:'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series:[
                    {
                        name:'风险占比',
                        type:'pie',
                        radius:'50%',
                        data:[
                            {value:data["一级风险"],name:'一级风险'},
                            {value:data["二级风险"],name:'二级风险'},
                            {value:data["三级风险"],name:'三级风险'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                ]
            }

            option && myChart.setOption(option);
        })


    }, []);


    return (
        <div className={styles.Sketchpad} ref={containerRef}>

        </div>
    );
};

export default observer(RiskCake);
