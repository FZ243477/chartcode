<template>
  <div class="submitrequire">
    <x-header :left-options="{backText: ''}">提交需求</x-header>
    <div class="content">
        <input v-model="params.contacts" type="text" placeholder="联系人" class="input-all">
        <input v-model="params.mobile" type="text" placeholder="联系方式" class="input-all">
        <div class="line"></div>
        <div class="need-servicer">
            <div class="need-servicer-title">需要的服务</div>
            <div class="need-check-box">
                <div class="radio-item" @click="params.type=index+1" v-for="(item,index) in needArray" :key="index">
                    <img v-show="params.type!=index+1" src="@/assets/img/mine/select.png">
                    <img v-show="params.type==index+1" src="@/assets/img/mine/selected.png">
                    <div>{{item}}</div>
                </div>
            </div>
        </div>
        <div class="product-type">
            <div class="product-type-title">产品类型</div>
            <div class="product-check-box">
                <div class="radio-item" @click="productIndex=index" v-for="(item,index) in productArray" :key="index">
                    <img v-show="productIndex!=index" src="@/assets/img/mine/select.png">
                    <img v-show="productIndex==index" src="@/assets/img/mine/selected.png">
                    <div>{{item}}</div>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="address-box">
            <!-- <input v-model="name" type="text" placeholder="地址：省市区" class="input-all"> -->
            <group>
                <x-address v-model="selectAdress" :list="addressData" title="" placeholder="地址：省市区" @on-shadow-change="onShadowChange"></x-address>
            </group>
            <input v-model="params.num" type="text" placeholder="拍摄数量" class="input-all">
        </div>
        <div class="line"></div>
        <textarea v-model="params.content" class="demand" placeholder="简要描述您的需求"></textarea>
        <div class="submit-box">
            <div class="submit-btn" @click="submit">提交</div>
        </div>
    </div>
  </div>
</template>

<script>
import store from "store";
import { XInput, Group,XHeader, Tab, TabItem, Sticky, Divider, Swiper, SwiperItem, CheckIcon, XTextarea, XAddress, ChinaAddressV4Data } from "vux";
import { submitDemand } from "../../http/api.js";
export default {
  components: {
    XInput,
    Group,
    XHeader,
    Tab,
    TabItem,
    Sticky,
    Divider,
    Swiper,
    SwiperItem,
    CheckIcon,
    XTextarea,
    XAddress
  },
  data() {
    return {
      needArray:['图片拍摄','视频拍摄'],
      productArray:['中式餐饮','速食简餐','西餐沙拉','江河湖海鲜','汤羹炖品','蛋糕甜品','火锅烧烤','面食粥品','日韩料理','水果生鲜','小吃炸串','其他'],
      productIndex:0,
      selectAdress: [],
      addressData: ChinaAddressV4Data,
      params:{
          token:"",
          mobile:"",
          contacts:"",
          type:"1",
          class:"中式餐饮",
          address:"",
          num:"",
          content:"",
      }
    };
  },
  watch:{
      productIndex(v,o){
        this.params.class=this.productArray[v]
      }
  },
  methods: {
    onShadowChange (ids, names) {
      let address="";
      for(var i=0; i<names.length; i++){
          address+=names[i]
      }
      this.params.address=address;
    },
    submit(){
        console.log(this.params)
        if(!this.params.contacts){
            this.$vux.toast.text('联系人为必填', 'middle')
            return;
        }
        if(!this.params.mobile){
            this.$vux.toast.text('联系方式为必填', 'middle')
            return;
        }
        if(!this.params.num){
            this.$vux.toast.text('拍摄数量为必填', 'middle')
            return;
        }
        if(!this.params.address){
            this.$vux.toast.text('联系地址为必填', 'middle')
            return;
        }
        submitDemand(this.params).then(res=>{
            if(res.code==1){
                this.$vux.toast.text('提交成功', 'middle')
                window.setTimeout(()=>{
                    this.$router.go(-1)
                },500)
            }else{
                this.$vux.toast.text(res.msg, 'middle')
            }
        })
    }
  },
  created() {
      this.params.token=store.get("userinfo").token;
  },
  updated(){
    
  }
};
</script>

<style lang="less" scoped>
.line{
    width: 100vw;
    height: .266667rem;
    background-color: #F2F3F4;
}
  .submitrequire{
    width: 100vw;
    .content{
        width: 100%;
        position: absolute;
        top: 1.226667rem;
        bottom: 0;
        overflow-y: scroll;
        -webkit-overflow-scrolling:touch;
        .input-all{
            width: 100vw;
            height: 1.6rem;
            border:none;
            padding: 0 .4rem;
            box-sizing: border-box;
        }
        .input-all:first-child{
            border-bottom: .013333rem solid #D8D6D9;
        }
        .need-servicer{
            padding:.533333rem .4rem;
            box-sizing: border-box;
            color:#31333B;
            border-bottom: .013333rem solid #D8D6D9;
            .need-servicer-title{
                font-size: .426667rem;
                margin-bottom: .533333rem;
            }
            .need-check-box{
                padding:0 .4rem;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                .radio-item{
                    display:flex;
                    img{
                        width:.426667rem;
                        height: .426667rem;
                    }
                    >div{
                        margin-left:.266667rem;
                    }
                }
            }
        }
        .product-type{
            padding:.533333rem .4rem;
            box-sizing: border-box;
            color:#31333B;
            .product-type-title{
                font-size: .426667rem;
                margin-bottom: .533333rem;
            }
            .product-check-box{
                padding:0 .4rem;
                box-sizing: border-box;
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                // .check-all{
                //     margin-bottom:.266667rem;
                // }
                .radio-item{
                    width: 2.453333rem;
                    display:flex;
                    margin-bottom: .266667rem;
                    img{
                        width:.426667rem;
                        height: .426667rem;
                    }
                    >div{
                        margin-left:.266667rem;
                    }
                }
            }
        }
        .demand{
            width: 100%;
            height: 4.266667rem;
            padding: .533333rem .4rem;
            box-sizing: border-box;
            border: none;
            font-size: .426667rem;
            color: #BCBABD;
        }
        .submit-box{
            width: 100%;
            height: 1.333333rem;
            background-color: #F2F3F4;
            overflow: hidden;
            .submit-btn{
                width:2.133333rem;
                height: .906667rem;
                border-radius: .106667rem;
                text-align: center;
                line-height: .906667rem;
                background-color: #4E83FE;
                color: #fff;
                margin:.266667rem auto;
            }
        }
    }
  }
</style>
