import React, {useState} from 'react';
import {message} from "antd";
import styles from "@/components/Public/styles.module.less";
import Button from '@/components/Public/Button.jsx'

import {useForm} from "react-hook-form";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {PASSWORDEXP, USERNAMEEXP,TELEPHONEEXP} from "@/utils/config.js";
import {request} from "@/utils/axios.js";
import {Vertify} from "@alex_xu/react-slider-vertify";
import {useWindowSize} from "@/utils/hooks/useWindowSize.js";
import {observer} from "mobx-react";
import User from "@/store/User.js";

const Register = ({setLoginState,setLoading,loading}) => {
    const {width} = useWindowSize();
    const [vertify, setVertify] = useState(false);

    const {register,handleSubmit,formState:{errors},getValues,reset} = useForm();
    const handleRegister = (data)=>{
        if(!vertify){
            message.error('请完成滑动验证!');
            return ;
        }
        const {username,password,telephone} = data;
        setLoading(true);
        request.post('/user/register',{
            phone:telephone,
            nickname:username,
            password:password
        }).then(res=>{
            setLoading(false);
            message.success(`注册成功！请登录。`)
            setLoginState(1);
            reset()
        }).catch(err=>{
            setLoading(false);
            message.error('注册失败，请重试！');
        })
    }

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(handleRegister)}>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder="a" required className={styles.input}
                           {...register('username',{required:true,pattern:USERNAMEEXP})}
                    />
                    <label htmlFor="" className={styles.label}>用户名</label>
                </div>
                {errors.username && (<p className={styles.error}><ExclamationCircleOutlined className={styles.erroricon}/>{errors.username.type === 'required'?'请输入您的用户名':'请输入合法的用户名哦！'}</p>)}
                <div className={styles.inputContainer}>
                    <input type="password" placeholder="a"required className={styles.input}
                           {...register('password',{required:true,pattern:PASSWORDEXP})}
                    />
                    <label htmlFor="" className={styles.label}>密码</label>
                </div>
                {errors.password && (<p className={styles.error}><ExclamationCircleOutlined className={styles.erroricon}/>{errors.password.type === 'required'?'请输入您的密码':'请输入由6-20个字母、数字或下划线组成的密码哦！'}</p>)}
                <div className={styles.inputContainer}>
                    <input type="password" placeholder="a" required className={styles.input}
                           {...register('cpassword',{required:true,validate:(value)=>value===getValues("password")})}
                    />
                    <label htmlFor="" className={styles.label}>确认密码</label>
                </div>
                {errors.password && (<p className={styles.error}><ExclamationCircleOutlined className={styles.erroricon}/>{errors.password.type === 'required'?'请确认输入的密码':'两次输入的密码不一致'}</p>)}
                <div className={styles.inputContainer}>
                    <input type="text" placeholder="a"required className={styles.input}
                           {...register('telephone',{required:true,pattern:TELEPHONEEXP})}
                    />
                    <label htmlFor="" className={styles.label}>手机号码</label>
                </div>
                {errors.telephone && (<p className={styles.error}><ExclamationCircleOutlined className={styles.erroricon}/>{errors.telephone.type === 'required'?'请输入您的手机号码':'请输入正确格式的手机号码哦！'}</p>)}
                <div className={styles.verification}>
                    <Vertify
                        width={width<630?180:320}
                        height={width<630?50:100}
                        visible={true}
                        onSuccess={() => setVertify(true)}    //成功触发事件
                        onFail={() => setVertify(false)} // 失败触发事件
                    />
                </div>
                <div>
                    <span className={styles.switch} onClick={()=>setLoginState(1)}>去登录</span>
                    <span className={styles.forget} onClick={()=>setLoginState(3)}>忘记密码</span>
                </div>
                <Button type='submit' loading={loading}>注册</Button>
            </form>
        </>
    );
};

export default Register;
