<template>
    <div class="setting" ref="homePage" style="background-color: rgb(242, 243, 244);">
      <Header></Header>
<!--        <x-header class="title" :left-options="{backText: ''}">设置</x-header>-->
        <div class="list" style="background-color: rgb(255, 255, 255);">
          <div class="line"></div>
          <div class="list-item" v-if="userinfo.is_elme === 0" @click="goUserDetail" >
            <div>个人资料</div>
            <img src="@/assets/img/home/right2.png">
          </div>
          <div class="list-item" v-if="userinfo.is_elme === 0" @click="goResetPhone" >
            <div>修改手机号码</div>
            <img src="@/assets/img/home/right2.png">
          </div>
          <div class="list-item" v-if="userinfo.is_elme === 0" @click="goResetPwd" >
            <div>修改密码</div>
            <img src="@/assets/img/home/right2.png">
          </div>
          <div class="list-item" v-if="userinfo.is_elme === 0" @click="goQrCodeShow" >
            <div>关注公众号</div>
            <img src="@/assets/img/home/right2.png">
          </div>
          <div class="list-item" @click="copyrightNotice" style="border-bottom: none;">
                <div>版权申明</div>
                <img src="@/assets/img/home/right2.png">
          </div>
          <div class="line"></div>
            <div class="list-item" @click="afterSales">
                <div>售后问题</div>
                <img src="@/assets/img/home/right2.png">
            </div>
            <div class="list-item" @click="feedBack">
                <div>意见反馈</div>
                <img src="@/assets/img/home/right2.png">
            </div>
            <div class="list-item" @click="serviceAgreement">
                <div>服务协议</div>
                <img src="@/assets/img/home/right2.png">
            </div>
            <div class="list-item" style="border-bottom:none;" @click="complaint">
                <div>投诉侵权</div>
                <img src="@/assets/img/home/right2.png">
            </div>
            <div class="line"></div>
<!--            <div class="list-item" style="border-bottom:none;" @click="goResetPwd">-->
<!--                <div>修改密码</div>-->
<!--                <img src="@/assets/img/home/right2.png">-->
<!--            </div>-->
<!--            <div class="line"></div>-->
<!--            <div class="login-out" @click="logout">退出登录</div>-->
        </div>

      <div id="dis_requ_show" style="z-index: 2001" class="requirements_shadow"  :class="{'display_show':feedShow === true,'display_none':feedShow === false}"
            ref="homePage2" @click="closeFeed">
        <div  onclick="event.cancelBubble = true" class="requirements demand-wrapper-commit">
          <div class="requirements_title">
            提交您的需求
          </div>
          <div class="van-cell-group van-hairline--top-bottom">
            <div class="input_text van-cell van-field">
              <div class="van-cell__value van-cell__value--alone van-field__value">
                <div class="van-field__body">
                  <input type="text" placeholder="请留下您的姓名......" v-model="name" class="van-field__control" />
                </div>
              </div>
            </div>
          </div>
          <div class="van-cell-group van-hairline--top-bottom">
            <div class="input_text van-cell van-field">
              <div class="van-cell__value van-cell__value--alone van-field__value">
                <div class="van-field__body">
                  <input type="text" placeholder="请留下您的电话......" v-model="phone" class="van-field__control" />
                </div>
              </div>
            </div>
          </div>
          <div class="van-cell-group van-hairline--top-bottom">
            <div class="input_textarea van-cell van-field van-field--min-height">
              <div class="van-cell__value van-cell__value--alone van-field__value">
                <div class="van-field__body">
                  <textarea placeholder="请输入您的需求......" v-model="content" class="van-field__control"></textarea>
                </div>
              </div>
            </div>
          </div>
          <a href="#" class="down_img" style="margin-top: 0.3rem;" @click="saveFeedBack">提交</a>
          <a :href="'tel:'+messageContent.phone" class="down_img" style="margin-top: 0.3rem; background: rgb(244, 244, 244); color: rgb(0, 157, 250);" @>联系我们</a>
          <div style="width: 100%;height:auto;text-align: center">
            <img class="setting_cha" src="@/assets/img/setting/cha.png" @click="closeFeed">
          </div>
        </div>
      </div>

      <div onclick="event.cancelBubble = true"  :class="{'display_show':qrCodeShow === true,'display_none':qrCodeShow === false}"
           class="requirements_shadow" style="z-index: 999999; height: 736px;" @click="closeQrcode">
        <div onclick="event.cancelBubble = true" class="to_account_alert">
          <div alt="" class="to_account_img" :style='backStyle' ></div>
          <img src="@/assets/img/setting/guanzhu.png" alt="" class="to_account_text" />
          <img class="to_account_QRCODE" data-src="https://image.shitutu.com/uploads/20200801/65e4449235808ecacc8348cc3c195528.jpg_artwork" src="https://image.shitutu.com/uploads/20200801/65e4449235808ecacc8348cc3c195528.jpg_artwork" lazy="loaded" />
          <div class="confirm-btn" style="margin: 0.34rem auto 0px;">
            长按二维码保存
          </div>
          <i class="to_detail_i van-icon van-icon-cross" style="margin-top: 1.4rem !important;">
            <!----></i>
        </div>
      </div>

    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import store from "store";
