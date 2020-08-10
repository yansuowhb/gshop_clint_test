import {reqBaseCategoryList,reqBanners,reqFloors} from "@/api"

const state={
    baseCategoryList:[],
    banners: [], // 广告位轮播数据的数组
    floors: [], // 所有楼层数据的数组
}
const actions={
    async getBaseCategoryList({commit}){
        console.log("action")
        const result=await reqBaseCategoryList()
        if (result.code===200){
            const categoryList=result.data
            commit("getBaseCategoryList",categoryList)
        }
    },
    async getBanners({commit}){
        const result=await reqBanners()
        if (result.code===200){
            const Banners=result.data
            commit("getBanners",Banners)
        }
    },
    async getFloors({commit}){
        const result=await reqFloors()
        if (result.code===200){
            const Floors=result.data
            commit("getFloors",Floors)
        }
    }
}
const mutations={
    getBaseCategoryList(state,categoryList){
        state.baseCategoryList=categoryList.splice(0,15)
    },
    getBanners(state,Banners){
        state.banners=Banners
    },
    getFloors(state,Floors){
        state.floors=Floors
    }
}
export default {
    state,
    actions,
    mutations
}



