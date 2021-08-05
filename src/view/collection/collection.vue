<template>
    <div class="activity-detail">
        <div class="detail-top">
            <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1690714227,261409767&fm=27&gp=0.jpg" alt="">
            <div class="activity-content">
                <div class="content-item">
                    <div class="title">图片标题</div>
                    <div class="cate">分类：饮品</div>
                </div>
                <div class="content-item">正版图片 购买后去水印 获得版权</div>
                <div class="content-item">版权费：10元</div>
                <div class="content-item">
                    <div class="vip-price">会员价：5元</div>
                    <div>上传者：咔嚓鱼</div>
                </div>
                <div class="membership">
                    <div class="membership-tip">开通会员 立享优惠价</div>
                </div>
            </div>
        </div>
        <div class="detail-bottom">
            <div class="collect" @click="collection">收藏</div>
            <div class="buy">购买此图</div>
        </div>
    </div>
</template>

<script>
import store from "store";
import {Swiper,SwiperItem} from 'vux'
import {collection,seeImageDetail} from '../../http/api.js'
export default {
    components: {
        Swiper,
        SwiperItem
    },
    data() {
        return {
            list: [],
            imgDetail:{}
        };
    },
    methods:{
        collection(){   //收藏、取消收藏
            let _this=this;
            let params={
                image_id:imgDetail.image_id,
                token:store.get("userinfo").token
            }
            collection(params).then((res)=>{
                console.log(res)
                if(res.code==1){
                    
                }else{
                   _this.$vux.toast.text(res.msg, 'middle')
                }
            })
        },
        getData(){  //获取图片详情
            let _this=this;
            let params={
                id:_this.$route.query.id,
                token:store.get("userinfo").token
            }
            seeImageDetail(params).then((res)=>{
                console.log(res)
                if(res.code==1){
                    _this.imgDetail=res.data;
                }else{
                   _this.$vux.toast.text(res.msg, 'middle')
                }
            })
        }
    },
    created(){
        this.getData()
    }
}
</script>

<style lang="less" scoped>
    .activity-detail{
        width:100vw;
        .detail-top{
            width: 100%;
            padding-bottom:1.17rem;
            box-sizing:border-box;
            img{
                width: 100%;
            }
            .activity-content{
                padding:.266667rem;
                box-sizing: border-box;
                .content-item{
                    height: .666667rem;
                    line-height: .666667rem;
                    margin-top:.133333rem;
                    display:flex;
                    justify-content:space-between;
                    border-bottom:1px solid #E7E7E7;
                    .title{
                        font-size:.48rem;
                    }
                    .vip-price{
                        color: #FB0036;
                    }
                }
                .membership{
                    padding:.266667rem .8rem;
                    box-sizing:border-box;
                    .membership-tip{
                        width: 100%;
                        height: 0.8rem;
                        border:1px solid #E7E7E7;
                        text-align: center;
                        line-height: .8rem;
                        border-radius: .066667rem;
                    }
                }
            }
        }
        .detail-bottom{
            width: 100vw;
            position: fixed;
            display: flex;
            left:0;
            bottom:0;
            height:1.17rem;
            text-align: center;
            line-height: 1.17rem;
            background-color: #fff;
            .collect{
                flex:1;
                background-color:rgb(121,121,121);
                color:#fff;
            }
            .buy{
                flex:5;
                background-color: rgb(0,150,136);
                color:#fff;
            }
        }
    }
</style>
