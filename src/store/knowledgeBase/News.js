import {makeAutoObservable} from "mobx"
import {addNews, getNews, updateKnowledge} from "@/utils/api.js";
import {message} from "antd";
class News{
    news=[]
    dataList = []
    loading = false
    constructor(){
        makeAutoObservable(this,{},{autoBind:true})
    }

    loadNews(keyword){
        this.loading = true
        getNews().then(res=>{
            if(keyword){
                this.news = res.data.filter(item=> item.description.includes(keyword) || item.title.includes(keyword))
                this.loading = false
                return ;
            }
            this.news = res.data
            for(let i=0;i<this.news.length;i++){
                this.news[i].pId = i+1
            }
            this.dataList = this.news.filter(item=>item.pId>0 && item.pId<=8)
            this.loading = false;
        }).catch(e=>{
            console.log(e);
            this.loading = false;
        })
    }

    addNews(news){
        this.loading = true
        addNews(news).then(()=>{
            this.loadNews()
            message.success('新闻发布成功')
            this.loading = false;
        }).catch(e=>{
            message.error('新闻发布失败，请重试')
            this.loading = false
        })
    }

    updateNews(id,news){
        this.loading = true
        updateKnowledge(id,news).then(()=>{
            this.loading = false
            this.loadNews()
            message.success('新闻更新成功')
        }).catch((e)=>{
            this.loading = false
            message.success('新闻更新失败')
            console.log(e)
        })
    }

    handlerForward(page){
        this.dataList = this.news.filter(item=>item.pId>(page*8)&&item.pId<=((page+1)*8))
    }

    handlerBack(page){
        this.dataList = this.news.filter(item=>+item.pId>(page-1)*8 && +item.pId<=page*8)
    }
}
export default new News()
