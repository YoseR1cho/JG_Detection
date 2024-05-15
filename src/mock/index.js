import {createProdMockServer} from "vite-plugin-mock/client";
import MockMethod from './recordList.js'

export function setupProdMockServer() {
    createProdMockServer([...MockMethod])
}
