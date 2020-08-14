/*
管理用户模块相关数据的vuex子模块
完成用户登录注册退出功能
*/
import { getUserTempId } from '@/utils'
import {reqRegister} from "@/api";

const state = {
    userInfo: {},
    userTempId: getUserTempId()
}
const mutations = {}
const actions = {
    async register(userInfo){
        //请求注册
        const result = await reqRegister(userInfo)
        // console.log(result)
        //result数据为空只需判断状态码即可
        if (result.code!==200) {  // 失败了
            throw new Error(result.data)  // dispatch得到的是失败promise
        }
    }
}

const getters = {
}

export default {
    state,
    mutations,
    actions,
    getters
}