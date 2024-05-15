import styles from './style.module.less'
import GradeSelector from "@/components/Selector/Grade_Selector/index.jsx"
import Button from "@/components/Selector/Select_Button/index.jsx"
import Content from "./RecordHistoryList.jsx"
import React from 'react'
const Index = ()=>{
    return (
        <div>
            <div className={styles.selector}>
            </div>
            <div className={styles.record_content}>
                    <Content/>
            </div>
        </div>
        )
}
export default Index;
