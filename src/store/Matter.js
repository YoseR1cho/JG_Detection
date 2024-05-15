import {makeAutoObservable} from "mobx"
import {addMatter, getMatters, updateKnowledge, updateMatterKnowledge} from "@/utils/api.js";
import {message} from "antd";
class Matter{
    matters=[]
    loading = false
    constructor(){
        makeAutoObservable(this,{},{autoBind:true})
        this.loadMatters()
    }

    loadMatters(keyword){
        this.loading = true
        getMatters().then(res=>{
            if(keyword){
                this.matters = res.data.filter(item=> item.question.includes(keyword) || item.solution.includes(keyword))
                this.loading = false
                return ;
            }
            this.matters = res.data
            this.loading = false
        }).catch(e=>{
            message.error('事项列表获取失败')
            this.loading = false
        })
    }

    addMatter(matter){
        this.loading = true
        addMatter(matter).then(res=>{
            message.success('事项发布成功！')
            this.loading = false
            this.loadMatters()
        }).catch(()=>{
            message.error('事项发布失败！')
            this.loading = false
        })
    }

    updateMatter(id,matter){
        this.loading = true
        updateMatterKnowledge(id,matter).then(()=>{
            this.loading = false
            this.loadMatters()
            message.success('事项更新成功')
        }).catch((e)=>{
            this.loading = false
            message.error('事项更新失败')
            console.log(e)
        })
    }

}
export default new Matter()
