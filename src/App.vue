<template>
  <div id="app">
    <!-- <Tabbar></Tabbar> -->
    <navigation>
        <router-view></router-view>
    </navigation>
  </div>
</template>

<script>
import store from "store";
import {userIndex} from "./http/api";

export default {
  name: 'app',
  components:{

  },
  data(){
    return {
      userinfo: {},
    }
  },
  methods:{
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
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
  mounted() {
    if (this._isMobile()) {

     //  console.log(this.userinfo,888654)
     // console.log("手机端");
    //  this.$router.replace('/m_index');
    } else {
      if(this.userinfo.is_elme === 1){

        window.location.href = 'https://web.shitutu.com/?token='+this.userinfo.token;
      }else{
        window.location.href = 'https://v.shitutu.com/';
      }

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
      // store.set("isWeiXin", true)
      // if (!token) {
      //   if (!urlToken) {
      //     window.location.href = "https://admin.shitutu.com/public/addons/third/index/connect?platform=wechat";
      //     return;
      //   } else {
      //     userIndex({ token: urlToken }).then(res => {
      //       console.log(res)
      //       if (res.code == 1) {
      //         store.remove("userinfo");
      //         store.set("userinfo", res.data.welcome)
      //         this.userinfo = res.data.welcome;
      //
      //       } else {
      //         this.$vux.toast.text(res.msg, 'middle')
      //       }
      //     })
      //   }
      // }
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
  }
}
</script>

<style lang="less">

</style>
