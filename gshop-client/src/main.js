import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import TypeNav from "./compontent/TypeNav"
import Carousel from "./compontent/Carousel/carousel"
import Pagination from "./compontent/Pagination"
import store from "./store"
import "@/mock/mockServe"
Vue.component("TypeNav",TypeNav)
Vue.component("Carousel",Carousel)
Vue.component("Pagination",Pagination)
Vue.config.productionTip = false

new Vue({
  beforeCreate () {
    // 将当前vm作为总线对象挂到Vue原型对象上
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')
