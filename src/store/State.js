import {action, makeObservable, observable} from "mobx";

class State {
    openState
    image
    loading
    id
    map

    constructor() {
        makeObservable(this, {
            openState: observable,   //0代表无弹窗 1代表打开位置选择器 2代表打开识别报告
            loading: observable,
            map:observable,
            setOpen: action.bound,
            setLoading: action.bound,
            setMap:action.bound
        })
        this.openState = 0
        this.loading = false
    }

    setOpen(state) {
        this.openState = state;
    }


    setLoading(bool) {
        this.loading = bool;
    }

    setMap(bool){
        this.map = bool;
    }
}
export default new State();
