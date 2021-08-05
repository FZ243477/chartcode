<template>
    <div class="payment">
        <x-header class="title" :left-options="{backText: ''}">订单支付</x-header>
        <div class="goods-detail">
            <img :src="goodsDetail.image_url">
            <div class="goods-title">
                <div class="goods-name">{{goodsDetail.title}}</div>
                <div class="goods-price" v-show="userinfo.is_vip==0">¥{{goodsDetail.price}}</div>
                <div class="goods-price" v-show="userinfo.is_vip!=0">¥{{goodsDetail.member_price}}</div>
            </div>
        </div>
        <div class="line"></div>
        <div class="pay-type">
            <div class="pay-type-title">支付方式</div>
            <div class="pay-list">
                <div class="pay-list-item" @click="payType=1" v-if="!isWeixin">
                    <img class="payment-icon" src="@/assets/img/membership/zfb.png">
                    <div class="payment-title">支付宝</div>
                    <img class="payment-select" v-show="payType!=1" src="@/assets/img/mine/select.png">
                    <img class="payment-select" v-show="payType==1" src="@/assets/img/mine/selected.png">
                </div>
                <div class="pay-list-item" @click="payType=2">
                    <img class="payment-icon" src="@/assets/img/membership/wx.png">
                    <div class="payment-title">微信</div>
                    <img class="payment-select" v-show="payType!=2" src="@/assets/img/mine/select.png">
                    <img class="payment-select" v-show="payType==2" src="@/assets/img/mine/selected.png">
                </div>
            </div>
        </div>
        <div class="payment-btn" @click="buyNow">立即支付</div>
        <!-- <a class="payment-btn" :href='payUrl'>立即支付</a> -->
    </div>
</template>

<script>
import store from "store";
import {Swiper,SwiperItem,Toast,XHeader} from 'vux'
import {seeImageDetail,purchaseImage} from '../../http/api.js'
export default {
    components: {
        Swiper,
        SwiperItem,
        XHeader
    },
    watch:{
        
    },
    data() {
        return {
            goodsDetail:{},
            userinfo:{},
            payType:1,
            payUrl:"",
            type:"alipay",
            isWeixin:""
        };
    },
    methods:{
        buyNow(){
            let params={
                token:this.userinfo.token,
                image_id:this.$route.query.id,
                type:"alipay" 
            }
            if(this.payType==1){
                params.type="alipay"
            }else{
                params.type="wechat"
            }
            if(store.get("isWeiXin")){
                purchaseImage(params).then(res=>{
                    console.log(res)
                    function onBridgeReady(){
                            WeixinJSBridge.invoke(
                                'getBrandWCPayRequest', {
                                    "appId":res.appId,     //公众号名称，由商户传入     
                                    "timeStamp":res.timeStamp,         //时间戳，自1970年以来的秒数     
                                    "nonceStr":res.nonceStr, //随机串     
                                    "package":res.package,     
                                    "signType":res.signType,         //微信签名方式：     
                                    "paySign":res.paySign //微信签名 
                                },
                                function(res){
                                    if(res.err_msg == "get_brand_wcpay_request:ok" ){
                                        this.$router.push({path:'/activityDetail',query:{id:this.$route.query.id}})
                                    } 
                            }); 
                        }
                        if (typeof WeixinJSBridge == "undefined"){
                            if( document.addEventListener ){
                                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                            }else if (document.attachEvent){
                                document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                            }
                        }else{
                            onBridgeReady();
                        }
                })
            }else{
                window.location.href = "https://admin.shitutu.com/public/api/user/purchaseImage?token="+params.token+"&image_id="+params.image_id+"&type="+params.type
            } 
        }
    },
    created(){
        this.isWeixin=store.get("isWeiXin");
        if(this.isWeixin){
            this.payType=2;
        }
        console.log(this.isWeixin)
        this.userinfo=store.get("userinfo");
        seeImageDetail({
            id: this.$route.query.id,
            token: this.userinfo.token
        }).then(res => { 
            console.log(res);
            if (res.code == 1) {
                this.goodsDetail = res.data;
            } else {
                this.$vux.toast.text(res.msg, "middle");
            }
        });
    }
}
</script>

<style lang="less" scoped>
    .line{
        width: 100vw;
        height:.266667rem;
        background-color: #F2F3F4;
    }
    .payment{
        width:100vw;
        .goods-detail{
            display: flex;
            padding:.8rem .4rem;
            box-sizing: border-box;
            >img{
                width:2.88rem;
                height: 2.88rem;
            }
            .goods-title{
                flex:1;
                margin-left:.4rem;
                font-size:.373333rem;
                display: flex;
                flex-direction:column;
                justify-content: space-between;
                .goods-price{
                    font-size:.64rem;
                    color:#F86A71;
                    // align-self: flex-end;
                }
            }
        }
        .pay-type{
            .pay-type-title{
                height:1.173333rem;
                line-height: 1.173333rem;
                padding: 0 .4rem;
                box-sizing: border-box;
                border-bottom: .013333rem solid #D8D6D9;
            }
            .pay-list{
                .pay-list-item{
                    height: 1.6rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 .4rem;
                    box-sizing: border-box;
                    border-bottom: .013333rem solid #D8D6D9;
                    .payment-icon{
                        width: .613333rem;
                        height: .613333rem;
                    }
                    .payment-title{
                        flex:1;
                        margin-left:.4rem;
                    }
                    .payment-select{
                        width: .533333rem;
                        height: .533333rem;
                    }
                }
            }
        }
        .payment-btn{
            width: 100vw;
            height:1.466667rem;
            background-color: #F86A71;
            line-height:1.466667rem;
            text-align: center;
            color:#fff;
            font-size:.48rem;
            position: fixed;
            bottom:0;
        }
    }
</style>
