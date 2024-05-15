import {makeAutoObservable} from "mobx"
import {addFeatures, getFeatures, updateKnowledge} from "@/utils/api.js";
import {message} from "antd";
class Feature{
    features=[]
    loading = false
    constructor(){
        makeAutoObservable(this,{},{autoBind:true})
        this.loadFeatures()
    }

    loadFeatures(keyword){
        this.loading = true
        getFeatures().then(res=>{
            if(keyword){
                this.features = res.data.filter(item=> item.content.includes(keyword) || item.description.includes(keyword))
                this.loading = false
                return ;
            }
            this.features = res.data
            this.loading = false
        }).catch(e=>{
            message.error('列表获取失败')
            this.loading = false
        })
    }

    addFeature(feature){
        this.loading = true
        addFeatures(feature).then(res=>{
            message.success('发布成功！')
            this.loading = false
            this.loadFeatures()
        }).catch(()=>{
            message.error('发布失败！')
            this.loading = false
        })
    }

    updateFeature(id,feature){
        this.loading = true
        updateKnowledge(id,feature).then(()=>{
            this.loading = false
            this.loadFeatures()
        }).catch((e)=>{
            this.loading = false
            console.log(e)
        })
    }

}
export default new Feature()
