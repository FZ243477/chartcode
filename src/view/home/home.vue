<template>
    <div class="home" style="margin-bottom:10px;" @click="closeIndex()">
      <div class="home_head">
        <div class="center_mask home_ref" ref="homePage" :class="{'display_show':navShow}" @click="goCloseNav">
          <div class="center_mask" style="display: block;" onclick="event.cancelBubble = true">
            <div class="nav_cancel">
              <img src="@/assets/img/home/cancel.png" class="cancel_img" @click="goCloseNav"/>
            </div>
            <div class="nav_border"></div>
            <div class="nav_tabs">
              <div v-if="userinfo.is_elme === 0" class="nav_li">ID:{{userinfo.nickname}}</div>
              <div v-if="noLogin == false" class="nav_li" @click="goSetting">个人中心</div>
              <div v-if="userinfo.is_elme === 0" class="nav_li" @click="goDownCard">下载卡</div>
              <div v-if="noLogin == false" class="nav_li" @click="goMine">下载记录 </div>
              <div v-if="noLogin == false" class="nav_li" @click="goFavorite">我的收藏</div>
              <div v-if="userinfo.is_elme === 0 && noLogin == false " class="nav_li" @click="logout">退出登录</div>
              <div v-if="noLogin" class="nav_li" @click="gologin">登录</div>
              <div v-if="noLogin" class="nav_li" @click="gore">注册</div>
            </div>
            <div class="nav_footer">
              <a :href="'tel:'+messageContent.phone" class="call_phone" style="width: 4rem;">
                <img  src="@/assets/img/home/phone.png" class="call_phone_img" /> 点击联系我们 </a>
            </div>
          </div>
        </div>
        <div class="head_top">
          <img src="@/assets/img/home/1.png" class="top_img1 left_slide_center_nav" @click="showGoUserDetail"/>
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
            <div type="button" class="search_submit" @click="navToSearchResult()">
              <span style="display: table-cell; vertical-align: middle;">
                <img src="@/assets/img/home/button_img.png" class="button_img" /></span>
            </div>
            <div class="history_box" :class="{'display_show':showSearchHistory}">
              <div class="history_box_content">
                <div class="history_box_title">
                  <span class="OLt9U">最近搜索</span>
                  <span class="b5nQ3" @click="deleteHistory">清除所有</span>
                </div>
                <div class="history_item">
                    <div :title="item" class="_4enLb" v-for="(item,index) in historyList" :key="index">
                      <span class="_34evo" @click="quickNav(item)">{{item}}</span>
                    </div>
                </div>
              </div>
            </div>
            <div style="clear: both;"></div>
          </div>
        </div>

      </div>

      <div class="manage_box"  v-if="userinfo.is_elme === 0 || Object.keys(userinfo).length==0" >
        目前拥有<span style="color:#009DFB;">344654</span>张图片，昨日新增<span style="color:#009DFB;">1421</span>张
        </br>
        <span style="color:#999999;">海量正版餐饮素材，祝您提升使用效率</span>
      </div>

      <div class="m_box" v-if="userinfo.is_elme === 0 || Object.keys(userinfo).length==0">
        <div class="m_box_content" align="center">
           <img  src="@/assets/img/home/f1.png" />
         <p style="margin-top: 0.2rem;">正版授权</p>
        </div>
        <div class="m_box_content" @click="goCreateLogo()" align="center">
          <img  src="@/assets/img/home/f2.png" />
          <p style="margin-top: 0.2rem;">LOGO制作</p>
        </div>
        <div class="m_box_content" align="center">
          <img  src="@/assets/img/home/f3.png" />
          <p style="margin-top: 0.2rem;">即买即用</p>
        </div>
        <div class="m_box_content" align="center">
          <img  src="@/assets/img/home/f4.png" />
          <p style="margin-top: 0.2rem;">价格低廉</p>
        </div>
      </div>

      <div class="hidden_title">
        <p class="hidden_title_p">热门分类</p>
        <div class="title_border"></div>
      </div>

      <div class="bl_1">
        <div class="bl_box" v-for="(item,index) in classifyList"  :key="index" @click="goClassify(index)">
          <p class="bl_box_title_p">{{item.title}}</p>
          <div class="bl_box_title"></div>
          <img class="class_img2" :src="item.url" lazy="loaded" />
        </div>
      </div>
      <a class="bl_more">查看更多</a>

      <div class="bl_2">
        <img class="bl_img2" :src="messageContent.logo" lazy="loaded" style="height: auto;" />
      </div>

      <div v-if="userinfo.is_elme === 0 || Object.keys(userinfo).length==0">
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
      </div>
      <div v-if="userinfo.is_elme === 1" style="height: 2rem;"></div>

      <div onclick="event.cancelBubble = true" :class="{'display_show':goUserDetailShow === true,'display_none':goUserDetailShow === false}"
           id="dis_requ_show" class="requirements_shadow"  @click="closeGoUserDetail"
           style="z-index: 999999;" ref="homePage2">
        <div onclick="event.cancelBubble = true" class="to_detail_alert">
          <img src="@/assets/img/home/todetail.png" alt="" class="to_detail_img"  @click="goUserDetail"/>
