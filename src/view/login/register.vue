<template>
    <div class="register" :style='backStyle' ref="homePage">
      <div class="back_box" ref="homePage2">
        <div class="input-box">
          <input type="text" placeholder="请输入手机号" class="phone-input" />
          <div class="code-box">
            <input type="text" placeholder="请输入验证码" class="code-input" />
            <div class="send-code">
              获取验证码
            </div>
          </div>
          <div class="code-box">
            <input placeholder="输入6-12位数字、英文密码" type="password" class="phone-input" />
            <div class="send-code" style="width: 3.14667rem;">
              <img src="@/assets/img/login/text_pwd.b14fa85.png" style="width: 0.5rem; margin-top: 0.3rem;" />
            </div>
          </div>
          <div class="code-box">
            <input placeholder="请再次确认密码" type="password" class="phone-input" />
            <div class="send-code" style="width: 3.14667rem;">
              <img src="@/assets/img/login/text_pwd.b14fa85.png" style="width: 0.5rem; margin-top: 0.3rem;" />
            </div>
          </div>
          <div class="check_terms">
            <div class="marker">
              <div  class="select_marker"></div>
            </div>
            <span class="check_terms_span">我已同意并接受<span data-v-19589f74="">《服务条款》</span><span data-v-19589f74="">《隐私政策》</span></span>
          </div>
        </div>
      </div>
      <div class="title">注册</div>
      <div class="register-btn">立即注册</div>
      <img src="@/assets/img/home/logo.2e38c60.png" class="logo_fixed">
<!--        <x-header class="title" :left-options="{backText: ''}" title="注册">注册</x-header>-->
<!--        <div class="input-box">-->
<!--            <input v-model="mobile" type="text" placeholder="请输入手机号" class="phone-input">-->
<!--            <div class="code-box">-->
<!--                <input v-model="captcha" type="text" placeholder="请输入验证码" class="code-input">-->
<!--                <div class="send-code" @click="sms_send" :class="{gray:timer==0}">{{codeTips}}</div>-->
<!--            </div>-->
<!--            <input v-model="password" type="password" placeholder="6位及以上字母数字组合" class="phone-input">-->
<!--            <input v-model="secondPwd" type="password" placeholder="请再次确认密码" class="phone-input">-->
<!--        </div>-->
<!--        <div class="register-btn" @click="register">注册</div>-->
    </div>
</template>

<script>
import store from "store";
import {XHeader} from 'vux'
import {register,smsSend,sms_check} from '../../http/api.js'
export default {
    components:{
        XHeader
    },
    data(){
        return{
            mobile:'',
            captcha:'',
            password:'',
            secondPwd:'',
            timer:1,
            codeTips:'获取验证码',
            backStyle:{
              backgroundImage:
                "url(" + require("@/assets/img/login/bg.231de41.png") + ")",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover"
            },
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
        register(){ //注册
            let params={
                username:this.username,
                password:this.password,
                mobile:this.mobile,
                captcha:this.captcha
            }
            register(params).then((res)=>{
                console.log(res)
                if(res.code==1){
                    this.$vux.toast.text('注册成功', 'middle')
                    store.set("userinfo",res.data.userinfo)
                    window.setTimeout(()=>{
                        this.$router.replace({path:'/classify'})
                    },500)
                }else{
                    this.$vux.toast.text(res.msg, 'middle')
                }
            })
        },
        sms_send(){ //获取验证码
            let data={
                mobile:this.mobile,
                event:'register'
            }
            smsSend(data).then((res)=>{
                console.log(res)
                if(res.code==1){
                    if(this.timer==1){
                        var time=60;
                        var inter=window.setInterval(()=>{
                            this.codeTips="重新获取("+time+"s)";
                            this.timer=0;
                            time--;
                            if(time<0){
                                window.clearInterval(inter)
                                this.timer=1;
                                this.codeTips="获取验证码"
                            }
                        },1000)
                    }
                }else{
                    this.$vux.toast.text(res.msg, 'middle')
                }
            })
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
    padding-top: 3rem;
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
   .check_terms{
      width: 100%;
      height: 1.3rem;
      border: none;
      font-size: .426667rem;
      color: #ccc;
    }
    .marker{
      width: .25rem;
      height: .25rem;
      border: 1px solid #fff;
      border-radius: 50%;
      float: left;
      margin-top: .23rem;
      margin-right: .1rem;
    }
    .select_marker{
      width: .2rem;
      height: .2rem;
      background-color: #fff;
      border-radius: 50%;
      margin-top: .025rem;
      margin-left: .025rem;
    }
    .check_terms_span{
      color: #ccc;
      font-size: .306667rem;
      line-height: .8rem;
    }
   .code-box{
      height: 1.333333rem;
      border-bottom: 1px solid #d8d6d9;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -ms-flex-align: center;
      align-items: center;
     .send-code{
       width: 4.146667rem;
       height: 1.066667rem;
       text-align: right;
       line-height: 1.066667rem;
       color: #d8d6d9;
       border-radius: .106667rem;
       font-size: .4rem;
     }
    }
   .code-box input{
      width: 100%;
      height: 1rem;
      border: none;
      font-size: .426667rem;
      line-height: 1rem;
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
  .register-btn{
    position: fixed;
    top: 8.5rem;
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
}
</style>
