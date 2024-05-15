import React, {useState} from 'react';
import { Radio} from "antd";
import styles from './style.module.less'
import {observer} from "mobx-react";
import EditorModal from "./Reason/EditorModal.jsx";
import FeatureModal from "@/pages/admin/Knowledge/DangerousKnowledge/Feature/FeatureModal.jsx";
import FeatureTable from "@/pages/admin/Knowledge/DangerousKnowledge/Feature/FeatureTable.jsx";
import ReasonTable from "@/pages/admin/Knowledge/DangerousKnowledge/Reason/ReasonTable.jsx";
import ProcessTable from '@/pages/admin/Knowledge/DangerousKnowledge/Process/ProcessTable.jsx'
import ProcessModal from "@/pages/admin/Knowledge/DangerousKnowledge/Process/ProcessModal.jsx";
import KeywordSearch from "@/components/KeywordSearch/index.jsx";
import Feature from "@/store/Feature.js";
import Reason from "@/store/Reason.js";
import Process from "@/store/Process.js";

const Index = () => {
    const [status,setStatus] = useState('隐患特征')

    const statusChange=(e)=>{
        const s = e.target.value;
        setStatus(s);
    }

    return (
        <div className={styles.container}>
            <FeatureModal/>
            <EditorModal/>
            <ProcessModal/>
            <KeywordSearch load={(status==='隐患特征' && Feature.loadFeatures)||(status==='隐患寻因' && Reason.loadReasons)||(status==='作业流程' && Process.loadProcess)}/>
            <div className={styles.status_selector}>
                <Radio.Group value={status} onChange={statusChange}>
                    <Radio.Button value="隐患特征">隐患特征</Radio.Button>
                    <Radio.Button value="隐患寻因">隐患寻因</Radio.Button>
                    <Radio.Button value="作业流程">作业流程</Radio.Button>
                </Radio.Group>
            </div>
            {(status==='隐患特征' &&<FeatureTable/>) || (status==='隐患寻因' && <ReasonTable/>) || (status==='作业流程' && <ProcessTable/>)}
        </div>
    );
};

export default observer(Index);
