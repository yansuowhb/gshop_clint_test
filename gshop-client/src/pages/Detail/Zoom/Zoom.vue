<template>
  <div class="spec-preview">
    <img :src="imgUrl" v-if="imgUrl" />
    <div class="event" @mousemove="maskMove" ></div>
    <div class="big">
      <img :src="imgUrl"  v-if="imgUrl" ref="bigImg"/>
    </div>
    <div class="mask"  ref="mask"></div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  export default {
    name: "Zoom",

    methods:{

      maskMove(event){
        // 得到鼠标坐标
        const {offsetX, offsetY} = event
        const maskWidth=this.$refs.mask.clientWidth/2
        // console.log(offsetX, offsetY,maskWidth)
        // 计算当前mask要指定left和top
        let left = 0
        let top = 0
        left = offsetX - maskWidth
        top = offsetY - maskWidth
        // console.log(left,top)
        if (left<0) {
          left = 0
        } else if (left>=maskWidth*2) {
          left = maskWidth*2
        }
        if (top<0) {
          top = 0
        } else if (top>=maskWidth*2) {
          top = maskWidth*2
        }
        // console.log(left,top)
        const maskDiv = this.$refs.mask
        maskDiv.style.left = left + 'px'
        maskDiv.style.top = top + 'px'
        const bigImg=this.$refs.bigImg
        bigImg.style.left = -left*2 + 'px'
        bigImg.style.top = -top*2 + 'px'
      }
    },
    props:{
      imgUrl:{
        type:String
      }
    },
    computed:{
      ...mapGetters(["skuImageList"])
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>