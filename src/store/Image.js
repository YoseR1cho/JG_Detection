import {makeAutoObservable} from "mobx";
import {request} from "@/utils/axios.js";
import {message} from "antd";
import {transformImage} from "@/utils/index.js";
import State from './State.js'
import {analyzedPic, generateWorkSheet, uploadPic} from "@/utils/api.js";
class Image {
    url
    name
    pos
    id
    form
    analyzedImg
    constructor() {
        makeAutoObservable(this,{},{autoBind:true})
        this.form = null
        this.url = ''
        this.name = ''
        this.id=null
        this.pos = {lng:null,lat:null,loc:''}
        this.analyzedImg = {defectType:'',url:'',riskLevel:''}
    }


    setForm(form){
        this.form = form
    }
    setUrl(url){
        this.url = url;
    }
    setName(name){
        this.name = name;
    }

    setPos(lng,lat){
        this.pos.lng = lng;
        this.pos.lat = lat;
    }

    setLoc(loc){
        this.pos.loc = loc;
    }

    setInitialize(){
        this.form = null
        this.url=''
        this.name=''
        this.id=''
        this.pos={lng:null,lat:null,loc:''}
        this.analyzedImg = {defectType:'',url:'',riskLevel:''}
    }

    setAnalyzedImg(data){
        this.analyzedImg.defectType = data[0]
        this.analyzedImg.url = data[1]
        this.analyzedImg.riskLevel = data[2]
    }


    async uploadImage(){
        State.setLoading(true);

        try{
            const res = await uploadPic(this.form)

            const analyzedRes = (await analyzedPic(res.data)).data;
            this.setAnalyzedImg(analyzedRes)

            await generateWorkSheet(res.data,this.pos);

            State.setLoading(false);
            State.setOpen(2);
        }
        catch(err){
            this.setInitialize();
            message.error('隐患识别失败，请尝试重新登录后重试！')

            State.setLoading(false);
            State.setOpen(0);
            throw new Error('重新登录')
        }
    }

    async downloadImage() {
        if (!this.id) {
            message.error('id不存在');
            return;
        }
        try {
            const res = await request.get(`/picture/download/${this.id}`)
            console.log(res);
            transformImage(res, this.name);
        } catch (err) {
            message.error('下载失败，请重试！')
        }
    }
}

export default new Image();

