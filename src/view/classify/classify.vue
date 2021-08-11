<template>
    <div class="classify">
      <Header></Header>
<!--        <div style class="search-wrapper">-->
<!--            <div class="searchBox" @click="navToSearch">-->
<!--                <img src="@/assets/img/home/search.png" />-->
<!--                <div>输入搜索菜品名称</div>-->
<!--            </div>-->
<!--        </div>-->
        <van-tree-select
            height="calc(100% - 10px - 1.17rem)"
            style="margin-top:10px; height:calc((100% - 20px) - 1.17rem);"
            :items="responseData"
            :main-active-index.sync="activeIndex"
        >
            <template
                slot="content"
                v-if="responseData.length > 0 && responseData[activeIndex].childlist && responseData[activeIndex].childlist.length>0"
                style="height:100%;"
            >
                <van-tabs @click="changeChild" :swipe-threshold="3" v-model="childSel">
                    <van-tab
                        v-for="(item,index) in responseData[activeIndex].childlist"
                        :key="index"
                        :title="item.title"
                    >
                        <van-list
                            v-model="loading"
                            :finished="finished"
                            finished-text="没有更多了"
                            @load="onLoad"
                            :immediate-check="false"
                        >
                            <van-grid :column-num="1">
                                <van-grid-item
                                    v-for="(item,index) in classifyData"
                                    :key="index"
                                    @click="navToActivity(item)"
                                >
                                    <div style="position:relative">
                                        <img
                                            v-lazy="item.url"
                                            style="width:100%; height:150px; object-fit:cover;"
                                        />
                                    </div>
                                </van-grid-item>
                            </van-grid>
                        </van-list>
                    </van-tab>
                </van-tabs>
            </template>
            <template
                slot="content"
                v-else-if="responseData.length > 0 && responseData[activeIndex].childlist && responseData[activeIndex].childlist.length === 0"
                style="height:100%;"
            >
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    :immediate-check="false"
                >
                    <van-grid :column-num="1">
                        <van-grid-item
                            v-for="(item,index) in classifyData"
                            :key="index"
                            @click="navToActivity(item)"
                        >
                            <div style="position:relative">
                                <img
                                    v-lazy="item.url"
                                    style="width:100%; height:150px; object-fit:cover;"
                                />
                            </div>
                        </van-grid-item>
                    </van-grid>
                </van-list>
            </template>
            <template
                slot="content"
                style="height:100%;"
                v-else-if="activeIndex === responseData.length-1"
            >
<!--                <div class="demand-wrapper">-->
<!--                    <div class="demand-wrapper-title">-->
<!--                        <span class="iconfont">&#xe62a;</span>-->
<!--                        <div>找不到您想要的照片？</div>-->
<!--                    </div>-->
<!--                    <div class="demand-wrapper-commit">-->
<!--                        <span>提交您的需求，72小时为您研发交稿！</span>-->
<!--                        <van-field-->
<!--                            v-model="message"-->
<!--                            rows="1"-->
<!--                            autosize-->
<!--                            type="textarea"-->
<!--                            placeholder="请填写您的需求"-->
<!--                            class="demand-wrapper-commit-input"-->
<!--                        />-->
<!--                        <div class="service-wrapper">-->
<!--                            客服热线：17767148311-->
<!--                            <div class="commit-btn" @click="submitDemand">提交</div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
            </template>
        </van-tree-select>
    </div>
