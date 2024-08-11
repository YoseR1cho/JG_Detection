import {makeAutoObservable} from "mobx"
import {addProcess, getProcess, updateKnowledge} from "@/utils/api.js";
import {message} from "antd";
class Process{
    process=[]
    loading = false
    constructor(){
        makeAutoObservable(this,{},{autoBind:true})
        this.loadProcess()
    }

    loadProcess(keyword){
        this.loading = true
        getProcess().then(res=>{
            if(keyword){
                this.process = res.data.filter(item=> item.title.includes(keyword) || item.content.includes(keyword))
                this.loading = false
                return ;
            }
            if(res.data.length===0) return ;
            let data = []
            for(let i = 0;i<res.data.length;i++){
                data.push(res.data.find(item=>+item.step===i+1))
            }
            this.process = data
            this.loading = false
        }).catch(e=>{
            message.error('列表获取失败')
            this.loading = false
        })
    }

    addProcess(newProcess){
        this.loading = true
        addProcess(newProcess).then(res=>{
            message.success('发布成功！')
            this.loading = false
            this.loadProcess()
        }).catch(()=>{
            message.error('发布失败！')
            this.loading = false
        })
    }

    updateProcess(id,newProcess){
        this.loading = true
        updateKnowledge(id,newProcess).then(()=>{
            this.loading = false
            this.loadProcess()
        }).catch((e)=>{
            this.loading = false
            console.log(e)
        })
    }

}
export default new Process()
