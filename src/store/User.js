import {action, makeObservable, observable} from "mobx";

class User {
    nickName;
    id;
    job;
    user;
    phone;
    loading;

    constructor() {
        makeObservable(this,{
            nickName:observable,
            loading:observable,
            phone:observable,
            user:observable,
            id:observable,
            job:observable,
            setLoading:action.bound,
            setUser:action.bound
        })

        this.id=''
        this.nickName='';
        this.phone = '';
        this.loading=false
    }

    setUser(userMsg){
        const {nickName,id,job,phone} = userMsg.user;
        const {user} = userMsg.authority
        this.nickName = nickName
        this.id = id;
        this.job = job;
        this.user = user;
        this.phone = phone
    }

    setLoading(bool){
        this.loading = bool;
    }

}

export default new User();
