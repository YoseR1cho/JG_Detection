import {action, makeObservable, observable} from "mobx";

class Delivery {
    deliveryList

    constructor() {
        makeObservable(this,{
            deliveryList:observable,
            setDeliveryList:action.bound
        })
        this.deliveryList = []
    }

    setDeliveryList(item){
        item.isReceive = false;
        this.deliveryList.push(item)
        console.log(this.deliveryList)
    }
}

export default new Delivery();
