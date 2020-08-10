import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import TypeNav from "./compontent/TypeNav"
import Carousel from "./compontent/Carousel/carousel"
import store from "./store"
import "@/mock/mockServe"
Vue.component("TypeNav",TypeNav)
Vue.component("Carousel",Carousel)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
