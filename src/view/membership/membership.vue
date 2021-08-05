<template>
    <div class="membership">
        <x-header class="title" :left-options="{backText: ''}" :title="pageTitle"></x-header>
        <div class="my-vip" v-if="vipResponse.user && vipResponse.user.is_vip!=0">
            <img :src="vipResponse.user.avatar">
            <div>{{vipResponse.user && vipResponse.user.vip_info}}</div>
        </div>
        <div class="open-vip">
            <div class="open-title" v-if="vipResponse.user && vipResponse.user.is_vip!=0">
                <div>开启续费</div>
                <div style="color:#F86A71;" @click="goRedeemCode">兑换码激活</div>
            </div>
            <div class="open-title2" v-if="vipResponse.user && vipResponse.user.is_vip==0">
                <div>开启服务</div>
                <img src="@/assets/img/membership/vip.png">
                <div>食图图会员</div>
                <div style="position:absolute; right:0; color:#F86A71;" @click="goRedeemCode">兑换码激活</div>
            </div>
            <div class="vip-list">
                <div class="vip-list-item" :class="{selected:vipType==item.id}" @click="vipType=item.id" v-for="(item,index) in vipResponse.list" :key="index">
                    <div>{{item.title}}</div>
                    <div class="price">￥{{item.price}}</div>
                </div>
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
        <div class="payment-btn" @click="payNow">立即支付</div>
        <!-- <a class="payment-btn" :href='payUrl'>立即支付</a> -->
    </div>
</template>

<script>
import store from "store";
import {Swiper,SwiperItem,Toast,XHeader} from 'vux'
import {userIndex,vipList,purchaseMember} from '../../http/api.js'
export default {
    components: {
        Swiper,
        SwiperItem,
        XHeader
    },
    data() {
        return {
            list: [],
            imgDetail:{},
            payType:1,
            vipType:"",
            vipResponse:{},
            pageTitle:"购买会员",
            isWeixin:""
        };
    },
    watch:{
        
    },
    methods:{
        goRedeemCode(){
            this.$router.push({ path: "/redeemCode"});
        },
        getData(){
            vipList({
                token:store.get("userinfo").token
            }).then(res=>{
                console.log(res)
                if(res.code==1){
                    this.vipResponse=res.data;
                    console.log(this.vipResponse)
                    if(res.data.user.is_vip==0){
                        this.pageTitle="购买会员";
                    }else{
                        this.pageTitle="续费会员";
                    }
                }else{
                    this.$vux.toast.text(res.msg, 'middle');
                }
            })
        },
        payNow(){   //立即支付
            if(!this.vipType){
                this.$vux.toast.text("请选择会员种类", 'middle');
                return;
            }
            let params={
                token:store.get("userinfo").token,
                member_id:this.vipType,
                type:"alipay" 
            }
            if(this.payType==1){
                params.type="alipay"
            }else{
                params.type="wechat"
            }
            if(store.get("isWeiXin")){
                purchaseMember(params).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        function onBridgeReady(){
                            WeixinJSBridge.invoke(
                                'getBrandWCPayRequest', {
                                    "appId":res.data.appId,     //公众号名称，由商户传入     
                                    "timeStamp":res.data.timeStamp,         //时间戳，自1970年以来的秒数     
                                    "nonceStr":res.data.nonceStr, //随机串     
                                    "package":res.data.package,     
                                    "signType":res.data.signType,         //微信签名方式：     
                                    "paySign":res.data.paySign //微信签名 
                                },
                                function(res){
                                    if(res.err_msg == "get_brand_wcpay_request:ok" ){
                                        // this.$router.push({path:'/activityDetail',query:{id:this.$route.query.id}})
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
                    }
                })
            }else{
                window.location.href = "https://admin.shitutu.com/public/api/user/purchaseMember?token="+store.get("userinfo").token+"&member_id="+this.vipType+"&type="+params.type
            } 
        }
    },
    created(){
        this.isWeixin=store.get("isWeiXin");
        if(this.isWeixin){
            this.payType=2;
        }
        this.getData()
    }
}
</script>

<style lang="less" scoped>
    .selected{
        background-color: #4E83FE;
        color: #fff !important;
    }
    .line{
        width: 100vw;
        height:.266667rem;
        background-color: #F2F3F4;
    }
    .membership{
        width:100vw;
        .my-vip{
            height: 2.133333rem;
            background-color: #F2F3F4;
            padding:.2rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            >img{
                width:1.28rem;
                height: 1.28rem;
            }
            >div{
                font-size:.373333rem;
                margin-left:.4rem;

            }
        }
        .open-vip{
            padding:.533333rem .4rem;
            box-sizing: border-box;
            >.open-title{
                font-size:.373333rem;
                color:#5A5565;
                display: flex;
                justify-content: space-between;
            }
            >.open-title2{
                display: flex;
                position: relative;
                >img{
                    width: .533333rem;
                    height: .533333rem;
                    margin-left:.533333rem;
                    margin-right: .133333rem;
                }
            }
            >.vip-list{
                height: 2.506667rem;
                display: flex;
                justify-content: space-between;
                margin-top:.4rem;
                .vip-list-item{
                    width: 2.24rem;
                    height: 2.506667rem;
                    display: flex;
                    justify-content: center;
                    flex-direction:column;
                    align-items: center;
                    border:1px solid #4E83FE;
                    color: #4E83FE;
                    font-size:.32rem;
                    border-radius: .106667rem;
                    .price{
                        font-size:.64rem;
                        margin-top:.4rem;
                        font-weight: 600;
                    }
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
