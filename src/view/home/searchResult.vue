<template>
  <div class="searchResult">
    <Header></Header>
    <div style="width: 100%; background-color: rgb(255, 255, 255); position: fixed;z-index: 2001">
    <div class="search_desc">
      <span class="search_desc_text">搜索关键词：<span class="color_blue">{{params.keyword}}</span></span>
      <span class="search_desc_text" style="margin-left: 15px;">共<span class="color_blue">{{total}}</span>张图片</span>
    </div>
    </div>
    <div class="no_search" v-if="total === 0">
      <img src="@/assets/img/home/noSearch.png" class="no_search_img" />
      <p class="no_search_p">找不到图片？联系客服17794558879（微信）或提交您的需求，我们尽快为您研发上传 </p>
      <div class="no_search_div" @click="feedBack">
        提交您的需求
      </div>
    </div>
<!--    <div style="width:calc(100% - 0.8rem); background-color:#fff; position:fixed; z-index:99; padding-bottom:10px;">-->
<!--      <div class="searchBox" @click="navToSearch">-->
<!--        <img src="@/assets/img/home/search.png" />-->
<!--        <div>{{params.keyword}}</div>-->
<!--      </div>-->
<!--    </div>-->

    <keep-alive>
        <van-list v-model="loading"  :finished="finished" finished-text="没有更多了" @load="onLoad" style="padding-top: 0.4rem;">
        <van-grid :column-num="2" style="
    column-count: 2;
    column-gap: 0.13rem;
    width: 100%;
    margin-top: 0.7rem;
    z-index: 2000;
    background-color: rgb(255, 255, 255);
">
            <van-grid-item v-for="(item,index) in responseData" :key="index" @click="navToActivity(item)" style="flex-basis: 25%;
    break-inside: avoid;
    margin-bottom: 0.05rem;
    height: auto;">
            <img v-lazy="item.url" style="width: 100%;
    height: auto;
    border-radius: 5px;" />
            </van-grid-item>
        </van-grid>
        </van-list>
    </keep-alive>
<!--   <img v-if="btnFlag" src="@/assets/img/home/backTop.png" alt="" class="gotop " style="" @click="backTop">-->


    <div id="dis_requ_show" style="z-index: 2001" class="requirements_shadow"  :class="{'display_show':feedShow === true,'display_none':feedShow === false}"
         ref="homePage" @click="closeFeed">
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
      </div>
    </div>
   </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { Search, Swipe, SwipeItem, Tag, Grid, GridItem, List, Image} from "vant";
import store from "store";
import { Swiper, SwiperItem } from "vux";
import { index, loadMore, userIndex, newIndex, feedback,searchImg} from "../../http/api.js";
export default {
  components: {
    Swiper,
    SwiperItem,
    Search,
    Swipe,
    SwipeItem,
    Tag,
    Grid,
    GridItem,
    List,
    Image,
    Header
  },
  data() {
    return {
      userinfo: {},
      responseData: [],
      vipPage: 0,
      mustPage: 0,
      showVipload: true,
      showMustload: true,
      searchValue: "",
      params: {
        keyword: "",
        page: 0,
        page_size: 15
      },

      list: [],
      loading: false,
      finished: false,
      total:0,
      btnFlag:false,
      feedShow:false,
      clientHeight: '',
      phone:'',
      name:'',
      content:'',
      messageContent:'',
    };
  },

  watch: {

    '$route' (to, from) {
      let query = this.$route.query;
      this.params.keyword = query.value;
      this.responseData = []
      this.params.page = 0
      if( this.params.keyword === undefined){
        console.log(this.params.keyword)
      }else{
        console.log(this.params.keyword)
        this.getData()
      }

    },
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function () {
      this.changeFixed(this.clientHeight)
    },

  },
  mounted () {// 获取浏览器可视区域高度
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

  methods: {
    changeFixed(clientHeight) {                        //动态修改样式
      console.log(clientHeight);
      this.$refs.homePage.style.height = clientHeight + 'px';
      console.log( this.$refs.homePage.style.height,' this.$refs.homePage.style.height')

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
      if (that.scrollTop > 60) {
        that.btnFlag = true
      } else {
        that.btnFlag = false
      }
    },
    // 上拉加载
    onLoad() {
      this.getData();
    },
    // 跳转搜索页面
    navToSearch() {
      this.$router.back(-1);
    },
    // 获取新首页数据
    getData() {
      this.params.page++;
      searchImg(this.params).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.responseData = this.responseData.concat(res.data.data);
          this.total = res.data.total
          this.loading = false;
          if (this.responseData.length == res.data.total) {
            this.finished = true;
          }
        } else {
          this.$vux.toast.text(res.msg, "middle");
        }
      });
      newIndex().then(res => {
        if (res.code === 1) {
          this.messageContent = res.data.messageContent
        } else {
          this.$vux.toast.text(res.msg, "middle");
        }
      })
    },
    // 意见反馈
    feedBack(){
      if(this.feedShow === false){
        this.feedShow = true
      }
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
          console.log(res.msg)
          this.$vux.toast.text(res.msg, 'middle')
        }
      })
    },
    closeFeed(){
      this.feedShow = false
    },
    navToActivity(e) {
      this.$router.push({ path: "/activityDetail", query: { id: e.id } });
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
      } else {
        return "";
      }
    }
  },
  created() {
    // 判断是否是微信浏览器
    let query = this.$route.query;
    this.params.keyword = query.value;
    let isWeiXin = () => {
      return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
    };
    let urlToken = this.GetUrlParam("token");
    let token;
    if (store.get("userinfo") && store.get("userinfo").token) {
      token = store.get("userinfo").token;
      this.userinfo = store.get("userinfo");
    }
    if (isWeiXin()) {
      store.set("isWeiXin", true);
      if (!token) {
        if (!urlToken) {
          window.location.href =
            "https://admin.shitutu.com/public/addons/third/index/connect?platform=wechat";
          return;
        } else {
          userIndex({ token: urlToken }).then(res => {
            console.log(res);
            if (res.code == 1) {
              store.remove("userinfo");
              store.set("userinfo", res.data.welcome);
              this.userinfo = res.data.welcome;
            } else {
              this.$vux.toast.text(res.msg, "middle");
            }
          });
        }
      }
    } else {
      store.set("isWeiXin", false);
      if (urlToken) {
        userIndex({ token: urlToken }).then(res => {
          console.log(res);
          if (res.code == 1) {
            store.remove("userinfo");
            store.set("userinfo", res.data.welcome);
            this.userinfo = res.data.welcome;
          } else {
            this.$vux.toast.text(res.msg, "middle");
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.searchResult {
  padding: 0 0.4rem 1.17rem;
  box-sizing: border-box;
  position: relative;
  .searchBox {
    display: flex;
    align-items: center;
    margin-top: 10px;
    color: #808080;
    width: 100%;
    border-radius: 30px;
    background-color: rgb(230, 230, 230);
    padding: 5px 15px;
    box-sizing: border-box;
    img {
      width: 20px;
    }
    div {
      margin-left: 10px;
    }
  }
}
</style>
