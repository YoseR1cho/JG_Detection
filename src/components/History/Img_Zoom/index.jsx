import React from 'react';
import { Image } from 'antd';
import styles from '@/pages/web/Record/style.module.less'
const App = ({data}) => (
  <div className={styles.picContainer}>
    <Image
        width={380}
        height={200}
        src={data.analyzedUrl}
    />
  </div>
);
export default App;
