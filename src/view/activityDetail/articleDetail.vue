<template>
    <div class="articleDetail">
        <van-nav-bar title="详情页" left-arrow @click-left="navToBack" />
        <div class="contentBox">
            <div class="contentTitle">{{newsData.title}}</div>
            <div class="authorInfo">
                <!-- <div>作者名字：<span>{{newsData.title}}</span></div> -->
                <div class="issueTime">时间：{{newsData.createtime|formatDate}}</div>
            </div>
            <div class="contentText" style="word-brack:brack-all;" v-html="newsData.content"></div>
        </div>
    </div>
</template>

<script>
    import Cookie from "js-cookie";
    import store from "store";
    import { XHeader, XButton, Swiper, SwiperItem, Alert, XDialog, TransferDomDirective as TransferDom } from "vux";
    import { seeImageDetail, collection, download, download2 } from "../../http/api.js";
    import {NavBar} from "vant";
    export default {
        directives: {
            TransferDom
        },
        components: {
            XHeader,
            XButton,
            Swiper,
            SwiperItem,
            Alert,
            XDialog,
            NavBar
        },
        data() {
            return {
                details_id: "",
                goodsDetail: {},
                userinfo: {},
                vipStatus: "开通会员",
                downName: "",
                show: false,
                isWeixin: false,
                newsData:{}
            };
        },
        watch: {
            details_id(v, o) {
                let params = {
                    id: this.$route.query.id
                }
                if (store.get("userinfo") && store.get("userinfo").token) {
                    params.token = store.get("userinfo").token;
                }
                seeImageDetail(params).then(res => {
                    if (res.code == 1) {
                        this.goodsDetail = res.data;
                    } else {
                        this.$vux.toast.text(res.msg, "middle");
                    }
                });
            }
        },
        filters:{
            formatDate(timeStr){
                var date=new Date(timeStr*1000);
                var year=date.getFullYear();
                var month=date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1;
                var day=date.getDate()<10?"0"+date.getDate():date.getDate();
                var hour=date.getHours()<10?"0"+date.getHours():date.getHours();
                var minute=date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
                var seconds=date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
                return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+seconds;
            }
        },
        methods: {
            goDetail(e) {
                this.$vux.loading.show({
                    text: ''
                })
                window.setTimeout(() => {
                    this.$vux.loading.hide()
                }, 500)
                this.details_id = e.id;
                this.$router.push({ path: "/activityDetail", query: { id: e.id } });
            },
            // 返回上一页
			navToBack(){
				this.$router.back(-1);
            },
            getDomContent(data){
                var parser = new DOMParser();
                //读取返回字符串
                var _xml = parser.parseFromString(data, "text/xml");
                //获取节点内容
                var jsonXml = _xml.getElementsByTagName("string")[0].innerHTML;
                console.log(jsonXml);
                //获得json数组
                var jsonArr = JSON.parse(jsonXml);
                console.log(jsonArr);
            }
        },
        created() {
            if(Cookie.set('newsData')){
                this.newsData = JSON.parse(Cookie.set('newsData'));
                console.log(this.newsData.content);
                var pattern = new RegExp('<p.*?>(.*?)<\/p>','i');
                var a = this.newsData.content.match(pattern)[1];

                console.log(a.replace(/[^\u4e00-\u9fa5]/gi,""))
            }
            let params = {
                id: this.$route.query.id
            }
            if (store.get("userinfo") && store.get("userinfo").token) {
                params.token = store.get("userinfo").token;
                this.userinfo = store.get("userinfo");
            }
            // seeImageDetail(params).then(res => {
            //     if (res.code == 1) {
            //         this.goodsDetail = res.data;
            //     } else {
            //         this.$vux.toast.text(res.msg, "middle");
            //     }
            // });

            if (store.get("mobileType") == 0 && store.get("alertStatus")) {
                this.show = true;
            }
        }
    };
</script>

<style lang="less">
    iframe{
        width: 100% !important;
        height: auto !important;
    }
    .articleDetail{
        color:#808080;
        .contentBox{
            padding:15px; box-sizing:border-box;
            .contentTitle{font-size:23px; color:rgb(24,23,23);}
            .authorInfo{
                display:flex; align-items: center; font-size:14px; margin-top:15px;
                span{color:rgb(91,106,146);}
            }
            .contentText{
                margin-top:30px;
                img{
                    width:100%;
                }
            }
        }
    }
</style>