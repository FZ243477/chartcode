<template>
  <div class="vipfree">
    <x-header :left-options="{backText: ''}">{{titleName}}</x-header>
    <scroller class='content' lock-x scrollbar-y use-pullup  height="-46" @on-pullup-loading="loadMore" v-model="status" ref="scroller" :pullup-config="{content:'',	downContent:'',upContent:'',loadingContent:''}">
        <div>
            <tab :line-width="3" active-color="#fc378c" v-model="index" v-if="titleName=='必买图片' || titleName=='会员免费' || titleName=='图片分类'">
                <tab-item class="vux-center" :selected="demo2 === item.title" v-for="(item, index) in classifyData.tags" :key="index">{{item.title}}</tab-item>
            </tab>
            <div class="list-box">
                <img v-lazy="item.url" v-for="(item) in imagesResponse" :key="item.url" @click="goDetail(item)">
            </div>
            <load-more style='margin-top:0.3rem;' tip="正在加载" v-if='nonull'></load-more>
            <load-more style='margin-top:0.7rem;' :show-loading="false" tip="我也是有底线的哦" background-color="#fbf9fe" v-if="noData"></load-more>
        </div>
	</scroller>
  </div>
</template>

<script>
import $ from 'jquery';
import store from "store";
import {
  XHeader,
  Tab,
  TabItem,
  Scroller,
  LoadMore
} from "vux";
import { seeClassifyDetail } from "../../http/api.js";
export default {
    components: {
        XHeader,
        Tab,
        TabItem,
        Scroller,
        LoadMore
    },
    watch:{
        index(v,o){
            let idArr={
                tag_id:this.classifyData.tags[v].id
            }
            this.imagesResponse=[];
            this.params.page=1;
            // this.classifyData={};
            this.getData(idArr)
        }
    },
  data() {
        return {
            index: 0,
            demo2:"",
            params:{
                page:1
            },
            classifyData:{}, //分类数据
            imagesResponse:[],  //图片数据
            status: { //上拉加载下拉刷新的状态
                pullupStatus: 'default',
                pulldownStatus: 'default'
            },
            noData:false, //加载没有数据的时候所要的状态,
            nonull:false,
        };
    },
    methods: {
        getData(params1,params2){ //请求分类数据
            if(params2){
                this.params=$.extend(this.params, params1,params2);
            }else{
                this.params=$.extend(this.params, params1);
            }
            seeClassifyDetail(this.params).then(res => {
                this.nonull=false;
                if(res.code==1){
                    if(res.data.images.length>0){
                        this.classifyData=res.data;
                        this.imagesResponse=this.imagesResponse.concat(res.data.images)
                        this.demo2=this.classifyData.tags[0].title;
                    }else{
                        this.noData=true;
                        this.params.page--;
                    }
                }else{
                    this.$vux.toast.text(res.msg, "middle");
                }
            });
        },
        changeSelect(e){  //切换类别
            // this.demo2 = e.title;
            let idArr={
                tag_id:e.id
            }
            this.getData(idArr)
        },
        goDetail(e){  //跳转到图片详情
            this.$router.push({path:'/activityDetail',query:{id:e.id}})
        },
        loadMore(){ //上拉加载
            this.$refs.scroller.donePullup();
            this.nonull=true;
            this.params.page++;
            window.setTimeout(()=>{
                this.getData({})
            },500)
            
        }
    },
    created() {
        let query = this.$route.query;
        let userinfo = store.get("userinfo");
        
        if(query.name){
            this.titleName=query.name;
            delete query.name;
        }else{
            if(this.params.type && this.params.type==1){
                this.titleName="必买图片"
            }else if(this.params.status && this.params.status==1){
                this.titleName="会员免费"
            }else{
                this.titleName="图片分类"
            }
        }
        this.getData(query)
    },
    updated() {

    }
};
</script>

<style lang="less" scoped>
.vipfree {
  width: 100vw;
  .content{
    width: 100%;
    // position: absolute;
    // top: 1.226667rem;
    // bottom: 0;
    // overflow-y: scroll;
    // -webkit-overflow-scrolling:touch;
    .list-box {
      padding: 0.533333rem 0.4rem;
      box-sizing: border-box;
      >.noImg{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      img {
        width: 4.4rem;
        height: 2.8rem;
        border-radius: 0.106667rem;
        margin-left: 0.266667rem;
        margin-bottom: 0.266667rem;
      }
      img:nth-child(2n + 1) {
        margin-left: 0;
      }
    }
  }
}
</style>
