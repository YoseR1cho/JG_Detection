import {useEffect, useState} from "react";
import {getUser} from "@/utils/login.js";
import {loginById} from "@/utils/api.js";
import {message} from "antd";
import {useNavigate} from "react-router-dom";
import User from "@/store/User.js";

export default function useLogin(isAdmin=false){
    const [loading,setLoading] = useState(false);
    const {setUser} = User;
    const navigateTO = useNavigate()

    useEffect(() => {
        setLoading(true)
        const id = getUser()
        if(!id){
            setLoading(false)
            navigateTO('/login')
            return ;
        }
        loginById(id).then(res=>{
            const job = res.data.user.job
            setLoading(false)
            setUser(res.data)
            if(isAdmin){
                if(job!=='超管' && job!=='会审专家'){
                    navigateTO('/')
                    message.error('抱歉，您没有访问权限！')
                }
            }
        }).catch(e=>{
            setLoading(false)
            console.log(e);
            navigateTO('/login')
        })
    },[]);

    return {loading};
}
