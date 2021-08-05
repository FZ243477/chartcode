<template>
    <div class="hotImg">
        <van-nav-bar title="上周热图TOP20" left-arrow @click-left="navToBack" />
        <div class="hotImgItem" v-for="(item,index) in responseData" :key="index" @click="navToDetail(item)">
            <img v-lazy="item.url">
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import store from "store";
    import { hotImg } from "../../http/api.js";
    import { Swipe, SwipeItem, NavBar, Toast } from 'vant';
    export default {
        components: {
			NavBar,
			Toast
        },
        data() {
            return {
                responseData: {}
            };
        },
        methods: {
			// 获取热图
            getData() {
                hotImg().then(res => {
                    if (res.code == 1) {
                        this.responseData = res.data;
                    } else {
						Toast(res.msg);
                    }
                });
			},
			// 返回上一页
			navToBack(){
				this.$router.back(-1);
			},
			// 跳转热图详情
			navToDetail(item){
				this.$router.push({ path: '/activityDetail', query: { id: item.id } })
			}
        },
        created() {
            let query = this.$route.query;
            let userinfo = store.get("userinfo");
            this.getData();
        }
    };
</script>

<style lang="less" scoped>
    .hotImg{
		.hotImgItem{
			margin-top:10px; padding:0 10px; box-sizing: border-box; display: flex; justify-content: center;
			img{width:100%; height:226px; object-fit: cover; border-radius:12px;}
		}
	}
</style>