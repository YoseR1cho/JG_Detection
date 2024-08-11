import React, { useEffect } from "react";
import styles from "./style.module.less";

import SideBar from "@/pages/web/KnowLedge/DangerKnowLedge/SideBar.jsx";

import { Outlet, useNavigate } from "react-router-dom";

const Index = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/knowledge/danger/reason");
    }, []);
    return (
        <div className={styles.banner}>
            <SideBar />
            <Outlet />
        </div>
    );
};

export default Index;
