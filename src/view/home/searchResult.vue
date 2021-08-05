<template>
  <div class="searchResult">
    <div style="width:calc(100% - 0.8rem); background-color:#fff; position:fixed; z-index:99; padding-bottom:10px;">
      <div class="searchBox" @click="navToSearch">
        <img src="@/assets/img/home/search.png" />
        <div>{{params.keyword}}</div>
      </div>
    </div>
    <keep-alive>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" style="padding-top:55px;">
        <van-grid :column-num="2">
            <van-grid-item v-for="(item,index) in responseData" :key="index" @click="navToActivity(item)">
            <img v-lazy="item.url" style="width:149px; height:99px; object-fit:cover;" />
            </van-grid-item>
        </van-grid>
        </van-list>
    </keep-alive>
  </div>
</template>

<script>
import { Search, Swipe, SwipeItem, Tag, Grid, GridItem, List, Image} from "vant";
import store from "store";
import { Swiper, SwiperItem } from "vux";
import { index, loadMore, userIndex, newIndex, searchImg} from "../../http/api.js";
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
    Image
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
      finished: false
    };
  },
  methods: {
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
          this.loading = false;
          if (this.responseData.length == res.data.total) {
            this.finished = true;
          }
        } else {
          this.$vux.toast.text(res.msg, "middle");
        }
      });
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