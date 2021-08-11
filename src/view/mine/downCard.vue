<template>
  <div class="mine">
    <Header></Header>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <template #loosing>
        <div style="color:#fff;">释放即可刷新</div>
      </template>
      <template #loading>
        <div style="color:#fff;">
          <van-loading type="spinner" size="24px" />加载中
        </div>
      </template>
      <div class="content">
        <div class="down_card_content">

          <div class="user_message" :style='backStyle'
               style="">
            <div class="user_content">
              <img class="user_logo"  :src="userinfo.avatar" lazy="loaded" />
              <div class="u_l_1">
                <p class="u_l_p1">ID:{{userinfo.nickname}}</p>
                <p class="u_l_p2">已使用食图图的第{{userinfo.user_day}}天</p>
              </div>
              <div style="clear: both;"></div>
              <div class="use_m_l">
                <img src="@/assets/img/downCard/free.png" class="user_icon" />
                <p > 剩余下载次数 <span style="color: rgb(0, 157, 251);">{{userinfo.free_download_num}}张</span></p>
              </div>
              <div class="use_m_r">
                <img  src="@/assets/img/downCard/down.png" class="user_icon" />
                <p> 已下载次数 <span style="color: rgb(0, 157, 251);">{{userinfo.download_num}}张</span></p>
              </div>
            </div>
          </div>

          <p class="down_title">购买下载卡</p>
          <p class="down_time">开通后可下载相应数量图片，有效期为365天</p>

          <div style="justify-content: space-between; width: 90%; display: flex; margin-top: 0.3rem;">
            <div class="buy_card_box " :class="{'selected':cardNum === index}" v-for="(item,index) in vipRsp.list"
                 :key="index" @click="chioceCard(index,item.id)">
              <p class="b_c_b_1">{{item.download_num}}张</p>
              <p class="b_c_b_2"><span style="font-size: 0.4rem;">￥</span>{{item.price}}</p>
              <del class="b_c_b_3">
                ￥{{item.price+10}}
              </del>
              <p class="b_c_b_4">立省10元</p>
            </div>
          </div>

<!--          <pay-mode :syncType.sync="payType"></pay-mode>-->
        <div class="order_btn" style="width: 90%;">
          <div class="pay-wrapper" style="text-align: center">
            <div class="pay-wrapper-mode">
              <span class="pay_span">支付方式</span>
            </div>
            <ul class="pay-wrapper-list">
              <div  class="solid_border" style="width: 100%; margin-left: 0px; padding-bottom: 0px;"></div>
              <li class="pay-wrapper-list-items" @click="payType=1" v-if="!isWeixin">
                <div class="pay-wrapper-list-items-left">
                  <img class="payment-icon" src="@/assets/img/membership/zfb.png" />
                  <div class="payment-title">支付宝支付</div>
                </div>
                <img class="payment-select" v-show="payType!=1" src="@/assets/img/mine/select.png" />
                <img class="payment-select" v-show="payType==1" src="@/assets/img/mine/selected.png" />
              </li>
              <li class="pay-wrapper-list-items" @click="payType=2">
                <div class="pay-wrapper-list-items-left">
                  <img class="payment-icon" src="@/assets/img/membership/wx.png" />
                  <div class="payment-title">微信支付</div>
                </div>
                <img class="payment-select" v-show="payType!=2" src="@/assets/img/mine/select.png" />
                <img class="payment-select" v-show="payType==2" src="@/assets/img/mine/selected.png" />
              </li>
            </ul>
          </div>
          <div class="pay-btn" @click="payNow">立即支付{{payPrice}}元</div>

<!--            <div class="pay-btn" @click="payNow" v-show="vipType">立即支付</div>-->
        </div>

