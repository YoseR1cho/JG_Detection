import React, { useEffect, useState } from "react";
import styles from "./style.module.less";

import Login from "@/components/Public/Login.jsx";
import Register from "@/components/Public/Register.jsx";
import Forget from "@/components/Public/Forget.jsx";

import { observer } from "mobx-react";
import { useStores } from "@/store/index.js";

const Index = () => {
    const { User } = useStores();
    const { setLoading, loading } = User;

    const [loginState, setLoginState] = useState(1);

    // 1代表登录 2代表注册 3代表找回密码
    return (
        <div className={styles.main}>
            <div className={styles.login}>
                <h2>
                    {(loginState === 1 && "登录") ||
                        (loginState === 2 && "注册") ||
                        (loginState === 3 && "找回密码")}
                </h2>
                {(loginState === 1 && (
                    <Login
                        setLoginState={setLoginState}
                        setLoading={setLoading}
                        loading={loading}
                    />
                )) ||
                    (loginState === 2 && (
                        <Register
                            setLoginState={setLoginState}
                            setLoading={setLoading}
                            loading={loading}
                        />
                    )) ||
                    (loginState === 3 && (
                        <Forget
                            setLoginState={setLoginState}
                            setLoading={setLoading}
                            loading={loading}
                        />
                    ))}
            </div>
        </div>
    );
};

export default observer(Index);
