<template>
    <div class="forgetPwd" ref="homePage" style="background-color: rgb(245, 245, 245);">
      <Header></Header>
<!--        <x-header class="title" :left-options="{backText: ''}">修改密码</x-header>-->

      <div class="input-box">
        <div class="line"></div>
        <div class="r_p_box">
          旧密码：
          <input type="password" placeholder="请输入旧密码" class="phone-input" />
        </div>
        <div class="line"></div>
        <div class="r_p_box">
          新密码：
          <input type="password" placeholder="请输入新密码" class="phone-input" />
        </div>
      </div>

<!--        <div class="input-box">-->
<!--            <input v-model="old" type="password" placeholder="请输入旧密码" class="phone-input">-->
<!--            <input v-model="password" type="password" placeholder="请输入新密码" class="phone-input">-->
<!--        </div>-->
        <div class="confirm-btn" @click="confirm">确定</div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import store from "store";
import {XInput,Group,XButton,XHeader} from 'vux'
import {resetPwdt} from '../../http/api.js'
export default {
    components:{
        XInput,
        Group,
        XButton,
        XHeader,
      Header
    },
    data(){
        return{
            password:"",
            old:"",
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
        console.log( this.$refs.homePage.style.height,' this.$refs.homePage.style.height')
      },
        confirm(){  //确定
            let params={
                token:store.get("userinfo").token,
                password:this.password,
                old:this.old
            }
            resetPwdt(params).then(res=>{
                if(res.code==1){
                    this.$vux.toast.text('修改密码成功', 'middle');
                    store.remove("userinfo");
                    window.setTimeout(()=>{
                        this.$router.replace({path:'/login'})
                    },500)
                }else{
                    this.$vux.toast.text(res.msg, 'middle')
                }
            })
        },
        register(){ //注册
            let params={
                username:this.username,
                password:this.password,
                mobile:this.mobile,
                captcha:this.captcha
            }
            let checkParams={
                mobile:this.mobile,
                event:'register',
                captcha:this.captcha
            }
            // sms_check(checkParams).then((res)=>{
            //     console.log(res)
            //     if(res.code==1){
            //         register(params).then((res)=>{
            //             console.log(res)
            //             if(res.code==1){
            //                 _this.$vux.toast.text('注册成功', 'middle')
            //             }else{
            //                 _this.$vux.toast.text(res.msg, 'middle')
            //             }
            //         })
            //     }else{
            //         _this.$vux.toast.text(res.msg, 'middle')
            //     }
            // })
        },
        sms_send(){ //获取验证码
            var _this=this;
            let data={
                mobile:_this.mobile,
                event:'register'
            }
            smsSend(data).then((res)=>{
                console.log(res)
                if(res.code==1){
                    if(_this.timer==1){
                        var time=5;
                        var inter=window.setInterval(()=>{
                            _this.codeTips="重新获取("+time+"s)";
                            _this.timer=0;
                            time--;
                            console.log(time)
                            if(time<0){
                                window.clearInterval(inter)
                                _this.timer=1;
                                _this.codeTips="获取验证码"
                            }
                        },1000)
                    }
                }else{
                    _this.$vux.toast.text(res.msg, 'middle')
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
.gray{
  background-color: gray;
  color: #fff !important;
}
.forgetPwd{
  width:100vw;
  .input-box{
    background-color: #fff;
    >input{
      width:100%;
      height:1.733333rem;
      border: none;
      border-bottom: .013333rem solid #D8D6D9;
      padding:0 .426667rem;
      box-sizing: border-box;
      color: #D8D6D9;
    }
    .code-box{
      width: 90%;
      margin-left: 5%;
      height: 1.733333rem;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -ms-flex-align: center;
      align-items: center;
      input{
        height: 1.7rem;
        border: none;
        box-sizing: border-box;
        color: #333;
        width: 80%;
        text-indent: .25rem;
      }
      span{
        width: 26%;
        font-size: .4rem;
      }
      .send-code{
        width: 2.946667rem;
        height: .666667rem;
        border: 1px solid #44b7fc;
        text-align: center;
        line-height: .666667rem;
        color: #44b7fc;
        border-radius: .106667rem;
        letter-spacing: .05rem;
        font-size: .3rem;
      }
    }
  }
  .confirm-btn{
    width: 8.666667rem;
    height: 1.066667rem;
    border-radius: .2rem;
    font-size: .38rem;
    text-align: center;
    line-height: 1.066667rem;
    margin: 1.44rem auto 0;
    color: #fff;
    background-color: #009dfb;
    letter-spacing: .15rem;
  }
}
</style>
