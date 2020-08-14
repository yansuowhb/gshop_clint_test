import axios from "axios"
import NProgress from "nprogress"
import 'nprogress/nprogress.css'
import store from "@/store"
NProgress.configure({ showSpinner: false }) // 隐藏右侧的旋转进度条

const instace =axios.create({
    baseURL:"/api",
    timeOut:10000
})

instace.interceptors.request.use(function (config) {
    NProgress.start()
    const userTempId=store.state.user.userTempId
    const token=store.state.user.userInfo.token
    if (token){
        config.headers.token=token
    }
    config.headers.userTempId=userTempId
    return config;
})



instace.interceptors.response.use((res)=>{
    NProgress.done()
    return res.data
},(error)=>{
    NProgress.done()
    alert("请求失败"+error.message||"未知错误")
    // throw error
    return Promise.reject(error)
})


export default instace
