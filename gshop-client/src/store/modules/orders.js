import {reqTradeInfo,reqPayInfo} from "@/api"


const state={
    tradeInfo: {}, // 交易信息
    payInfo: {}, // 支付信息
}

const mutations={
    RECEIVE_TRADE_INFO(state,tradeInfo){
        state.tradeInfo=tradeInfo
    },
    RECEIVE_PAY_INFO(state,payInfo){
        state.payInfo=payInfo
    }
}

const actions={
    //获取订单信息
    async getTradeInfo({commit}){
        const result=await reqTradeInfo()
        if (result.code==200){
            const tradeInfo=result.data
            commit("RECEIVE_TRADE_INFO",tradeInfo)
        }else {
            throw new Error(result.message||"订单信息请求错误")
        }
    },
//    通过orderId获取支付信息
    async getPayInfo({commit},orderId){
        const result=await reqPayInfo(orderId)
        if (result.code==200){
            const payInfo=result.data
            commit("RECEIVE_PAY_INFO",payInfo)
        }else {
            throw new Error(result.message||"支付信息请求错误")
        }
    }

}

const getters={}






export default {
    state,
    actions,
    mutations,
    getters
}

