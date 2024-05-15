import React, {useState} from 'react';
import styles from './style.module.less'

const PicDemonstrator = ({url}) => {
    const [open,setOpen] = useState(false);
    return (
        <>
            {open &&
                <div className={styles.mask} onClick={(e)=>{setOpen(!open)}}>
                    <img src={url} alt="原始图片" onClick={e=>e.stopPropagation()}/>
                </div>}
            <a className={styles.a} onClick={()=>setOpen(!open)}>查看图片</a>
        </>
    );
};

export default PicDemonstrator;
