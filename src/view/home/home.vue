<template>
    <div class="home" style="margin-bottom:10px;" @click="closeIndex()">
      <div class="home_head">
        <div class="center_mask home_ref" ref="homePage" :class="{'display_show':navShow}" >
          <div class="center_mask" style="display: block;">
            <div class="nav_cancel">
              <img src="@/assets/img/home/cancel.png" class="cancel_img" @click="goCloseNav"/>
            </div>
            <div class="nav_border"></div>
            <div class="nav_tabs">
              <!---->
              <div class="nav_li">
                个人中心
              </div>
              <!---->
              <div class="nav_li">
                下载记录
              </div>
              <div class="nav_li">
                我的收藏
              </div>
              <!---->
            </div>
            <div class="nav_footer">
              <a :href="'tel:'+messageContent.phone" class="call_phone" style="width: 4rem;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAC0ElEQVRYhc2ZTYhNYRjHf0bGGMlXyNDYTEQaXyuahixMImnSZFZWsyFlLLDCTmwoSbGYjJUp0cQ0IXaiJkkpCylNjIXyNRhj6q/n9p7pznXuvec995xz51fP7jzP/Z33nHPf531fJIXFMkl9kkYkHZE0s8h1mUbYj7U4yXyeSFo63WT3SRpTOMOSNkwX2W2SfhcRDfgmaUe1ZGfkjGE+8BpYQXnGgT3AowjXJkqNK3YmoqhRC/QDO7OWtZFdBHwA6jxzfwKtwIuU3P7DRrYjhqgxF7gHNKTsOInJtlWQvxzosSeUsFcoJrupwhq7gPaU/KZgsosTqNOUoFNR7ANThTW+A2uBjyl65rCRnaiwRlcWojjZkQryTwJ9CfqUxGTfx8w9D1zIyDOHyT6LkWeip1LwKYnJPvXM6amGKE72ITDmkXMrRZ+SmOwoMOCR01wFzxxB13XdI6czJZeyBP2sze1vgNUR83YDg1nLBiMr94VH5RIwu1qyRi/wNmLeGs+bS4aCdU57mTVYIYeqvRQf9JAdl7S3mrJNkkY9hH9VKHxQUmtcWYvDnq/DeIxXwnZ5buTVGJDUGEfW/tL6PYWNc5JqIojWSrobkv/VfTdeshYLJb2LIfxYUkOJuvWS7pepcdpX1mK924Xx5YukrpBRrnc3E4Wr7glHlrVoc+9kHF5J6pRUJ2mlpCHPGpd9ZXEbdnGF5fbQim34leNY4BH0BlGwfuA2MCfjecvWiFuBIR9ZXJK1kwvScwvlJbDFVxbXF9xxy+8s6Ygja8xzjc/+DGUf1ES4KIwfbsvoOPAnXcdJmuOObD7rgJvA5sT1pnIibvNRGLMkdbvpMg16bYJISjYIO9G5JmkiQdGLwdFW0rJBWPd0JcKBSik+SToQZwaLG0skHZX03EPys6SzdnxQ+JtJfGBRWQVsB1qAjUCjOx74Cwy7swnbcLGtfzuvmArwD87H7ePp0eXXAAAAAElFTkSuQmCC" class="call_phone_img" /> 点击联系我们 </a>
            </div>
          </div>
        </div>
        <div class="head_top">
          <img src="@/assets/img/home/1.png" class="top_img1 left_slide_center_nav" />
          <img src="@/assets/img/home/logo.2e38c60.png" class="top_img2" />
          <img src="@/assets/img/home/header.png" class="top_img3"  @click="goNav"/>
          <div style="clear: both;"></div>
        </div>

        <van-swipe :autoplay="3000" class="my-swipe"  indicator-color="white">
          <van-swipe-item v-for="(image, index) in images" :key="index" >
            <img v-lazy="image.cdn_images" style="max-height: 12rem;min-width: 100%;width: 100%;height: auto;" />
          </van-swipe-item>
        </van-swipe>

        <div class="tab_index" :class="{'display_show':showTab}">
          <div :id="item.id" :class="{'tab_active':choiceSearchTab === item.id}"
               class="tab_index_l" v-for="(item,index) in searchTab"  :key="index"  @click="chooseSearchTab(item.id,item.name)">
            {{item.name}}
          </div>
