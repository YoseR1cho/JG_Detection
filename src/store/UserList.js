import {action, makeObservable, observable} from "mobx";
import {getUser} from "@/utils/api.js";
import {message} from "antd";

class userList {
    users;
    loading;

    constructor() {
        makeObservable(this,{
            users:observable,
            loading:observable,
            loadUsers:action.bound
        })
        this.loadUsers();
    }

    loadUsers(name='',job=''){
        this.loading = true
        getUser(name,job).then(res=>{
            this.users = res.data.records
            this.loading=false
        }).catch(e=>{
            message.error('用户加载失败！')
            this.loading = false
        })
    }


}

export default new userList();
