import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import TypeNav from "./compontent/TypeNav"
import Carousel from "./compontent/Carousel/carousel"
import Pagination from "./compontent/Pagination"
import store from "./store"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "@/mock/mockServe"
//表单验证插件
import "@/plugins"
Vue.component("TypeNav",TypeNav)
Vue.component("Carousel",Carousel)
Vue.component("Pagination",Pagination)
Vue.config.productionTip = false
import * as API from '@/api'
Vue.prototype.$API = API // 将包含所有接口请求函数的对象保存到Vue原型对象
Vue.use(ElementUI)
new Vue({
  beforeCreate () {
    // 将当前vm作为总线对象挂到Vue原型对象上
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')
