import { reqGoodsCar,
    reqAddToCart,
    reqCheckCartItem,
    reqDeleteCartItem   } from '@/api'

const state = {
    cartList: []
}

const mutations = {
    /*
    接收商品详情信息
    */
    RECEIVE_GOODS_CAR (state,goodsCar){
        state.cartList=goodsCar
    }
}

const actions = {
    /*
    获取购物车列表
    */
    async getGoodsCar({commit}){
        const result=await reqGoodsCar()

        if(result.code===200){
            const goodsCar = result.data
            commit('RECEIVE_GOODS_CAR', goodsCar)
        }
    },
    /*
    添加到购物的异步action
    */
    async addToCart ({commit}, {skuId, skuNum}) {   // dispatch('addToCart', {skuId, skuNum})
        const result = await reqAddToCart(skuId, skuNum)
        // console.log(result)
        //result数据为空只需判断状态码即可
        if (result.code!==200) {  // 失败了
            throw new Error('添加购物车失败')  // dispatch得到的是失败promise
        }

    },
    //更改商品选中状态
    async checkCartItem({commit},{skuId,isChecked}){

        const result = await reqCheckCartItem(skuId, isChecked)
        // console.log(result)
        if (result.code!==200) {  // 失败了
            throw new Error('状态切换失败')  // dispatch得到的是失败promise
        }
    },
    //删除某个商品
    async deleteCartItem({commit},skuId){

        const result = await reqDeleteCartItem(skuId)
        // console.log(result)
        if (result.code!==200) {  // 失败了
            throw new Error('删除失败')  // dispatch得到的是失败promise
        }
    },
    checkAllCartItems ({commit, dispatch, state}, isCheck) {
        // 确定最新的状态值
        const isChecked = isCheck ? 1 : 0

        const promises = []

        // 当前商品与全选状态不一致才发请求
        state.cartList.forEach(item => {
            if (isChecked===item.isChecked) return

            const {skuId} = item
            // 为了让所有的请求一起发出，为了判断所有请求成功要把dispatch的返回值放到数组里通过promise.all判断
            promises.push(dispatch('checkCartItem',  {skuId, isChecked}))
        })

        return Promise.all(promises) // all()返回的promise在全部都成功时才成功, 否则就是失败的
    },
    deleteAllCartItems ({commit, dispatch, state}) {
        const promises = []

        state.cartList.forEach(item => {
            if (!item.isChecked) return
            const {skuId} = item
            // 为了让所有的请求一起发出，为了判断所有请求成功要把dispatch的返回值放到数组里通过promise.all判断
            promises.push(dispatch("deleteCartItem",skuId))
        })
        return Promise.all(promises) // all()返回的promise在全部都成功时才成功, 否则就是失败的
    },


}

//通过购物车列表数据进行进一步处理
const getters = {
    //选中商品总数
    totalCount(state){
        return state.cartList.reduce((pre,item)=> pre + (item.isChecked===1 ? item.skuNum : 0),0)
    },
    //选中商品总价钱
    totalPrice(state){
        return state.cartList.reduce((pre,item)=> pre + (item.isChecked===1?item.skuPrice:0)*item.skuNum,0)
    },
    isAllCheck(state,getters){
        return state.cartList.every((item)=>item.isChecked)&&getters.totalCount>0
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
