<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="mobile"
               name="phone" v-validate="{required: true,regex: /^1\d{10}$/}"
               :class="{invalid: errors.has('phone')}">
        <span class="error-msg">{{errors.first("phone")}}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code"
               name="code" v-validate="{required: true,regex: /\d{4}/}"
               :class="{invalid: errors.has('code')}">
<!--        这里完整地址是http://182.92.128.115/api/user/passport/code
            但是如果填了完整地址，这个标签就会自动发送请求去获取这个图片，是浏览器端发送的请求，因为后端要验证用户输入的验证码是否正确
            会记录这个请求的相关信息，当下一次再向后端发送注册请求，并带上验证码后，后端就会检查这个验证码即其请求的相关信息。但是我们发
            送的是代理发送的请求，就造成了，图片的请求是浏览器发送的，注册请求是代理发送的，后端在检测的时候发现记录的信息不对，故报验证
            码错误
-->
        <img ref="code" src="/api/user/passport/code" alt="code" @click="updateCode">
        <span class="error-msg">{{errors.first("code")}}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="text" placeholder="请输入你的登录密码" v-model="password"
               name="password" v-validate="{required: true,min: 6, max: 10}"
               :class="{invalid: errors.has('password')}">
        <span class="error-msg">{{errors.first("password")}}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="text" placeholder="请输入确认密码" v-model="password2"
               name="password2" v-validate="{required: true,is:password}"
               :class="{invalid: errors.has('password2')}">
        <span class="error-msg">{{errors.first("password2")}}</span>
      </div>
      <div class="controls">
        <input type="checkbox" v-model="isAgree"
               name="agree" v-validate="'agree'">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{errors.first("agree")}}</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    methods:{
      //这是注册按钮
      async register(){
      //  用户点击注册-》分发请求注册-》成功跳转到登录页面
        const {mobile,password,code}=this
        const success = await this.$validator.validateAll() // 对所有表单项进行验证
        if(success){
          try {
            await this.$store.dispatch("register",{mobile,password,code})
            this.$router.push("/login")
          }catch (e) {
            this.updateCode()
            this.code=""
            alert(e.message)

          }
        }
      },
      updateCode(event){
        event.target.src="/api/user/passport/code"
      }
    },
    data(){
      return{
        //保存用户电话
        mobile:'',
        //保存用户密码
        password:'',
        password2:'',
      //  保存验证码
        code:'',
      //  判断用户是否点击了统一协议
        isAgree:false,
      }
    }
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
          &.invalid{
            border: 1px solid red;
          }
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>