<!--        <div class="head">-->
<!--          <div class="set-wrapper">-->
<!--            <span class="iconfont set-btn" @click="goSetting">&#xe61d;</span>-->
<!--          </div>-->
<!--          <div class="user-wrapper" v-if='userinfo.is_elme !== 1'>-->
<!--            <div class="user-wrapper-box">-->
<!--              <img class="avatar-img" v-lazy="userinfo.avatar" />-->
<!--              <div class="user-info">-->
<!--                <div>{{userinfo.nickname}}</div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <span class="iconfont" @click="goResetPerson">&#xe65e;</span>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="download-wrapper">-->
<!--          <div class="num-wrapper">-->
<!--                        <span>-->
<!--                            下载-->
<!--                            <b>{{userinfo.download_num}}张</b>-->
<!--                        </span>-->
<!--            <span>-->
<!--                            剩余下载次数-->
<!--                            <b>{{userinfo.free_download_num}}张</b>-->
<!--                        </span>-->
<!--          </div>-->
<!--          <van-tabs v-model="active" v-if="userinfo.is_elme!=1">-->
<!--            <van-tab>-->
<!--              <template #title>-->
<!--                <span class="iconfont" style="color:#1989fa;">&#xe60d;</span>-->
<!--                <span style="color:#1989fa;">我的下载</span>-->
<!--              </template>-->
<!--              <div class="my-download">-->
<!--                <van-grid :column-num="2" v-if="buyData.length>0">-->
<!--                  <img-->
<!--                    v-lazy="item.url"-->
<!--                    class="img-items"-->
<!--                    v-for="item in buyData"-->
<!--                    :key="item.id"-->
<!--                    @click="goDetail(item)"-->
<!--                  />-->
<!--                </van-grid>-->
<!--                <van-empty image="search" v-else>-->
<!--                  <div style="color:#fff;" slot="description">暂无数据</div>-->
<!--                </van-empty>-->
<!--              </div>-->
<!--            </van-tab>-->
<!--            <van-tab>-->
<!--              <template #title>-->
<!--                <span class="iconfont" style="color:#1989fa;">&#xe7b7;</span>-->
<!--                <span style="color:#1989fa;">下载卡</span>-->
<!--              </template>-->
<!--              <div class="vip-wrapper" :style='backStyle'>-->
<!--                <div class="vip-wrapper-buy">-->
<!--                  <span class="buy-title">购买下载卡</span>-->
<!--                  <span class="buy-tips">开通后有效期为365天</span>-->
<!--                </div>-->
<!--                <ul class="vip-wrapper-list">-->
<!--                  <li-->
<!--                    v-for="item in vipRsp.list"-->
<!--                    :key="item.id"-->
<!--                    :class="{selected:vipType==item.id}"-->
<!--                    @click="vipType=item.id"-->
<!--                    class="vip-wrapper-list-items"-->
<!--                  >-->
<!--                    <span>{{item.num}}张</span>-->
<!--                    <div>￥{{item.price}}</div>-->
<!--                  </li>-->
<!--                </ul>-->
<!--              </div>-->
<!--              <pay-mode :syncType.sync="payType"></pay-mode>-->
<!--              <div class="pay-btn" @click="payNow" v-show="vipType">立即支付</div>-->
<!--            </van-tab>-->
<!--          </van-tabs>-->
<!--          <div v-else>-->
<!--            <div style="width:50%; display:flex; align-items:center; justify-content:center; margin-top:.266667rem; margin-bottom:.4rem;">-->
<!--              <span class="iconfont" style="color:#1989fa; margin-right:.133333rem;">&#xe60d;</span>-->
<!--              <span style="color:#1989fa;">我的下载</span>-->
<!--            </div>-->
<!--            <div class="my-download ele-download">-->
<!--              <van-grid :column-num="2" v-if="buyData.length>0">-->
<!--                <img-->
<!--                  v-lazy="item.url"-->
<!--                  class="img-items"-->
<!--                  v-for="item in buyData"-->
<!--                  :key="item.id"-->
<!--                  @click="goDetail(item)"-->
<!--                />-->
<!--              </van-grid>-->
<!--              <van-empty image="search" v-else>-->
<!--                <div style="color:#fff;" slot="description">暂无数据</div>-->
<!--              </van-empty>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import store from "store";
import {
  seeMyBought,
  userIndex,
  vipList,
  purchaseMember,
} from "../../http/api.js";
import { Empty } from "vant";
import axios from "axios";
import PayMode from "./components/PayMode";
export default {
  components: {
    Empty,
    PayMode,
    Header
  },
  data() {
    const tabs = [
      {
        icon: "\ue60d",
        title: "我的下载"
      },
      {
        icon: "\ue60d",
        title: "下载卡"
      }
    ];
    return {
      backStyle:{
        backgroundImage:
          "url(" + require("@/assets/img/mine/down_back2.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition:"center bottom"
      },
      userinfo: {},
      buyData: [],
      active: 0,
      tabs,
      vipRsp: {},
      payType: 1,
      vipType: "",
      isLoading: false,
      cardNum:0,
      payPrice:0,
      isWeixin: ""
    };
  },
  computed: {
    downloaded() {
      return this.userinfo.free_download_num - this.userinfo.download_num;
    }
  },
  methods: {
    goSetting() {
      //跳转设置页面
      this.$router.push({ path: "/setting" });
    },
    chioceCard(e,f){
      this.cardNum = e
      this.vipType = f
    },
    goDetail(e) {
      //跳转图片详情页面
      this.$router.push({ path: "/activityDetail", query: { id: e.id } });
    },
    goResetPerson() {
      //跳转个人资料设置页面
      this.$router.push({ path: "/resetPersonal" });
    },
    getSeeMyBought() {
      seeMyBought({
        token: this.userinfo.token
      }).then(res => {
        if (res.code == 1) {
          this.buyData = res.data;
        } else {
          this.$vux.toast.text(res.msg, "middle");
        }
      });
    },
    getUserInfo() {
      userIndex({
        token: this.userinfo.token
      })
        .then(res => {
          console.log(res);
          if (res.code === 1) {
            this.userinfo = res.data.welcome;
            this.isLoading = false;
            store.set("userinfo",res.data.welcome)
          } else {
            this.$vux.toast.text(res.msg, "middle");
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    getVipList() {
      vipList({ token: this.userinfo.token })
        .then(res => {
          if (res.code === 1) {
            this.vipRsp = res.data;
            this.payPrice = this.vipRsp.list[0].price
            this.vipType = this.vipRsp.list[0].id
            console.log(this.vipRsp,111)
          } else {
            this.$vux.toast.text(res.msg, "middle");
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    payNow() {
      if (!this.vipType) {
        this.$vux.toast.text("请选择会员种类", "middle");
        return;
      }
      let params = {
        token: store.get("userinfo").token,
        member_id: this.vipType,
        type: "alipay"
      };
      if (this.payType == 1) {
        params.type = "alipay";
      } else {
        params.type = "wechat";
      }
      console.log(params);
      if (store.get("isWeiXin")) {
        purchaseMember(params).then(res => {
          console.log(res);
          if (res.status == 200) {
            function onBridgeReady() {
              WeixinJSBridge.invoke(
                "getBrandWCPayRequest",
                {
                  appId: res.data.appId, //公众号名称，由商户传入
                  timeStamp: res.data.timeStamp, //时间戳，自1970年以来的秒数
                  nonceStr: res.data.nonceStr, //随机串
                  package: res.data.package,
                  signType: res.data.signType, //微信签名方式：
                  paySign: res.data.paySign //微信签名
                },
                function(res) {
                  if (
                    res.err_msg ==
                    "get_brand_wcpay_request:ok"
                  ) {
                    // this.$router.push({path:'/activityDetail',query:{id:this.$route.query.id}})
                  }
                }
              );
            }
            if (typeof WeixinJSBridge == "undefined") {
              if (document.addEventListener) {
                document.addEventListener(
                  "WeixinJSBridgeReady",
                  onBridgeReady,
                  false
                );
              } else if (document.attachEvent) {
                document.attachEvent(
                  "WeixinJSBridgeReady",
                  onBridgeReady
                );
                document.attachEvent(
                  "onWeixinJSBridgeReady",
                  onBridgeReady
                );
              }
            } else {
              onBridgeReady();
            }
          }
        });
      } else {
        window.location.href =
          "https://admin.shitutu.com/public/api/user/purchaseMember?token=" +
          store.get("userinfo").token +
          "&member_id=" +
          this.vipType +
          "&type=" +
          params.type;
      }
    },
    onRefresh() {
      setTimeout(() => {
        this.getUserInfo();
        this.getSeeMyBought();
      }, 1000);
    }
  },
  created() {

    this.isWeixin = store.get("isWeiXin");
    if (this.isWeixin) {
      this.payType = 2;
    }
    this.$nextTick(() => {
      this.userinfo = store.get("userinfo");
      this.getSeeMyBought();
      this.getUserInfo();
      this.getVipList();
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/global.scss";
/deep/ .van-tabs__nav {
  background-color: unset;
}
/deep/ .van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0;
}
/deep/ .van-tabs__line {
  background-color: $backgColor;
}

.img-items {
  width: 4.533333rem;
  max-height: 6.666667rem;
  margin-bottom: 0.133333rem;
  break-inside: avoid;
  margin-left: 0.133333rem;
  object-fit: cover;
}
.img-items:nth-child(odd) {
  margin-left: 0;
}
.mine {
  width: 100vw;
  height: 100vh;
  padding-bottom: 1.17rem;
  box-sizing: border-box;
  overflow: scroll;
  // background: linear-gradient($backgColor, $backgColor2);
  color: #fff;
  .content {
    .head {
      padding-top: 0.4rem;
      .set-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        .set-btn {
          font-size: 0.4rem;
          color:$backgColor;
        }
      }
      .user-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.266667rem;
        color:$backgColor;
        &-box {
          width: 100%;
          display: flex;
          align-items: center;
          .avatar-img {
            width: 2.133333rem;
            height: 2.133333rem;
            border-radius: 50%;
          }
          .user-info {
            margin-left: 0.4rem;
            font-size: 0.48rem;
          }
        }
        .iconfont {
          font-size: 0.4rem;
        }
      }
    }
    .download-wrapper {
      margin-top: 0.266667rem;
      .tab-items {
        display: flex;
        flex-direction: column;
      }
      .num-wrapper {
        height: 1.2rem;
        padding: 0 1.333333rem;
        border-radius: 0.266667rem;
        background-color: rgba(255, 255, 255, 0.8);
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #808080;
        font-size: 0.32rem;
        border:1px solid $backgColor;
        b {
          font-size: 0.48rem;
          margin-left: 0.266667rem;
          font-weight: normal;
          color:$backgColor;
        }
      }
      .my-download {
        height: 9.333333rem;
        overflow-y: scroll;
        margin-top: 0.266667rem;
        color:$backgColor;
        &-title {
          font-size: 0.4rem;
          margin-bottom: 0.266667rem;
          .iconfont {
            margin-left: 0.266667rem;
          }
        }
      }
      .ele-download{
        height:auto;
        position: absolute;
        top:3.733333rem;
        bottom:0;
      }
      .vip-wrapper {
        padding: 0.533333rem 0.266667rem;
        border-radius: 0.266667rem;
        background-color: rgba(255, 255, 255, 0.8);
        margin-top: 0.266667rem;
        &-buy {
          .buy-title {
            font-size: 0.4rem;
            color: #fff;
          }
          .buy-tips {
            font-size: 0.266667rem;
            color: #fff;
            margin-left: 0.266667rem;
          }
        }
        &-list {
          margin-top: 0.8rem;
          display: flex;
          justify-content: space-between;
          &-items {
            width: 2.533333rem;
            height: 2.133333rem;
            border-radius: 0.266667rem;
            border: 1px solid $backgColor;
            background-color: #fff;
            color: $fontColor;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            > span {
              font-size: 0.373333rem;
            }
            > div {
              font-size: 0.533333rem;
            }
          }
          .selected {
            background-color: $backgColor;
            color: #fff !important;
          }
        }
      }
      .pay-btn {
        width: 100%;
        height: 0.933333rem;
        background-color: rgb(255, 124, 124);
        color: #fff;
        text-align: center;
        line-height: 0.933333rem;
        font-size: 0.48rem;
        position: fixed;
        left: 0;
        bottom: 1.17rem;
      }
    }
  }
}

</style>
