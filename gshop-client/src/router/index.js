import router from "vue-router"
import vue from "vue"
import routes from "./routes";
vue.use(router)

let newpush=router.prototype.push
let newreqlace=router.prototype.replace

router.prototype.push=function (location,onComplete,onAbort) {
    console.log("重写push")
    if (onComplete===undefined&&onAbort===undefined){
        return newpush.call(this,location).catch(()=>{})
    }else {
        newpush.call(this,location,onComplete,onAbort)
    }
}

router.prototype.replace=function (location,onComplete,onAbort) {
    if (onComplete===undefined&&onAbort===undefined){
        return newreqlace.call(this,location).catch(()=>{})
    }else {
        newreqlace.call(this,location,onComplete,onAbort)
    }
}



export default new router({
    mode:"history",
    routes,
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { x: 0, y: 0 }
    }
})