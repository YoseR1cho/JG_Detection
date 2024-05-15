import styles from './style.module.less'
import Content from "./WorkOrderList.jsx"
import React from 'react'

const Index = ()=>{
    return (
        <div>
            <div className={styles.record_content}>
                <Content/>
            </div>
        </div>
    )
}
export default Index
