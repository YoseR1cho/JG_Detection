import { makeAutoObservable } from "mobx";

class Monitor {
    bugList;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this.bugList = [];
    }

    addBug(bug) {
        this.bugList.push(bug);
    }
}
export default new Monitor();
