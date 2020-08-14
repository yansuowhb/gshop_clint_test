<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked" @change="checkCartItem(item)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:" class="mins" @click="res(item)">-</a>
            <input autocomplete="off" type="text" :value="item.skuNum" @change="setskuNum(item,$event)"  minnum="1" class="itxt" @input="validSkuNum">
            <a href="javascript:" class="plus" @click="add(item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuNum*item.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartitem(item)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="AllCheck">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCartItems">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalCount}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  export default {
    name: 'ShopCart',
    methods:{
      //  用正则检测数据是否正确
        validSkuNum(event){
            const value=event.target.value
            event.target.value=value.replace(/^0+|\D+0*/g,'')||1
        },
      //切换商品选中状态
      async checkCartItem(item){
        const skuId=item.skuId
        const isChecked=item.isChecked===1?0:1
        console.log(isChecked)
        try {
          await this.$store.dispatch("checkCartItem",{skuId,isChecked})
          //更新页面
          this.$store.dispatch("getGoodsCar")
        }catch (e) {
          alert(e.message)
        }

      },
    //  删除一个商品
      async deleteCartitem(item){
        const {skuId}=item
        try {
          await this.$store.dispatch("deleteCartItem",skuId)
          this.$store.dispatch("getGoodsCar")
        }catch (e) {
          alert(e.messages)
        }

      },
      async deleteAllCartItems(){
        try {
          await this.$store.dispatch("deleteAllCartItems")
          this.$store.dispatch("getGoodsCar")
        }catch (e) {
          alert(e.messages)

        }
      },
      //更改商品数量
      async setskuNum(item,event){
        let skuId=item.skuId
        let newNum=event.target.value
        let skuNum=newNum-item.skuNum
          // if (newNum<1 || typeof newNum!="Numbel" ||newNum%1!=0) {
          //     event.target.value=item.skuNum
          //     return
          // }
        // console.log(newNum,item.skuNum,skuNum,skuId)
        try {
          await this.$store.dispatch("addToCart",{skuId,skuNum})
          this.$store.dispatch("getGoodsCar")
        }catch (e) {
          alert(e.messages)
        }
        // console.log(num,event.target.value)
      },
      //更改商品数量
      async add(item){
        let skuId=item.skuId
        let skuNum=1
        // console.log(newNum,item.skuNum,skuNum,skuId)
        try {
          await this.$store.dispatch("addToCart",{skuId,skuNum})
          this.$store.dispatch("getGoodsCar")
        }catch (e) {
          alert(e.messages)
        }
      },
      async res(item){
        let skuId=item.skuId
        let skuNum=-1
        if (item.skuNum<=1) return
        // console.log(newNum,item.skuNum,skuNum,skuId)
        try {
          await this.$store.dispatch("addToCart",{skuId,skuNum})
          this.$store.dispatch("getGoodsCar")
        }catch (e) {
          alert(e.messages)
        }
      },
    },
    computed:{
      cartList(){
        return this.$store.state.shopCart.cartList
      },
      AllCheck:{
        get(){
          return this.isAllCheck
        },
        async set(value){
          try {
            await this.$store.dispatch("checkAllCartItems",value)
            this.$store.dispatch("getGoodsCar")
          }catch (e) {
            alert(e.messages)
          }


        }
      },
      ...mapGetters(["totalCount","totalPrice","isAllCheck"])
    },
    mounted() {
        this.$store.dispatch("getGoodsCar")

    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 5%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 35%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 15%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 5%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 15%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 15%;

          }

          .cart-list-con5 {
            width: 15%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 15%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 15%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>