<!--          <i class="to_detail_i van-icon van-icon-cross"></i>-->
          <div style="width: 100%;height:auto;text-align: center">
            <img class="setting_cha" style="margin-top: 0rem" src="@/assets/img/setting/cha.png" @click="closeGoUserDetail">
          </div>
        </div>
      </div>

      <div class="backTop"  v-if="btnFlag" @click="backTop">
        <img src="@/assets/img/home/toTop.png"  />
      </div>
    </div>
</template>

<script>

    import Cookie from "js-cookie";
    import {Search, Swipe, SwipeItem, NavBar, Toast, Dialog} from 'vant';
    import store from "store";
    import { Swiper, SwiperItem,Loading } from "vux";
    import {index, loadMore, userIndex, newIndex, logOut,wxGetUserInfo,wxLogin,addSearchList} from "../../http/api.js";
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
              goUserDetailShow:false,
              code:'',
              btnFlag:false,
              noLogin:false
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
        methods: {
          changeFixed(clientHeight) {                        //动态修改样式
            this.$refs.homePage.style.height = clientHeight + 'px';
            this.$refs.homePage2.style.height = clientHeight + 'px';

          },
          showGoUserDetail(){
            if(this.goUserDetailShow === false){
              this.goUserDetailShow = true
            }
          },
          closeGoUserDetail(){
            this.goUserDetailShow = false
          },
          goCreateLogo(){
            window.location.href = 'https://phone.10tutu.cn/home';
          },
          goDownCard(){
            this.$router.push({ path: '/downCard' })
          },
          gologin(){
            this.$router.push({ path: '/login' })
          },
          gore(){
            this.$router.push({ path: '/register' })
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
          goNav(){
            this.navShow = true
          },
          goCloseNav(){
            this.navShow = false
          },
          goClassify(e){
            this.$router.push({ path: '/classify', query: { id: e } })
          },
          goMine(){
            this.$router.push({ path: '/mine' })
          },
          goFavorite(){
            this.$router.push({ path: '/favorite' })
          },
          goUserDetail(){
            this.$router.push({ path: '/userDetail' })
          },
          goSetting(){
            this.$router.push({ path: '/setting' })
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

            // 获取新首页数据
            getData() {

              newIndex().then(res => {
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
            },
          getCode () { // 非静默授权，第一次有弹框
            this.code = ''
            var local = window.location.href  // 获取页面url
            var appid = 'wxc98ef19e61e6b789'
            this.code = this.getUrlCode().code // 截取code
            if (this.code == null || this.code === '') { // 如果没有code，则去请求
              window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
            } else {
              // 你自己的业务逻辑
              wxGetUserInfo({
                login_type: 1,
                code: this.code
              }).then(res => {
                if (res.code == 1) {
                    store.remove("userinfo");
                    store.set("userinfo", res.data.userinfo)
                    this.userinfo = res.data.userinfo;
                } else {
                    this.$vux.toast.text(res.msg, 'middle')
                }
              })
            }

          },
          getUrlCode() { // 截取url中的code方法
            var url = location.search
            this.winUrl = url
            var theRequest = new Object()
            if (url.indexOf("?") != -1) {
              var str = url.substr(1)
              var strs = str.split("&")
              for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
              }
            }
            return theRequest
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
        created() {
            // 判断是否是微信浏览器
            let isWeiXin = () => { return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 }
            let urlToken = this.GetUrlParam('token');
            let token;
            if (store.get("userinfo") && store.get("userinfo").token) {
                token = store.get("userinfo").token;
                this.userinfo = store.get("userinfo");
              //console.log(this.userinfo,8885)
            }
            if (isWeiXin()) {
                store.set("isWeiXin", true)
              this.getCode()
              // if (!token) {
              //
              //     if (!urlToken) {
              //         window.location.href = "https://admin.shitutu.com/public/addons/third/index/connect?platform=wechat";
              //         return;
              //     } else {
              //         userIndex({ token: urlToken }).then(res => {
              //             console.log(res)
              //             if (res.code == 1) {
              //                 store.remove("userinfo");
              //                 store.set("userinfo", res.data.welcome)
              //                 this.userinfo = res.data.welcome;
              //             } else {
              //                 this.$vux.toast.text(res.msg, 'middle')
              //             }
              //         })
              //     }
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
          if(localStorage.getItem("historyList")){
            this.historyList = JSON.parse(localStorage.getItem("historyList"));
          }

          this.getData();
          if (!store.get("userinfo") || !store.get("userinfo").token) {
           this.noLogin = true
          }
        }
    };
</script>

<style lang="less">
input::placeholder {
  font-size: .4rem;
  font-family: Arial;
  letter-spacing: 0.02rem;
}
</style>
