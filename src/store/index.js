import { configure } from "mobx";
import React from 'react'

// store
import knowledgeBaseStore from '@/store/knowledgeBase'
import Delivery from "@/store/Delivery.js";
import Image from "@/store/Image.js";
import Record from "@/store/Record.js";
import State from "@/store/State.js";
import User from "@/store/User.js"
import UserList from "@/store/UserList.js";
import WorkOrder from "@/store/WorkOrder.js";

export const stores = {...knowledgeBaseStore,Delivery,Image,Record,State,User,UserList,WorkOrder};

const storeContext = React.createContext(stores)

export const useStores = ()=>React.useContext(storeContext)

export const StoreProvider = storeContext.Provider;