</template>
<script>
import Header from '@/components/Header.vue'
import {
    Search,
    Sidebar,
    SidebarItem,
    Tab,
    Tabs,
    TreeSelect,
    List,
    Toast
} from "vant";
import store from "store";
import {
    classifyBrowse,
    userIndex,
    tagsIndex,
    classifyImg,
    feedback
} from "../../http/api.js";
export default {
    components: {
        Search,
        Sidebar,
        SidebarItem,
        Tab,
        Tabs,
        TreeSelect,
        List,
        Toast,
        Header
    },
    data() {
        return {
            classifyData: [], //分类图片数据
            responseData: [], //分组数据
            activeIndex: 0, //父级选中项
            childSel: 0, //子级选中项
            params: {
                // 加载分类图片入参
                tags_id: "",
                page: 1,
                page_size: 15
            },
            list: [],
            loading: false,
            finished: false,
            active: 1,
            message: "",
            clientHeight: '',
        };
    },
    watch: {

        // 切换父选项
        activeIndex(v, o) {
            console.log(this.responseData.length - 1, v);
            if (this.responseData && this.responseData.length - 1 === v) {
                this.activeIndex = v;
                return;
            }
            // if (this.responseData[v].childlist.length > 0) {
            //     this.params.page = 1;
            //     this.params.tags_id = this.responseData[v].childlist[0].id;
            //     this.childSel = 0;
            //     this.classifyData = [];
            //     this.getImgList();
            // } else {
            //     this.params.page = 1;
            //     this.params.tags_id = this.responseData[v].id;
            //     this.childSel = 0;
            //     this.classifyData = [];
            //     this.getImgList();
            //     // Toast('该分类暂无内容，请浏览其他分类');
            //     // this.activeIndex = o;
            // }
        }
    },
    methods: {
        // 切换子选项
        changeChild(name, title) {
            console.log(this.activeIndex);
            this.params.page = 1;
            this.params.tags_id = this.responseData[this.activeIndex].childlist[name].id;
            this.classifyData = [];
            this.getImgList();
        },
        // 上拉加载
        onLoad() {
            this.params.page++;
            this.getImgList();
        },
        // 获取分类数据
        getData() {
            tagsIndex().then(res => {
                if (res.code == 1) {
                    if (res.data.length > 0) {
                        let hotItem = {};
                        res.data.forEach(element => {
                            element.text = element.title;
                            if (element.title === "热门") {
                                hotItem = element;
                            }
                        });
                        res.data.splice(9, 10);
                        this.responseData = res.data.reverse();
                       // this.responseData.unshift(hotItem);
                        if (this.responseData[0].childlist.length > 0) {
                            this.params.tags_id = this.responseData[0].childlist[0].id;
                            this.getImgList();
                        } else {
                            this.params.tags_id = this.responseData[0].id;
                            this.getImgList();
                        }
                        // this.responseData.push({
                        //     id: -1,
                        //     text: "找不到想要的照片？"
                        // });
                    }
                } else {
                    this.$vux.toast.text(res.msg, "middle");
                }
            });
        },
        // 获取分类图片列表
        getImgList() {
            classifyImg(this.params).then(res => {
                if (res.code == 1) {
                    this.classifyData = this.classifyData.concat(res.data.data);
                    this.loading = false;
                    if (this.classifyData.length >= res.data.total) {
                        this.finished = true;
                    } else {
                        this.finished = false;
                    }
                } else {
                    this.$vux.toast.text(res.msg, "middle");
                }
            });
        },
        // 跳转图片详情页
        navToActivity(e) {
            this.$router.push({ path: "/activityDetail", query: { id: e.id } });
        },
        // 跳转搜索页面
        navToSearch() {
            this.$router.push({ path: "/search" });
        },
        submitDemand() {
            if (!this.message) {
                this.$vux.toast.text("请先填写需求", "middle");
                return;
            }
            feedback({
                content: this.message
            })
                .then(res => {
                    console.log(res);
                    if (res.code === 1) {
                        this.$vux.toast.text("提交成功", "middle");
                        this.message = "";
                    } else {
                        this.$vux.toast.text(res.msg, "middle");
                    }
                })
                .catch(res => {
                    console.log(res);
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
        },
        _isMobile() {
            let flag = navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            );
            return flag;
        }
    },
    created() {
      this.getData();
      let params = {
        id: this.$route.query.id
      };
      this.activeIndex = params.id
        console.log(this._isMobile());
        let urlToken = this.GetUrlParam("token");
        console.log(urlToken)
        if (urlToken) {
            if (!this._isMobile()) {
                window.location.href =
                    "https://web.shitutu.com/index?token=" + urlToken;
            } else {
                userIndex({ token: urlToken }).then(res => {
                    if (res.code == 1) {
                        store.remove("userinfo");
                        store.set("userinfo", res.data.welcome);
                        this.userinfo = res.data.welcome;
                        console.log(store.get('userinfo'))
                    } else {
                        this.$vux.toast.text(res.msg, "middle");
                    }
                });
            }
        }

    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/global.scss";
/deep/ .van-sidebar-item--select {
    border-color: $backgColor;
}
/deep/ .van-sidebar-item--select::before {
    background-color: $backgColor;
}
/deep/ .van-tabs__line {
    background-color: $backgColor;
}
/deep/ .van-list {
    padding-top: 0.266667rem;
}
/deep/ .van-grid-item__content {
    padding-top: 0;
    padding-bottom: 0.133333rem;
}
.van-sidebar {
    flex: 0.75;
}
.van-tabs {
    height: 100%;
}
.van-tabs--line .van-tabs__wrap {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 99;
}
.van-tabs__content {
    overflow: scroll;
    height: calc(100% - 44px);
    padding-top: 44px;
}
.classify {
    width: 100%;
    height: calc(100% - 45px);
    box-sizing: border-box;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    .search-wrapper {
        padding: 10px 0.4rem;
        background: $backgColor;
        .searchBox {
            display: flex;
            align-items: center;
            color: #808080;
            width: 100%;
            border-radius: 30px;
            background-color: rgb(230, 230, 230);
            padding: 5px 15px;
            box-sizing: border-box;
            img {
                width: 20px;
            }
            div {
                margin-left: 10px;
            }
        }
    }
    .demand-wrapper {
        padding: 0.533333rem;
        &-title {
            display: flex;
            align-items: center;
            color: $fontColor;
            font-size: 0.4rem;
            .iconfont {
                font-size: 0.4rem;
            }
            > div {
                margin-left: 0.2rem;
            }
        }
        &-commit {
            font-size: 0.346667rem;
            color: rgb(102, 102, 102);
            padding: 0.533333rem 0;
            &-input {
                height: 5.333333rem;
                border: 1px solid $backgColor;
                margin-top: 0.266667rem;
            }
            .service-wrapper {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 0.32rem;
                color: rgb(51, 51, 51);
                margin-top: 0.266667rem;
                .commit-btn {
                    width: 0.933333rem;
                    height: 0.533333rem;
                    text-align: center;
                    line-height: 0.533333rem;
                    background-color: $backgColor;
                    color: #fff;
                    border-radius: 0.053333rem;
                }
            }
        }
    }
}
</style>
