<template>
  <div class="resetPersonal">
    <x-header class="title" :left-options="{backText: ''}">个人资料</x-header>
    <div class="reset-item">
      <div class="reset-item-title">修改头像</div>
      <div class="right-box">
        <img class="reset-item-head" :src="userinfo.avatar">
        <input id="inputFile" type="file" hidden @change="uploadChange">
        <img class="reset-item-more" src="@/assets/img/home/right.png" @click="uploadClick">
      </div>
    </div>
    <!-- <div class="reset-item">
      <div class="reset-item-title">修改昵称</div>
      <div class="right-box">
        <img class="reset-item-more" src="@/assets/img/home/right.png">
      </div>
    </div> -->
    <div class="reset-item" @click="go_resetPhone">
      <div class="reset-item-title">修改手机号</div>
      <div class="right-box">
        <img class="reset-item-more" src="@/assets/img/home/right.png">
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import store from "store";
import { Swiper, SwiperItem, Toast, XHeader } from "vux";
import { collection, seeImageDetail,upload,profile } from "../../http/api.js";
export default {
  components: {
    Swiper,
    SwiperItem,
    XHeader
  },
  data() {
    return {
      list: [],
      imgDetail: {},
      userinfo: {}
    };
  },
  methods: {
    uploadClick() {
      $("#inputFile").click();
    },
    uploadChange(fileList) {
      let that=this;
      let files = fileList.target.files;
      if (files.length > 0) {
        var formData = new FormData();
        formData.append("file", files[0]);
        formData.append("token", that.userinfo.token);
        $.ajax({
            type: "POST",
            url: "https://admin.shitutu.com/public/api/common/upload",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(res) {
                console.log(res);
                document.getElementById("inputFile").value = "";
                if (res.code.code === 1) {
                  console.log(21312)
                    profile({
                        token:that.userinfo.token,
                        avatar:res.code.url
                    }).then(ress=>{
                        if(ress.code==1){
                            that.$vux.toast.text("修改成功", "middle");
                            console.log(ress)
                            that.userinfo.avatar=res.code.url;
                            store.set("userinfo",that.userinfo);
                            //   store.remove("userinfo");
                            //   window.setTimeout(() => {
                            //     that.$router.replace({ path: "/login" });
                            //   }, 500);
                        }else{
                            that.$vux.toast.text(ress.msg, "middle");
                        }
                    })

                } else {
                  that.$vux.toast.text(res.msg, "middle");
                }
            }
        });
      }
    },
    go_resetPhone(){
        this.$router.push({ path: "/resetPhone" });
    }
  },
  created() {
    this.userinfo = store.get("userinfo");
  }
};
</script>

<style lang="less" scoped>
.line {
  width: 100vw;
  height: 0.266667rem;
  background-color: #f2f3f4;
}
.resetPersonal {
  width: 100vw;
  .reset-item {
    height: 1.6rem;
    padding: 0 0.4rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.013333rem solid #dddddd;
    .reset-item-head {
      width: 1.28rem;
      height: 1.28rem;
    }
    .right-box {
      .reset-item-head {
        vertical-align: bottom;
      }
      .reset-item-more {
        width: 0.6rem;
        height: 0.84rem;
        margin-left: 0.266667rem;
      }
    }
  }
}
</style>
