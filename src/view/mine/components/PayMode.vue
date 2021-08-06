<template>
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
    <div class="pay-btn">立即支付9.9元</div>
  </div>
</template>

<script>
import store from "store";
export default {
  name: "PayMode",
  props: {
    syncType: Number
  },
  data() {
    return {
      payType: this.syncType,
      isWeixin: ""
    };
  },
  watch: {
    payType(v) {
      this.$emit("update:syncType", v);
    }
  },
  methods: {},
  created() {
    this.isWeixin = store.get("isWeiXin");
    if (this.isWeixin) {
      this.payType = 2;
    }
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
@import "../../../assets/style/global.scss";
.pay-wrapper {
  border-radius: 0.266667rem;
  background-color: hsla(0,0%,100%,.8);
  font-family: PingFang-SC-Regular;
  &-mode {
    font-size: 0.346667rem;
    color: rgb(128, 128, 128);
  }
  &-list {
    display: flex;
    flex-direction: column;
    &-items {
      display: flex;
      justify-content: space-between;
      margin-top: 0.266667rem;
      &-left {
        display: flex;
        align-items: center;
        .payment-icon {
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 50%;
        }
        .payment-title {
          margin-left: 0.133333rem;
          font-size: 0.4rem;
          color:$backgColor;
        }
      }
      .payment-select {
        width: 0.4rem;
        height: 0.4rem;
      }
    }
  }
}
</style>