<!--          <div id="2" class="tab_index_l">-->
<!--            视频-->
<!--          </div>-->
<!--          <div id="3" class="tab_index_l tab_active">-->
<!--            设计-->
<!--          </div>-->
        </div>

        <div class="head_search">
          <div style="position: relative;">
            <div onclick="event.cancelBubble = true" id="3" class="head_s_l" @click="goShowTab()">
              <span>{{choiceSearchTabName}}</span>
              <i class="van-icon van-icon-arrow-up" :class="{'display_show':showTab === false}" style="margin: 0.15rem 0.5rem 0px 0rem; display: none; float: right;">
                <!----></i>
              <i class="van-icon van-icon-arrow-down"  :class="{'display_show':showTab}"  style="margin: 0.15rem 0.5rem 0px 0rem; display: none; float: right;">
                <!----></i>
            </div>
            <div class="head_s_l_bor"></div>
            <input type="text" name="s" onclick="event.cancelBubble = true"
                   v-model="searchValue"
                   @click="showSearchHistoryContent()"
                   @keyup.enter="navToSearchResult()"
                   @search="navToSearchResult()"
                   :placeholder="searchPlaceHolder" class="search_text" />
            <div type="button" class="search_submit">
              <span style="display: table-cell; vertical-align: middle;">
                <img src="data:image/png;base64,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" class="button_img" /></span>
            </div>
            <div class="history_box" :class="{'display_show':showSearchHistory}">
              <div class="history_box_content">
                <div class="history_box_title">
                  <span class="OLt9U">最近搜索</span>
                  <span class="b5nQ3" @click="deleteHistory">清除所有</span>
                </div>
                <div class="history_item">
                    <div :title="item" class="_4enLb" v-for="(item,index) in historyList" :key="index">
                      <span class="_34evo">{{item}}</span>
                    </div>
                </div>
              </div>
            </div>
            <div style="clear: both;"></div>
          </div>
        </div>

      </div>

      <div class="hidden_title">
        <p class="hidden_title_p">热门分类</p>
        <div class="title_border"></div>
      </div>

      <div class="bl_1">
        <div class="bl_box" v-for="(item,index) in classifyList"  :key="index">
          <p class="bl_box_title_p">{{item.title}}</p>
          <div class="bl_box_title"></div>
          <img class="class_img2" :src="item.url" lazy="loaded" />
        </div>
      </div>
      <a class="bl_more">查看更多</a>

      <div class="bl_2">
        <img class="bl_img2" :src="messageContent.logo" lazy="loaded" style="height: auto;" />
      </div>

      <div class="hidden_title">
        <p class="hidden_title_p">合作品牌</p>
        <div class="title_border"></div>
      </div>

      <div class="bl_3">
        <div class="bl_3_box" v-for="(item,index) in partner"  :key="index">
          <img :src="item.images" class="bl_img2"  lazy="loaded" />
        </div>
        <div style="clear: both;"></div>
      </div>

      <div class="footer">
        <div class="footer_content">
          <a :href="'tel:'+messageContent.phone" class="call_phone">
            <img src="@/assets/img/home/phone.png" class="call_phone_img" /> 点击联系我们 </a>
          <img class="footer_img1" :src="messageContent.pic2" lazy="loaded" />
          <div style="clear: both; margin-bottom: 0.3rem;"></div>
          <div class="footer_content_2">
            <p>{{messageContent.title}}</p>
            <p> {{messageContent.title1}}</p>
            <p>{{messageContent.title2}}</p>
            <p>{{messageContent.title3}}</p>
            <p>{{messageContent.title4}}</p>
          </div>
          <img class="footer_img2"  :src="messageContent.pic" lazy="loaded" />
          <div style="clear: both;"></div>
        </div>
      </div>

      <div v-if="userinfo.is_elme === 1" style="height: 2rem;"></div>

    </div>
</template>

