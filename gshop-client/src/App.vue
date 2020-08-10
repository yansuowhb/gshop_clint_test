<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer  v-show="!$route.meta.isShowFooter"></Footer>
  </div>
</template>

<script>

import Footer from "./compontent/Footer/Footer";
import Header from "./compontent/Header/Header";
// import {reqBaseCategoryList} from "./api"
export default {
  name: 'App',
  components: {Footer,Header},
  async mounted() {
    // const result=await reqBaseCategoryList()
    // console.log(result)
    this.$store.dispatch("getBaseCategoryList")
  }
}
</script>

<style>

</style>
