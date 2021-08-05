<template>
  <div class="home" style="margin-bottom:10px;">

  </div>
</template>

<script>
import Cookie from "js-cookie";
import { Search, Swipe, SwipeItem, NavBar,Toast } from 'vant';
import store from "store";
import { Swiper, SwiperItem,Loading } from "vux";
import { index, loadMore, userIndex, newIndex } from "../../http/api.js";
export default {

  data() {
    return {
      userinfo: {},

    }
  },
  filters:{

  },
  methods: {
    getData(){

    }
  },
  created() {

    this.getData();
  }
};
</script>

