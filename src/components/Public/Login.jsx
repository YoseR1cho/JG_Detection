import React from 'react';
import styles from './styles.module.less'
import { message} from "antd";
import Button from './Button.jsx'

import {useForm} from "react-hook-form";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {PASSWORDEXP,TELEPHONEEXP} from '@/utils/config.js'
import {throttle} from "@/utils/index.js";
import {useNavigate} from "react-router-dom";
import User from "@/store/User.js"
import {setUser} from "@/utils/login.js";
import {login} from "@/utils/api.js";

const Login = ({setLoginState,setLoading,loading}) => {
    const {register,handleSubmit,formState:{errors},reset} = useForm();
    const navigateTo = useNavigate();
    const {setUser:_setUser} = User;

    const handlerLogin = (data)=>{
        setLoading(true);
        const {telephone,password} = data;
        login(telephone,password).then(res=>{
            setLoading(false);
            _setUser(res.data);
            setUser(res.data.user.id)
            console.log(res.data)
            if(res.code===0){
                message.error('账号或密码错误！');
                return ;
            }

            navigateTo('/')
            message.success(`欢迎回来!`);

            reset();

        }).catch((e)=>{
            console.log(e);
            setLoading(false);
            message.error('登陆失败！');
        })
    }

    return (
        <>
            <form className={styles.form} onSubmit={throttle(handleSubmit(handlerLogin),2000)}>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder="a"
                           className={styles.input}
                           required
                           {...register("telephone",{required:true,pattern:TELEPHONEEXP
                           })}
                    />
                    <label htmlFor="" className={styles.label}>手机号码</label>
                </div>
                {errors.telephone && (<p className={styles.error}><ExclamationCircleOutlined className={styles.erroricon}/>{errors.telephone.type === 'required'?'请输入您的手机号码':'请输入正确格式的手机号码哦！'}</p>)}
                <div className={styles.inputContainer}>
                    <input type="password" placeholder="a"
                           className={styles.input}
                           required
                           {...register('password',{required:true,pattern:PASSWORDEXP
                           })}
                    />
                    <label htmlFor="" className={styles.label}>密码</label>
                </div>
                {errors.password && (<p className={styles.error}><ExclamationCircleOutlined className={styles.erroricon}/>{errors.password.type === 'required'?'请输入您的密码':'请输入由6-20个字母、数字或下划线组成的密码哦！'}</p>)}
                <div>
                    <span className={styles.switch} onClick={()=>setLoginState(2)}>注册</span>
                    <span className={styles.forget} onClick={()=>setLoginState(3)}>忘记密码</span>
                </div>
                <Button type='submit' loading={loading}>登录</Button>
            </form>
        </>
    );
};

export default Login;


