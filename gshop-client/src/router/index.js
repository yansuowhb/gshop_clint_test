import router from "vue-router"
import vue from "vue"
import routes from "./routes";
import store from "@/store"
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

const Router=new router({
    mode:"history",
    routes,
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { x: 0, y: 0 }
    }
})
//当用户访问一下开头的路径时，必须已登录
const checkPaths = ['/trade', '/pay', '/center']

 Router.beforeEach(((to, from, next) => {
//    全局守卫
    console.log("全局守卫")
    const targrt=to.path
    const success=checkPaths.some((path)=> targrt.startsWith(path))
    if (success){
        const token=store.state.user.userInfo.token
        if (token){
            next()
        }else {
            next("/login")
        }
    }else {
        next()
    }
}))


export default Router