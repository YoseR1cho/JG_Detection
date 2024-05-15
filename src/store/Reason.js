import {action, makeAutoObservable, makeObservable, observable} from "mobx";
import {addReason, getReasons, updateKnowledge} from "@/utils/api.js";
import {message} from "antd";

class Reason {
    dataList = [];
    loading =false

    constructor() {
        makeAutoObservable(this, {},{autoBind:true})
        this.loadReasons()
    }

    loadReasons(keyword) {
        this.loading = true
        getReasons().then(res => {
            if(keyword){
                this.dataList = res.data.filter(item=> item.title.includes(keyword) || item.description.includes(keyword)|| item.content.includes(keyword))
                this.loading = false
                return ;
            }
            this.dataList = res.data;
            this.loading = false
        }).catch(e=>{
            console.log(e);
            this.loading = false
        })
    }

    addInfo(data) {
        this.loading = true
        addReason(data).then(res=>{
            message.success('新增成功！')
            this.loading = false
            this.loadReasons()
        }).catch(()=>{
            message.error('新增失败！')
            this.loading = false
        })

    }

    updateReason(id,reason){
        this.loading = true
        updateKnowledge(id,reason).then(()=>{
            this.loading = false
            message.success('更新成功！')
            this.loadReasons()
        }).catch((e)=>{
            this.loading = false
            message.success('更新失败！')
            console.log(e)
        })
    }
}

export default new Reason();
