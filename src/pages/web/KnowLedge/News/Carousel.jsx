import React from 'react';
import { Carousel } from 'antd';
import styles from './style.module.less'
const App = () => (
  <div className={styles.Carousel}>
    <Carousel autoplay>
    <div>
      <a onClick={()=>{const w = window.open('https://app.dz31hao.com/detailArticle/19102171_15506_dzy.html')}}>
      <img className={styles.carImg} src="https://img0.baidu.com/it/u=2935801878,2779909984&fm=253&fmt=auto&app=120&f=PNG?w=631&h=500" alt="" />
      <div className={styles.newDetail}>
        <h3>“兜”住安全！德州市区1.5万余个井盖装上防坠网</h3>
        <h3 className={styles.tool}>标题</h3>
      </div>
      </a>
    </div>
    <div>
        <a onClick={()=>{const w = window.open('https://www.sohu.com/a/350983543_818658');}}>
      <img className={styles.carImg} src="https://img1.baidu.com/it/u=4112426202,1265194269&fm=253&fmt=auto&app=138&f=JPEG?w=660&h=316" alt="" />
      <div className={styles.newDetail}>
        <h3>北海"井盖凸出路面"改造进行时……</h3>
        <h3 className={styles.tool}>标题</h3>
      </div>
      </a>  
    </div>
    <div>
        <a onClick={()=>{const w = window.open('https://www.sohu.com/a/350983543_818658');}}>
      <img className={styles.carImg} src="https://img0.baidu.com/it/u=3540218155,3155240143&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=426" alt="" />
      <div className={styles.newDetail}>
        <h3>井盖也要修到极致，不再让井盖“哐当、哐当” </h3>
        <h3 className={styles.tool}>标题</h3>
      </div>
      </a>
    </div>
    <div>
        <a onClick={()=>{const w = window.open('https://finance.sina.com.cn/jjxw/2022-05-23/doc-imizmscu2921282.shtml')}}>
      <img className={styles.carImg} src="https://img1.baidu.com/it/u=2916189195,1692451027&fm=253&fmt=auto&app=138&f=JPG?w=802&h=500" alt="" />
      <div className={styles.newDetail}>
        <h3>井盖专项排查守护脚下安全</h3>
        <h3 className={styles.tool}>标题</h3>
      </div>
      </a>
    </div>
  </Carousel>
  </div>
);
export default App;