<script>

    import Cookie from "js-cookie";
    import {Search, Swipe, SwipeItem, NavBar, Toast, Dialog} from 'vant';
    import store from "store";
    import { Swiper, SwiperItem,Loading } from "vux";
    import { index, loadMore, userIndex, newIndex } from "../../http/api.js";
    export default {
        components: {
            Swiper,
            SwiperItem,
            Loading,
            Search,
            Swipe,
            SwipeItem,
            NavBar,
            Toast,

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
                clientHeight: '',
                images: [
                  'https://img.yzcdn.cn/vant/apple-1.jpg',
                  'https://img.yzcdn.cn/vant/apple-2.jpg'
                ],
              classifyList:[],
              messageContent:'',
              partner:[],
              searchTab:[
                {id:1,name:'图片'},
                {id:2,name:'视频'},
                {id:3,name:'设计'},
              ],
              choiceSearchTab:1,
              choiceSearchTabName:'图片',
              searchPlaceHolder:'搜索美食图片',
              showTab:false,
              showSearchHistory:false,
              historyList:[],
              navShow:false,
            }
        },
        filters:{
            formatDigest(val){
                // var pattern = new RegExp('(<\w+>)+([\w\u4e00-\u9fcc]+)(</\w+>)+','i');
                var pattern = new RegExp('<p.*?>(.*?)<\/p>','i');
                var a = val.match(pattern)[1];
                return a.replace(/[^\u4e00-\u9fa5]/gi,"");
            },
            formatUrl(val){
                if(val){
                    return val;
                }else{
                    return 'https://image.shitutu.com'
                }
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
        methods: {
          changeFixed(clientHeight) {                        //动态修改样式
            console.log(clientHeight);
            this.$refs.homePage.style.height = clientHeight + 'px';
            console.log( this.$refs.homePage.style.height,' this.$refs.homePage.style.height')

          },
          chooseSearchTab(e,f){
            this.choiceSearchTab = e
            this.choiceSearchTabName = f
            this.searchPlaceHolder = '搜索美食' + this.choiceSearchTabName
          },
          closeIndex(){
            if(this.showTab === true){
              this.showTab = false
            }
            if(this.showSearchHistory === true){
              this.showSearchHistory = false
            }
          },
          goShowTab(){
            if(this.showTab === false){
              this.showTab = true
            }else{
              this.showTab = false
            }
            if( this.showSearchHistory === true){
              this.showSearchHistory = false
            }
          },
          showSearchHistoryContent(){
            if(this.showSearchHistory === false){
              this.showSearchHistory = true
            }else{
              this.showSearchHistory = false
            }
            if( this.showTab === true){
              this.showTab = false
            }
            // if(this.historyList.indexOf(this.searchValue)==-1){
            //   if(this.historyList.length==20){
            //     this.historyList.shift();
            //   }
            //   this.historyList.push(this.searchValue);
            //   localStorage.setItem("historyList",JSON.stringify(this.historyList));
            // }
          },
            // 跳转文章详情
            navToArticleDetail(value){
                Cookie.set('newsData', JSON.stringify(value), {expires: 60 * 60 * 24});
                this.$router.push({ path: '/articleDetail' })
            },
            // 跳转搜索页面
            navToSearch(){
                this.$router.push({ path: '/search' })
            },
            // 跳转上周热图
            navToHotImg() {
                this.$router.push({ path: '/hotImg' })
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
            // this.$router.push({ path: '/searchResult', query: { value: this.searchValue }  })
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
          goNav(){
            this.navShow = true
          },
          goCloseNav(){
            this.navShow = false
          },
            // 获取新首页数据
            getData() {
              newIndex().then(res => {
                  console.log(res);
                  if (res.code === 1) {
                  this.images = res.data.banner
                    this.classifyList = res.data.classify
                    this.messageContent = res.data.messageContent
                    this.partner = res.data.partner
                  } else {
                    this.$vux.toast.text(res.msg, "middle");
                  }
                })
            },
            // 跳转图片详情
            goDetail(e) {
                this.$router.push({ path: '/activityDetail', query: { id: e.id } })
            },
            // 跳转会员免费
            goVipfree(e) {
                if (e == 1) {
                    this.$router.push({ path: '/vipfree', query: { status: 1 } })
                } else if (e == 2) {
                    this.$router.push({ path: '/vipfree', query: { type: 1 } })
                }
            },
            loadVipfree() {
                this.$vux.loading.show({})
                this.vipPage++;
                loadMore({
                    type: 1,
                    page: this.vipPage
                }).then(res => {
                    console.log(res)
                    this.$vux.loading.hide()
                    if (res.code == 1) {
                        if (res.data.length == 0) {
                            this.vipPage--;
                            this.$vux.toast.text("无法加载更多", "middle");
                            this.showVipload = false;
                        } else {
                            this.responseData.free = this.responseData.free.concat(res.data)
                        }
                    } else {
                        this.$vux.toast.text(res.msg, "middle");
                    }
                })
            },
            loadMustbuy() {
                this.$vux.loading.show({})
                this.mustPage++;

                loadMore({
                    type: 2,
                    page: this.mustPage
                }).then(res => {  //加载更多
                    console.log(res)
                    this.$vux.loading.hide()
                    if (res.code == 1) {
                        if (res.data.length == 0) {
                            this.mustPage--;
                            this.$vux.toast.text("无法加载更多", "middle");
                            this.showMustload = false;
                        } else {
                            this.responseData.mustBuy = this.responseData.mustBuy.concat(res.data)
                        }
                    } else {
                        this.$vux.toast.text(res.msg, "middle");
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
            // 判断是否是微信浏览器
            let isWeiXin = () => { return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 }
            let urlToken = this.GetUrlParam('token');
            let token;
            if (store.get("userinfo") && store.get("userinfo").token) {
                token = store.get("userinfo").token;
                this.userinfo = store.get("userinfo");
            }
          console.log(this.userinfo,888)
            if (isWeiXin()) {
                store.set("isWeiXin", true)
                if (!token) {
                    if (!urlToken) {
                        window.location.href = "https://admin.shitutu.com/public/addons/third/index/connect?platform=wechat";
                        return;
                    } else {
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
          if(localStorage.getItem("historyList")){
            this.historyList = JSON.parse(localStorage.getItem("historyList"));
          }
        }
    };
</script>

<style lang="less">

</style>
