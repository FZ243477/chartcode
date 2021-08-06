<template>
    <div class="register"  :style='backStyle' ref="homePage">
      <div class="back_box" ref="homePage2">
        <div class="input-box">
          <input type="text" v-model="account" placeholder="请输入手机号" />
          <input type="password" v-model="password" placeholder="请输入密码" />
        </div>
        <div class="control-box">
          <a href="/forgetPwd" class="btns">忘记密码?</a>
          <a href="/register" class="btns">注册</a>
        </div>
      </div>
      <div class="title">登录</div>
      <div class="login-btn" @click="login">登录</div>
      <img src="@/assets/img/home/logo.2e38c60.png" class="logo_fixed">
<!--        <div class="title">登录</div>-->
<!--        <div class="input-box">-->
<!--            <input v-model="account" type="text" placeholder="请输入手机号" class="phone-input">-->
<!--            <input v-model="password" type="password" placeholder="请输入密码" class="phone-input">-->
<!--        </div>-->
<!--        <div class="login-btn" @click="login">立即登录</div>-->
<!--        <div class="control-box">-->
<!--            <router-link to="/forgetPwd" class="btns">忘记密码</router-link>-->
<!--            <router-link to="/register" class="btns">注册账号</router-link>-->
<!--        </div>-->
    </div>
</template>

<script>
import store from "store";
import { login } from '../../http/api.js'
export default {
    components:{

    },
    data(){
        return{
          backStyle:{
            backgroundImage:
              "url(" + require("@/assets/img/login/bg.231de41.png") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          },
            account:'',
            password:'',
           clientHeight: '',
        }
    },
  mounted() {
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`          //document.body.clientWidth;
    //console.log(self.clientHeight);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function () {
      this.changeFixed(this.clientHeight)
    }
  },
    methods:{
      changeFixed(clientHeight) {                        //动态修改样式
        console.log(clientHeight);
        this.$refs.homePage.style.height = clientHeight + 'px';
        this.$refs.homePage2.style.height = clientHeight + 'px';
        console.log( this.$refs.homePage.style.height,' this.$refs.homePage.style.height')

      },
        login(){
            login({
                account:this.account,
                password:this.password
            }).then((res)=>{
                if(res.code==1){
                    this.$vux.toast.text('登录成功', 'middle')
                    store.set("userinfo",res.data.userinfo)
                    window.setTimeout(()=>{
                        this.$router.replace({path:'/classify'})
                    },500)
                }else{
                    this.$vux.toast.text(res.msg, 'middle')
                }
            })
        },
        elemeLogin(){
            window.location.href = "http://admin.shitutu.com/public/api/Elme/getAuthUrl"
        }
    }
}
</script>

<style lang="less" scoped>
    input::-webkit-input-placeholder {
        color: #D8D6D9;
    }
    .register{
        width:100vw;
        .title{
          position: fixed;
          top: .01rem;
          left: 4.5rem;
          padding-top: 1.206667rem;
          color: #fff;
          font-size: .65rem;
          text-align: center;
          font-family: PingFangSC-Regular;
          letter-spacing: 8px;
          font-weight: 700;
        }
        .input-box{
          padding: 0 1.2rem;
          box-sizing: border-box;
          padding-top: 3.666667rem;
            input{
              width: 99%;
              height: 1.3rem;
              border: none;
              border-radius: 0;
              border-bottom: 1px solid #fff;
              font-size: .426667rem;
              color: #ccc;
              BACKGROUND-COLOR: transparent;
            }
        }
        .login-btn{
          position: fixed;
          top: 7rem;
          left: 1.25rem;
          font-size: .38rem;
          font-weight: 549;
          text-align: center;
          line-height: 1.066667rem;
          margin: 1.44rem auto 0;
          color: #000;
          width: 76%;
          height: 1rem;
          background: #fff;
          border-radius: 5px;
        }
        .control-box{
          padding: 0 1.2rem;
          box-sizing: border-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-pack: justify;
          justify-content: space-between;
          margin-top: .233333rem;
            .btns{
              font-size: .373333rem;
              color: #ccc;
            }
        }
        .wechat-logo{
            margin:1.066667rem auto 0;
            display: flex;
            justify-content: center;
            align-items: center;
            .wechat-logo-box{
                text-align: center;
                img{
                    width:.96rem;
                    height:.96rem;
                    border-radius: 50%;
                }
                div{
                    font-size: .373333rem;
                    color:#5A5565;
                }
            }

        }
    }
</style>
