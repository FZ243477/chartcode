<template>
  <div >
    <div>
      <div class="center_mask home_ref" ref="homePage"  :class="{'display_show':navShow}" @click="goCloseNav">
        <div class="center_mask" style="display: block;" onclick="event.cancelBubble = true">
          <div class="nav_cancel">
            <img src="@/assets/img/home/cancel.png" class="cancel_img" @click="goCloseNav"/>
          </div>
          <div class="nav_border"></div>
          <div class="nav_tabs">
            <div v-if="userinfo.is_elme === 0" class="nav_li">ID:{{userinfo.nickname}}</div>
            <div v-if="noLogin == false" class="nav_li"  @click="goSetting">个人中心</div>
            <div v-if="userinfo.is_elme === 0" class="nav_li" @click="goDownCard">下载卡</div>
            <div v-if="noLogin == false" class="nav_li" @click="goMine">下载记录 </div>
            <div v-if="noLogin == false" class="nav_li" @click="goFavorite">我的收藏</div>
            <div v-if="userinfo.is_elme === 0" class="nav_li" @click="logout">退出登录</div>
            <div v-if="noLogin" class="nav_li" @click="gologin">登录</div>
            <div v-if="noLogin" class="nav_li" @click="gore">注册</div>
          </div>
          <div class="nav_footer">
            <a :href="'tel:'+messageContent.phone" class="call_phone" style="width: 4rem;">
              <img src="@/assets/img/home/phone.png" class="call_phone_img" /> 点击联系我们 </a>
          </div>
        </div>
      </div>
        <div style="position: fixed;
    width: 100%;z-index: 2001;
    top: 0;
    left: 0;">
      <div  class="header" style="position: relative;" >
        <img src="@/assets/img/header/header_return_img.png" class="header_return_img" @click="goBack"/>
        <img src="@/assets/img/home/logo2.f81bff3.png" class="header_logo_img" @click="goHome" />
        <img src="@/assets/img/header/my.png" class="header_my_img"  @click="goNav" />
        <img src="@/assets/img/header/search.png" class="header_search_img" @click="goSearch"/>
        <div style="clear: both;"></div>
      </div>
    <div class="solid_border" style="width: 100%; margin-left: 0px;"></div>
        </div>
      <div style="width: 100%;height:1.5rem;"></div>
    </div>
    <div class="backTop"  v-if="btnFlag" @click="backTop">
      <img src="@/assets/img/home/toTop.png"  />
    </div>
  </div>
</template>
<script>
import store from "store";
import {userIndex,logOut,newIndex} from "../http/api";

export default{
  data(){
    return {
      userinfo: {},
      clientHeight: '',
      navShow:false,
      messageContent:'',
      btnFlag:false,
      noLogin:false
    }
  },
  mounted() {
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`          //document.body.clientWidth;
    //console.log(self.clientHeight);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };
    window.addEventListener('scroll', this.scrollToTop)
  },

  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
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
    goNav(){
      this.navShow = true
    },
    goCloseNav(){
      this.navShow = false
    },
    gologin(){
      this.$router.push({ path: '/login' })
    },
    gore(){
      this.$router.push({ path: '/register' })
    },
    goSearch(){
      this.$router.push({ path: '/search' })
    },
    goHome(){
      this.$router.push({ path: '/home' })
    },
    goBack(){
      this.$router.go(-1);//返回上一层
    },
    goMine(){
      this.$router.push({ path: '/mine' })
    },
    goFavorite(){
      this.$router.push({ path: '/favorite' })
    },
    goDownCard(){
      this.$router.push({ path: '/downCard' })
    },
    goSetting(){
      this.$router.push({ path: '/setting' })
    },
    goUserDetail(){
      this.$router.push({ path: '/userDetail' })
    },
    logout(){ //退出登录
      let params={
        token:store.get("userinfo").token
      }
      logOut(params).then(res=>{
        if(res.code==1){
          this.$vux.toast.text('退出登录成功', 'middle')
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
    },
    backTop () {
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },
    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop () {
      const that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 0) {
        that.btnFlag = true
      } else {
        that.btnFlag = false
      }
    }
  },
  created(){
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
          console.log(res)
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
    if (!store.get("userinfo") || !store.get("userinfo").token) {
      this.noLogin = true
    }
  },

}
</script>

<style lang="less">

</style>
