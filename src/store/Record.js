import {action, makeObservable, observable} from "mobx";
import axios from "axios";
import User from './User.js'
import {recordHistory} from "@/utils/api.js";

class Record {
    recordList
    loading
    constructor() {
        makeObservable(this,{
            recordList:observable,
            loading:observable,
            loadRecordList:action.bound,
            addRecord:action.bound
        })
        this.recordList = [];
    }

    loadRecordList(){
        User.id
        this.loading = true
        recordHistory().then(res=>{
            this.recordList = res.data
            this.loading = false
            console.log(res.data)
        }).catch(e=>{
            console.log(e)
        })
    }

    addRecord(record){
        this.recordList.unshift(record)
    }

}

export default new Record();
