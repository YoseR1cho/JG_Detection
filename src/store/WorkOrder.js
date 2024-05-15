import {action, makeObservable, observable} from "mobx";
import {getWorkSheet} from "@/utils/api.js";

class WordOrder {
    workOrderList
    loading
    constructor() {
        makeObservable(this,{
            workOrderList:observable,
            loading:observable,
            loadWorkOrderList:action.bound
        })
        this.loadWorkOrderList('待维修人员接单')
    }

    loadWorkOrderList(status){
        this.loading = true
        getWorkSheet(status).then(res=>{
            this.workOrderList = res.data.records
            this.loading = false
        }).catch(e=>{
            console.log(e);
            this.loading = false
        })
        /*axios.get('/mock/wordOrder').then(res=>{
            .data.data;
        }).catch(e=>{
            console.log(e)
        })*/
    }


}

export default new WordOrder();
