import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;
import styles from './style.module.less'
const App = ({data}) => (
  <Card
    hoverable
    style={{
      width: data.type==1?'240':'360',
    }}
    // size='small'
    cover={<img className={styles.pic} alt="example" src={data.coverUrl} />}
    onClick={()=>{const w =window.open(''+data.href)}}
  >
    <Meta title={data.title} description={data.description.slice(0,38)+'......'} />
  </Card>
);
export default App;
