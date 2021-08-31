<template>
    <div class="search" ref="homePage">
      <div  class="tab_index_2 ">
        <div  id="1" class="tab_index_l tab_active">
          图片
        </div>
        <div id="2" class="tab_index_l">
          视频
        </div>
        <div id="3" class="tab_index_l">
          设计
        </div>
      </div>
      <div class="search_top" style="position: relative;">
        <div  id="1" class="head_s_l" style="width: 24%; line-height: 0.3rem; background-color: rgb(247, 248, 250); border-radius: 0.1rem 0px 0px 0.1rem; padding: 0.14rem 0px 0.22rem 0.1rem;">
          <span data-v-41b4adeb="">图片</span>
          <i class="van-icon van-icon-arrow-up" style="margin: 0.18rem 0.5rem 0px 0rem; display: none; float: right;">
          </i>
          <i class="van-icon van-icon-arrow-down display_show" style="margin: 0.18rem 0.5rem 0px 0rem; display: none; float: right;">
          </i>
        </div>
        <van-search v-model="searchValue" placeholder="继续搜索您需要的内容"
                    style="width: 74%;padding:0px;float: right;"
                    show-action  @search="navToSearchResult">
            <div slot="action" @click="navToSearchResult">搜索</div>
        </van-search>
        <div style="clear: both;"></div>
      </div>
        <div class="historyBox">
            <div class="historyTitle">
                <span>搜索历史</span>
                <img src="@/assets/img/home/delte.png" class="deleteBtn" @click="deleteHistory">
            </div>
            <div class="tagBox" style="">
                <van-tag plain style="margin-right:5px; margin-bottom:5px;" v-for="(item,index) in historyList" :key="index" @click="quickNav(item)">{{item}}</van-tag>
            </div>
        </div>
    </div>
</template>

<script>
    import { Search, Swipe, SwipeItem,Tag,Dialog } from 'vant';
    import store from "store";
    import { Swiper, SwiperItem } from "vux";
    import { index, loadMore, userIndex, newIndex,addSearchList } from "../../http/api.js";
    export default {
        components: {
            Swiper,
            SwiperItem,
            Search,
            Swipe,
            SwipeItem,
            Tag,
            Dialog
        },
        data() {
            return {
                userinfo: {},
                responseData: {},
                vipPage: 0,
                mustPage: 0,
                showVipload: true,
                showMustload: true,
                searchValue: "",
                historyList:[],
                clientHeight: '',
            };
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
        methods: {
          changeFixed(clientHeight) {                        //动态修改样式
            this.$refs.homePage.style.height = clientHeight + 'px';

          },
            // 跳转搜索结果页
            navToSearchResult(){
                if(this.historyList.indexOf(this.searchValue)==-1){
                    if(this.historyList.length==20){
                        this.historyList.shift();
                    }
                    this.historyList.push(this.searchValue);
                    localStorage.setItem("historyList",JSON.stringify(this.historyList));
                }
              let params={
                words:this.searchValue,
                id:this.userinfo.id
              }
              addSearchList(params).then(res=>{
                if(res.code==1){

                }else{
                  this.$vux.toast.text(res.msg, 'middle')
                }
              })
                this.$router.push({ path: '/searchResult', query: { value: this.searchValue }  })
            },
            // 快捷跳转
            quickNav(item){
              let params={
                words:item,
                id:this.userinfo.id
              }
              addSearchList(params).then(res=>{
                if(res.code==1){

                }else{
                  this.$vux.toast.text(res.msg, 'middle')
                }
              })
                this.$router.push({ path: '/searchResult', query: { value: item }  })
            },
            //删除搜索记录
            deleteHistory(){
                Dialog.confirm({
                    title: '提示',
                    message: '是否全部删除'
                }).then(() => {
                    localStorage.removeItem('historyList');
                    this.historyList=[];
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
            if(localStorage.getItem("historyList")){
                this.historyList = JSON.parse(localStorage.getItem("historyList"));
            }
        }
    };
</script>

<style lang="less" scoped>
    .search{
        font-size:12px;
        .historyBox{
          width: 90%;
          margin-top: .4rem;
          margin-left: 5%;
            .historyTitle{
                display:flex; justify-content: space-between; align-items:center; font-size:16px;
                .deleteBtn{width:18px; object-fit: cover;}
            }
            .tagBox{margin-top:10px;}
        }
    }
    input::-webkit-input-placeholder{ /*WebKit browsers*/

      font-size: .4rem !important;

    }

    input::-ms-input-placeholder{ /*Internet Explorer*/

      font-size: .4rem !important;

    }

</style>
