import AuthLayout from "./Layout/index.jsx";
import '@/style/global.less'
import React from "react";
import {Routes, Route,Navigate} from 'react-router-dom'

import Detection from '@/pages/web/Detection'
import Login from '@/pages/web/Login'
import Record from "@/pages/web/Record/index.jsx";
import AdminLayout from '@/Layout/admin'
import Defect from "@/pages/admin/Defect/index.jsx";
import User from "@/pages/admin/User/Manager/Manager.jsx";
import Confirm from "@/pages/admin/Defect/Detail.jsx";
import Audit from "@/pages/admin/Defect/Audit.jsx";
import Delivery from "@/pages/admin/Defect/Delivery.jsx";
import Output from "@/pages/admin/Defect/Output.jsx";
import Personal from "@/pages/admin/User/Personal/Personal.jsx";
import WordOrder from "@/pages/web/WordOrder/index.jsx";
import Visualization from "@/pages/admin/Visualization/index.jsx";
import ReAudit from "@/pages/admin/Defect/ReAudit.jsx";
import News from "@/pages/admin/Knowledge/News";
import New from "@/pages/web/KnowLedge/News";
import Matters from "@/pages/web/KnowLedge/Matters/index.jsx";
import DangerKnowLedge from "@/pages/web/KnowLedge/DangerKnowLedge/index.jsx";
import Reasons from "@/pages/web/KnowLedge/DangerKnowLedge/reasons/index.jsx";
import Matter from "@/pages/admin/Knowledge/Matters"
import DangerousKnowledge from "@/pages/admin/Knowledge/DangerousKnowledge/index.jsx";
import Process from "@/pages/web/KnowLedge/DangerKnowLedge/Process/index.jsx";
import Feature from "@/pages/web/KnowLedge/DangerKnowLedge/Feature/index.jsx";
import Index from "@/pages/admin/User/Index/index.jsx";
import Feedback from "@/pages/admin/Citizen/Feedback/index.jsx";
import Manage from "@/pages/admin/Citizen/Manage/Index.jsx";

function App() {

  return (
    <>
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<AuthLayout/>}>
                <Route path='/' element={<Detection/>}/>
                <Route path='/record' element={<Record/>}/>
                <Route path='/workOrder' element={<WordOrder/>}/>
                <Route path='/knowledge' element={<Navigate to='/knowledge/danger'/>}/>
                <Route path='/knowledge/danger' element={<DangerKnowLedge/>}>
                    <Route path='/knowledge/danger/feature' element={<Feature/>}/>
                    <Route path='/knowledge/danger/reason' element={<Reasons/>}/>
                    <Route path='/knowledge/danger/process' element={<Process/>}/>
                </Route>
                <Route path='/knowledge/newsDelivery' element={<New/>}/>
                <Route path='/knowledge/matters' element={<Matters/>}/>

            </Route>
           {/* <Route path='/record' element={}/>
            <Route path='/example' element={}/>*/}
            <Route path='/admin' element={<AdminLayout/>}>
                <Route path='/admin/defect' element={<Navigate to={'/admin/defect/inspect'}/>}/>
                <Route path='/admin/defect/inspect' element={<Defect/>}/>
                <Route path='/admin/defect/inspect/confirm' element={<Navigate to='/admin/defect/inspect'/>}/>
                <Route path='/admin/defect/inspect/audit' element={<Navigate to='/admin/defect/inspect'/>}/>
                <Route path='/admin/defect/inspect/delivery' element={<Navigate to='/admin/defect/inspect'/>}/>
                <Route path='/admin/defect/inspect/output' element={<Navigate to='/admin/defect/inspect'/>}/>
                <Route path='/admin/defect/inspect/detail/' element={<Navigate to='/admin/defect/inspect'/>}/>
                <Route path='/admin/defect/inspect/detail/:id' element={<Confirm/>}/>
                <Route path='/admin/defect/inspect/audit/:id' element={<Audit/>}/>
                <Route path='/admin/defect/inspect/reAudit/:id' element={<ReAudit/>}/>
                <Route path='/admin/defect/inspect/delivery/:id' element={<Delivery/>}/>
                <Route path='/admin/defect/inspect/output/:id' element={<Output/>}/>
                <Route path='/admin/defect/citizen' element={<Defect/>}/>
                <Route path='/admin/defect/citizen/confirm' element={<Navigate to='/admin/defect/citizen'/>}/>
                <Route path='/admin/defect/citizen/audit' element={<Navigate to='/admin/defect/citizen'/>}/>
                <Route path='/admin/defect/citizen/delivery' element={<Navigate to='/admin/defect/citizen'/>}/>
                <Route path='/admin/defect/citizen/output' element={<Navigate to='/admin/defect/citizen'/>}/>
                <Route path='/admin/defect/citizen/detail/:id' element={<Confirm/>}/>
                <Route path='/admin/defect/citizen/audit/:id' element={<Audit/>}/>
                <Route path='/admin/defect/citizen/reAudit/:id' element={<ReAudit/>}/>
                <Route path='/admin/defect/citizen/delivery/:id' element={<Delivery/>}/>
                <Route path='/admin/defect/citizen/output/:id' element={<Output/>}/>
                <Route path='/admin/citizen/manage' element={<Manage/>}/>
                <Route path='/admin/citizen/feedback' element={<Feedback/>}/>
                <Route path='/admin/user' element={<Navigate to='/admin/user/index'/>}/>
                <Route path='/admin/user/index' element={<Index/>}/>
                <Route path='/admin/user/manager' element={<User/>}/>
                <Route path='/admin/user/personal' element={<Personal/>}/>
                <Route path='/admin/visualization' element={<Visualization/>}/>
                <Route path='/admin/knowledge/danger' element={<DangerousKnowledge/>}/>
                <Route path='/admin/knowledge/news' element={<News />}/>
                <Route path='/admin/knowledge/matters' element={<Matter/>}/>
            </Route>
        </Routes>
    </>
  )
}

export default App
