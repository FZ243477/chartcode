<template>
    <div class="forgetPwd" ref="homePage" style="background-color: rgb(245, 245, 245);">
      <Header></Header>
<!--        <x-header class="title" :left-options="{backText: ''}">绑定手机号</x-header>-->
      <div class="input-box">
        <div class="line"></div>
        <div class="r_p_box">
          新手机号码：
          <input type="text" placeholder="请输入手机号" />
        </div>
        <div class="line"></div>
        <div class="code-box">
          <span >验证码：</span>
          <input type="text" placeholder="请输入验证码" class="code-input" />
          <div class="send-code">
            获取验证码
          </div>
        </div>
      </div>

<!--        <div class="input-box">-->
<!--            <input v-model="mobile" type="text" placeholder="请输入手机号">-->
<!--            <div class="code-box">-->
<!--                <input v-model="captcha" type="text" placeholder="请输入验证码" class="code-input">-->
<!--                <div class="send-code" @click="sms_send" :class="{gray:timer==0}">{{codeTips}}</div>-->
<!--            </div>-->
<!--        </div>-->
<!--      <div class="confirm-btn">确定</div>-->
        <div class="confirm-btn" @click="confirm">确定</div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import store from "store";
import {XHeader} from 'vux'
import {resetPwd,smsSend,changeMobile,userIndex} from '../../http/api.js'
export default {
    components:{
        XHeader,
        Header
    },
    data(){
        return{
            mobile:'',
            captcha:'',
            timer:1,
            codeTips:'获取验证码',
            userinfo:{},
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
        sms_send(){ //获取验证码
            let data={
                mobile:this.mobile,
                event:'changemobile'
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
                            console.log(time)
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
        },
        confirm(){  //确定
            changeMobile({
                mobile:this.mobile,
                captcha:this.captcha,
                token:store.get("userinfo").token
            }).then(res=>{
                console.log(res)
                if(res.code==1){
                    this.$vux.toast.text("绑定手机号成功", 'middle')
                    // store.remove("userinfo")
                    window.setTimeout(()=>{
                        this.$router.replace({path:'/classify'})
                    },500)
                }else{
                    this.$vux.toast.text(res.msg, 'middle')
                }
            })
        },
        GetUrlParam(paraName) {
            var url = document.location.toString();
            var arrObj = url.split("?");
            if (arrObj.length > 1) {
                var arrPara = arrObj[1].split("&");
                var arr;
                for (var i = 0; i < arrPara.length; i++) {
                    arr = arrPara[i].split("=");
                    if (arr != null && arr[0] == paraName) {
                        return arr[1];
                    }
                }
                return "";
            }
            else {
                return "";
            }
    　　}
    },
    created() {
        let urlToken=this.GetUrlParam('token');
        let token;
        if(store.get("userinfo") && store.get("userinfo").token){
            token=store.get("userinfo").token;
            this.userinfo = store.get("userinfo");
        }
        if(urlToken){
            userIndex({token:urlToken}).then(res=>{
                console.log(res)
                if(res.code==1){
                    store.set("userinfo",res.data.welcome)
                    this.userinfo=res.data.welcome;
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
