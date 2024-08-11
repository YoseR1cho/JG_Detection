import {makeAutoObservable} from "mobx";
import axios from "axios";
import Record from "@/store/Record.js";
import {
    auditWorkSheet,
    disposeWorkSheet,
    reAuditWorkSheet,
    receiveWorkSheet,
    workSheetExpert
} from "@/utils/api.js";
import dayjs from "dayjs";


class Event {
    eventList =[]
    loading = false
    filterList = []//筛选数组
    filterState = false //默认没有进行筛选
    constructor() {
        makeAutoObservable(this,{},{autoBind:true})
    }

    loadEventList(status){
        this.loading = true
        workSheetExpert(status).then(res=>{
            console.log(res.data.records);
            this.eventList = res.data.records.filter(item=>item.instrumentType!=="手机移动端小程序");
            this.loading = false
        }).catch(e=>{
            console.log(e)
        })
    }

    loadAppEventList(status){
        this.loading = true
        workSheetExpert(status).then(res=>{
            this.eventList = res.data.records.filter(item=>item.instrumentType==="手机移动端小程序");
            this.loading = false
        }).catch(e=>{
            console.log(e)
        })
    }

    filterEventList(date){
        if(date===null){
            this.filterState = false
            return ;
        }else {
            this.filterState = true
        }
        this.filterList = this.eventList.filter(item=>{
            return date.getTime() === dayjs(item.createTime.split(' ')[0]).toDate().getTime()
        })

    }

    addEvent(event){
        axios.post('/server/recordList', {
            ...event,
            id:(this.eventList.length+1).toString()
        }).then(res=>{
            console.log(res)
        }).catch(e=>{
            console.log(e);
        })
        this.eventList.unshift({...event,id:(this.eventList.length+1).toString()})
        Record.addRecord(event)
    }


    auditEvent(data){
        this.loading = true;
        auditWorkSheet(data).then(res=>{
            this.eventList.filter(item=>{
                if(item.id===data.id){
                    item.status = '待维修人员接单'
                }

            })
            this.loading = false
        }).catch(e=>{
            this.loading = false
            console.log(e)
        })
    }

    deliveryEvent(data){
        this.loading = true;
        auditWorkSheet(data).then(res=>{
            console.log(res);
            this.loading = false
        }).catch(e=>{
            this.loading = false
            console.log(e)
        })
    }

    receiveEvent(id){
        this.loading = true;
        receiveWorkSheet(id).then(res=>{
            console.log(res)
            this.loading = false
        }).catch(e=>{
            console.log(e)
            this.loading = false
        })
        this.eventList.filter(item=>{
            if(item.id===id){
                item.status = '维修人员已接单，待维修'
            }
        })
    }

    disposeEvent(id,repairedUrl){
        this.loading = true
        disposeWorkSheet(id,repairedUrl).then(res=>{
            console.log(res)
        }).catch(e=>{
            console.log(e)
            this.loading =false;
            return ;
        })
        this.eventList.filter(item=>{
            if(item.id===id){
                item.status = '维修完成，待专家复审'
            }
        })
    }

    reAuditEvent(id,msg,advice){
        this.loading = true;
        reAuditWorkSheet(id,msg,advice).then(res=>{
            if(msg==='专家复审未通过，返工'){
                this.eventList.filter(item=>{
                    if(item.id===id){
                        item.status = '专家复审未通过，返工'
                    }
                })

            }else {
                this.eventList.filter(item=>{
                    if(item.id===id){
                        item.status = '专家复审通过，可销项'
                    }
                })
            }
            this.loading = false
        }).catch(e=>{
            this.loading = false
            console.log(e)
            return ;
        })
    }

    outputEvent(id){
        axios.patch(`/server/recordList/${id}`,{status:6}).then(res=>{
            console.log(res)
        }).catch(e=>{
            console.log(e)
        })
        this.eventList.filter(item=>{
            if(item.id===id){
                item.status = 6
                console.log(item)
            }
        })
    }
}

export default new Event();
