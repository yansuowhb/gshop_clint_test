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
export default {
  name: 'App',
  components: {Footer,Header},
}
</script>

<style>

</style>
