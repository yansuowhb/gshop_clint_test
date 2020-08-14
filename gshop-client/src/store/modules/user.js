/*
管理用户模块相关数据的vuex子模块
完成用户登录注册退出功能
*/
import { getUserTempId,saveusertolocal,getusertolocal,removeUserInfo } from '@/utils'
import {reqRegister,reqLogin,reqLogout} from "@/api";

const state = {
    userInfo: getusertolocal(),
    userTempId: getUserTempId()
}
const mutations = {
    SAVE_USER_INFO(state,userInfo){
        state.userInfo=userInfo
    },
    Logout(state){
        state.userInfo={}
    }
}
const actions = {
    async register({commit},userInfo){
        //请求注册
        const result = await reqRegister(userInfo)
        console.log(userInfo)
        // console.log(result)
        //result数据为空只需判断状态码即可
        if (result.code!==200) {  // 失败了
            throw new Error(result.data)  // dispatch得到的是失败promise
        }
    },
    //用户登录
    async login({commit},{mobile,password}){
        const result = await reqLogin(mobile,password)
        console.log(result)
        // console.log(result)
        //result数据为空只需判断状态码即可
        if (result.code==200) {  // 成功了
        //    保存在state
            commit("SAVE_USER_INFO",result.data)
        //    将返回值存放在local
            saveusertolocal(result.data)
        }else {
            throw new Error(result.message)  // 失败
        }
    },
//    用户退出
    async logout({commit}){
        const result = await reqLogout()
        if (result.code==200) {  // 失败了
        //    删除state的用户信息
            commit("Logout")
        //    删除local的用户信息
            removeUserInfo()
        }else {
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