import styles from '../reasons/style.module.less'
import React from 'react';
import { observer } from 'mobx-react'
import Affairs from './Affairs.jsx'
const App = observer(()=>{
    return (
        <div className={styles.overall}>
            <div className={styles.banner}>
                <Affairs/>
            </div>
        </div>
    )
})
export default App;
