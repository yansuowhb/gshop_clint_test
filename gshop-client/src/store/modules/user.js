/*
管理用户模块相关数据的vuex子模块
完成用户登录注册退出功能
*/
import { getUserTempId } from '@/utils'

const state = {
    userInfo: {},
    userTempId: getUserTempId()
}
const mutations = {}
const actions = {}

const getters = {
}

export default {
    state,
    mutations,
    actions,
    getters
}