import { Dialog,Toast } from 'vant';
import {XInput,Group,XButton,XHeader} from 'vux'
import {logOut, newIndex, feedback, userIndex} from '../../http/api.js'
export default {
    components:{
        XInput,
        Group,
        XButton,
        XHeader,
        Dialog,
        Header,
      Toast
    },
    data(){
        return{
          userinfo: {},
          clientHeight: '',
          backStyle:{
            backgroundImage:
              "url(" + require("@/assets/img/setting/gongzhong.png") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition:"center bottom"
          },
          qrCodeShow:false,
          feedShow:false,
          messageContent:'',
          phone:'',
          name:'',
          content:'',
        }
    },
  mounted() {
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`          //document.body.clientWidth;
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
        this.$refs.homePage.style.height = clientHeight + 'px';
        this.$refs.homePage2.style.height = clientHeight + 'px';

      },
      goQrCodeShow(){
        if(this.qrCodeShow === false){
          this.qrCodeShow = true
        }
      },
      goUserDetail(){
        this.$router.push({ path: '/userDetail' })
      },
      goResetPhone(){
        this.$router.push({ path: '/resetPhone' })
      },

      closeQrcode(){
        this.qrCodeShow = false
      },
      saveFeedBack(){
        let params={
          user_id:this.userinfo.id,
          name:this.name,
          phone:this.phone,
          content:this.content,
        }
        feedback(params).then(res=>{
          if(res.code==1){
            this.$vux.toast.text(res.msg, 'middle')
            this.feedShow = false
          }else{
            this.$vux.toast.text(res.msg, 'middle')
          }
        })
      },
        // 版权申明
        copyrightNotice(){
            this.$router.push({ path: "/copyrightNotice" });
        },
        // 售后问题
        afterSales(){
            Dialog.alert({
                message: `工作日：9：00-17:00
                    电话：0571-88693669`
            }).then(() => {

            });
        },
        // 意见反馈
        feedBack(){
          if(this.feedShow === false){
            this.feedShow = true
          }
            // Dialog.alert({
            //     message: `邮箱：yes@tingzhilan.cn 邮件内容：【姓名】+【手机】+【问题】
            //                 我们会在3个工作日内与您取得联系`
            // }).then(() => {
            //
            // });
        },
      closeFeed(){
        this.feedShow = false
      },
        // 服务协议
        serviceAgreement(){
            this.$router.push({ path: "/serviceAgreement" });
        },
        // 投诉侵权
        complaint(){
            Dialog.alert({
                message: `邮箱：yes@tingzhilan.cn`
            }).then(() => {

            });
        },
        tipToast(){
            this.$vux.toast.text('正在开发中', 'middle')
        },
        goResetPwd(){   //跳转修改密码页面
            this.$router.push({ path: "/resetPwd" });
        },
        logout(){ //退出登录
            let params={
                token:store.get("userinfo").token
            }
            logOut(params).then(res=>{
                if(res.code==1){
                    this.$vux.toast.text('退出登录成功', 'middle')
                    store.remove("userinfo")
                    window.setTimeout(()=>{
                        this.$router.replace({path:'/login'})
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
      },
      getData(){
        newIndex().then(res => {
          if (res.code === 1) {
            this.messageContent = res.data.messageContent
          } else {
            this.$vux.toast.text(res.msg, "middle");
          }
        })
      }
    },
  created() {
    // 判断是否是微信浏览器
    let isWeiXin = () => { return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 }
    let urlToken = this.GetUrlParam('token');
    let token;
    if (store.get("userinfo") && store.get("userinfo").token) {
      token = store.get("userinfo").token;
      this.userinfo = store.get("userinfo");
    }
    if (isWeiXin()) {
      store.set("isWeiXin", true)
      if (!token) {
        if (!urlToken) {
          window.location.href = "https://admin.shitutu.com/public/addons/third/index/connect?platform=wechat";
          return;
        } else {
          userIndex({ token: urlToken }).then(res => {
            if (res.code == 1) {
              store.remove("userinfo");
              store.set("userinfo", res.data.welcome)
              this.userinfo = res.data.welcome;

            } else {
              this.$vux.toast.text(res.msg, 'middle')
            }
          })
        }
      }
    } else {
      store.set("isWeiXin", false)
      if (urlToken) {
        userIndex({ token: urlToken }).then(res => {
          if (res.code == 1) {
            store.remove("userinfo");
            store.set("userinfo", res.data.welcome)
            this.userinfo = res.data.welcome;
          } else {
            this.$vux.toast.text(res.msg, 'middle')
          }
        })
      }
    }
    this.getData();
  }
}
</script>

<style lang="less" scoped>
    .line{
        width: 100vw;
        height:.266667rem;
        background-color:#F2F3F4;
    }
    .setting{
        width: 100vw;
        .list{
            .list-item{
              height: 1.6rem;
              border-bottom: .013333rem solid #d8d6d9;
              box-sizing: border-box;
              font-size: .426667rem;
              color: #31333b;
              display: -ms-flexbox;
              display: flex;
              -ms-flex-pack: justify;
              justify-content: space-between;
              -ms-flex-align: center;
              align-items: center;
              width: 86%;
              margin-left: .7rem;
                >img{
                    width: 0.2rem;
                }
            }
            .login-out{
                height: 1.6rem;
                font-size: .373333rem;
                text-align: center;
                line-height: 1.6rem;
                border-bottom: .013333rem solid #D8D6D9;
            }
        }
    }
</style>
