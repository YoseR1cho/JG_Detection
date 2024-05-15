import React, {useState} from 'react';
import styles from './style.module.less'
import {BulbOutlined, EyeOutlined, PartitionOutlined} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";

const items = [
    {
        desc:'隐患寻因',
        icon:<EyeOutlined />,
        key:'/knowledge/danger/reason'
    },
    {
        desc:'隐患特征',
        icon:<BulbOutlined />,
        key:'/knowledge/danger/feature'
    },
    {
        desc:'作业流程',
        icon:<PartitionOutlined />,
        key:'/knowledge/danger/process'
    }
]

const SideBar = () => {
    const path = useLocation().pathname
    const [toggle,setToggle] = useState(path)
    console.log(toggle);
    const navigate = useNavigate();

    const handlerClick = (key)=>{
        setToggle(key)
        navigate(key)
    }

    return (
        <div className={styles.container}>
            <ul>
                {
                    items.map(item=>(
                        <li key={item.key} className={toggle===item.key && styles.active} onClick={()=>handlerClick(item.key)}>{item.icon}{item.desc}</li>
                    ))
                }
            </ul>
        </div>
    );
};

export default SideBar;
