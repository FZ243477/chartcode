<template>
    <div class="favorite" style="padding-bottom:1.17rem;">
      <Header></Header>
      <div class="fav_head">
        <p class="fav_left">我的收藏</p>
        <p v-if="isEdit"  @click="finishEdit" class="fav_right">完成</p>
        <p  v-else @click="finishEdit" class="fav_right">管理</p>
        <!---->
        <div style="clear: both;"></div>
      </div>
        <van-nav-bar title="收藏夹" :right-text="isEdit ? '完成' : '管理'" @click-right="finishEdit" style="width:100%; position:fixed; top:0;"/>
        <van-checkbox-group v-model="result" ref="checkboxGroup" style="padding-top:46px;">
            <van-grid :column-num="2" v-if="collectData.length>0">
                <van-grid-item v-for="(item,index) in collectData" :key="index" @click="navToActivity(item)">
                    <div style="position:relative;">
                        <img v-lazy="item.url" style="width:149px; height:99px; object-fit:cover;" />
                        <div v-show="isEdit" style="width:100%; position:absolute; bottom:3px; background-color:rgba(0,0,0,0.4); padding:5px 10px; box-sizing: border-box; display:flex; justify-content:space-between;" @click.stop="stopBubble">
                            <van-checkbox :name="item.id" ref="checkboxes" slot="right-icon" icon-size="15px" checked-color="#1989fa"/>
                            <img src="@/assets/img/favorite/delete.png" @click="deleteImg(item,index)" style="height:16px;">
                        </div>
                    </div>
                </van-grid-item>
            </van-grid>
            <van-empty image="search" description="暂无数据" v-else>
            </van-empty>
        </van-checkbox-group>
        <div class="mul-del-wrapper" v-show="isEdit">
            <div>
                <van-checkbox v-model="checked" checked-color="#1989fa" @click="checkAll">全选</van-checkbox>
            </div>
            <div class="mul-del-btn" style="" @click="delCollection">删除</div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header.vue'
    import store from "store";
    import { index, loadMore, userIndex, seeMyCollection, collection,delCollection } from "../../http/api.js";
    import { XHeader, Tab, TabItem, Scroller, LoadMore, Swiper, SwiperItem } from "vux";
    import { NavBar, Grid, GridItem, Checkbox, CheckboxGroup, Toast, Empty } from "vant";
    export default {
        components: {
            Swiper,
            SwiperItem,
            XHeader,
            NavBar,
            Grid,
            GridItem,
            Checkbox,
            CheckboxGroup,
            Toast,
            Header
        },
        data() {
            return {
                userinfo: {},
                responseData: {},
                vipPage: 0,
                mustPage: 0,
                showVipload: true,
                showMustload: true,
                isEdit: false,
                result:[],

                collectData:[],
                checked:false,
                checkAllList:[]
            };
        },
        watch:{
            result:function(v,o){
                if(v.length==this.collectData.length){
                    this.checked = true;
                }else{
                    this.checked = false;
                }
            }
        },
        methods: {
            // 全选
            checkAll(){
                if(this.checked){
                    this.result = [];
                }else{
                    this.result = JSON.parse(JSON.stringify(this.checkAllList));
                }
            },
            // 阻止冒泡
            stopBubble(){
                // do nothing
            },
            // 跳转图片详情页
            navToActivity(e) {
                this.$router.push({ path: "/activityDetail", query: { id: e.id } });
            },
            // 删除图片
            deleteImg(item,index){
                console.log(item,index);
                collection({
                    image_id:item.id,
                    token:store.get("userinfo").token
                }).then(res => {
                    console.log(res);
                    if (res.code == 1 || res.code == 2) {
                        this.getCollect();
                        // var collectData = this.collectData;
                        // collectData.splice(index,1);
                        // this.collectData = collectData;
                    } else {
                        Toast(res.msg);
                    }
                })
            },
            // 获取收藏图片
            getCollect(){
                seeMyCollection({
                    token:store.get("userinfo").token
                }).then(res=>{
                    if (res.code == 1) {
                        this.buyCarData=res.data;
                        this.collectData = res.data;
                        this.collectData.forEach((item,index)=>{
                            this.checkAllList.push(item.id);
                        })
                    } else {
                        Toast(res.msg);
                    }
                })
            },

            // 批量取消收藏
            delCollection(){
                console.log(this.result);
                if(this.result.length==0){
                    Toast("请选择图片")
                }else{
                    var image_id = this.result.join(",");
                    console.log(image_id);

                    delCollection({
                        image_id:image_id,
                        token:store.get("userinfo").token
                    }).then(res => {
                        if (res.code == 1 || res.code == 2) {
                            this.getCollect();
                        } else {
                            Toast(res.msg);
                        }
                    })
                }
            },

            // 完成编辑
            finishEdit() {
                this.isEdit = !this.isEdit;
            },
            getData() {
                index().then(res => {
                    console.log(res);
                    if (res.code == 1) {
                        this.responseData = res.data;
                    } else {
                        this.$vux.toast.text(res.msg, "middle");
                    }
                });
            },
            goMembership() {
                //跳转会员购买
                if (!store.get("userinfo") || !store.get("userinfo").token) {
                    this.$vux.toast.text("您还未登陆,请先登陆", "middle");
                    window.setTimeout(() => {
                        this.$router.push({ path: "/login" });
                    }, 500);
                    return;
                }
                this.$router.push({ path: "/membership" });
            },
            goDetail(e) {
                this.$router.push({ path: "/activityDetail", query: { id: e.id } });
            },
            goVipfree(e) {
                if (e == 1) {
                    this.$router.push({ path: "/vipfree", query: { status: 1 } });
                } else if (e == 2) {
                    this.$router.push({ path: "/vipfree", query: { type: 1 } });
                }
            },
            loadVipfree() {
                this.$vux.loading.show({});
                this.vipPage++;
                loadMore({
                    type: 1,
                    page: this.vipPage
                }).then(res => {
                    console.log(res);
                    this.$vux.loading.hide();
                    if (res.code == 1) {
                        if (res.data.length == 0) {
                            this.vipPage--;
                            this.$vux.toast.text("无法加载更多", "middle");
                            this.showVipload = false;
                        } else {
                            this.responseData.free = this.responseData.free.concat(
                                res.data
                            );
                        }
                    } else {
                        this.$vux.toast.text(res.msg, "middle");
                    }
                });
            },
            loadMustbuy() {
                this.$vux.loading.show({});
                this.mustPage++;

                loadMore({
                    type: 2,
                    page: this.mustPage
                }).then(res => {
                    //加载更多
                    console.log(res);
                    this.$vux.loading.hide();
                    if (res.code == 1) {
                        if (res.data.length == 0) {
                            this.mustPage--;
                            this.$vux.toast.text("无法加载更多", "middle");
                            this.showMustload = false;
                        } else {
                            this.responseData.mustBuy = this.responseData.mustBuy.concat(
                                res.data
                            );
                        }
                    } else {
                        this.$vux.toast.text(res.msg, "middle");
                    }
                });
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
                } else {
                    return "";
                }
            }
        },
        created() {
            // 判断是否是微信浏览器
            let isWeiXin = () => {
                return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
            };
            let urlToken = this.GetUrlParam("token");
            let token;
            if (store.get("userinfo") && store.get("userinfo").token) {
                token = store.get("userinfo").token;
                this.userinfo = store.get("userinfo");
            }
            if (isWeiXin()) {
                store.set("isWeiXin", true);
                if (!token) {
                    if (!urlToken) {
                        window.location.href =
                            "https://admin.shitutu.com/public/addons/third/index/connect?platform=wechat";
                        return;
                    } else {
                        userIndex({ token: urlToken }).then(res => {
                            console.log(res);
                            if (res.code == 1) {
                                store.remove("userinfo");
                                store.set("userinfo", res.data.welcome);
                                this.userinfo = res.data.welcome;
                            } else {
                                this.$vux.toast.text(res.msg, "middle");
                            }
                        });
                    }
                }
            } else {
                store.set("isWeiXin", false);
                if (urlToken) {
                    userIndex({ token: urlToken }).then(res => {
                        console.log(res);
                        if (res.code == 1) {
                            store.remove("userinfo");
                            store.set("userinfo", res.data.welcome);
                            this.userinfo = res.data.welcome;
                        } else {
                            this.$vux.toast.text(res.msg, "middle");
                        }
                    });
                }
            }
            // this.getData();
            this.getCollect();
        }
    };
</script>

<style lang="scss" scoped>
@import "../../assets/style/global.scss";
.mul-del-wrapper{
    width:100%; display: flex; align-items: center; justify-content: space-between; padding:10px 8px; box-sizing:border-box;
    .mul-del-btn{
        width:56px; height:22px; background-color:$backgColor; text-align:center; line-height:22px; border-radius:22px; color:#fff;
    }
}
</style>
