import cookie from "react-cookies";
import {LOGINID, SYSTEMSTATUS} from "@/utils/config.js";

function setUser(id){
    cookie.save(LOGINID,id,{path:'/',expires:new Date(new Date().getTime()+60*1000*60*24*3)});
}

function getUser(){
    return cookie.load(LOGINID);
}

function removeUser(){
    cookie.remove(LOGINID);
}


export {
    setUser,
    getUser,
    removeUser,
}
