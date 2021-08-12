<template>
  <div class="favorite" style="padding-bottom:1.17rem;">
    <Header></Header>
    <div class="list">
      <div class="list-item_logo">
        <input id="inputFile" type="file" hidden="hidden" @change="uploadChange"/>
        <img :src="userinfo.avatar" class="reset-item-head user_detail_logo" @click="uploadClick"/>
        <div class="user_detail_logo_text">更换头像</div>
      </div>
<!--      <div class="reset-item">-->
<!--        <div class="reset-item-title">修改头像</div>-->
<!--        <div class="right-box">-->
<!--          <img class="reset-item-head" :src="userinfo.avatar">-->
<!--          <input id="inputFile" type="file" hidden @change="uploadChange">-->
<!--          <img class="reset-item-more" src="@/assets/img/home/right.png" @click="uploadClick">-->
<!--        </div>-->
<!--      </div>-->

      <div class="list-item">
        <div>性别</div>
        <div class="user_select_div">
          <select id="sex" class="user_detail_select" v-model="sexSelected" @change="getSexSelected">
            <option v-for="(item,index) in sex"   :key="index" :value="item.value">{{item.name}}</option>
          </select>
        </div>
        <img src="@/assets/img/home/right2.png" />
      </div>



      <div class="list-item" @click="bindShow">
        <div>地区</div>
          <div class="area_area">
            <div class="area_area_text" > {{valueArea}}</div>
            <!--选择省市区-->
<!--            <van-popup v-model="showArea" position="bottom" :style="{ height: '40%' }">-->
<!--              <van-area :area-list="areaList" @confirm="onAreaConfirm" @cancel="bindCancel" />-->
<!--            </van-popup>-->
          </div>
        <img src="@/assets/img/home/right2.png" />
      </div>

<!--      <van-field readonly required clickable label="选择地区" :value="valueArea" placeholder="请选择所在地区" @click="bindShow" />-->

      <!--选择省市区-->
      <van-popup v-model="showArea" position="bottom" :style="{ height: '40%' }">
        <van-area :area-list="areaList" @confirm="onAreaConfirm" @cancel="bindCancel" />
      </van-popup>

      <div  class="list-item">
        <div>类型</div>
        <div  class="user_select_div">
          <select  id="cate_type" class="user_detail_select" v-model="cateTypeSelected" @change="getCateTypeSelected">
            <option v-for="(item,index) in cateType"  :key="index" :value="item.value">{{item.name}}</option>
          </select>
        </div>
        <img src="@/assets/img/home/right2.png" />
      </div>

      <div onclick="event.cancelBubble = true" class="list-item">
        <div>品牌</div>
        <div class="area_area" @click="writePinpai">
          <div class="area_area_text">{{pingpaiValue}}</div>
          <div onclick="event.cancelBubble = true" :class="{'display_show':writeShow === true,'display_none':writeShow === false}"
               class="requirements_shadow " @click="closePinpai"
               style="z-index: 1;" ref="homePage" >
            <div onclick="event.cancelBubble = true" class="brand_alert">
              <div class="van-cell-group van-hairline--top-bottom" style="margin-top: 0.45rem;">
                <div class="input_textarea van-cell van-field van-field--min-height">
                  <div class="van-cell__value van-cell__value--alone van-field__value">
                    <div class="van-field__body">
                      <textarea placeholder="请输入......" v-model="pingpai" class="van-field__control"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="down_img" @click="surePingpai()" style="margin-top: 0.3rem;">
                确定
              </div>
            </div>
          </div>
        </div>
        <img src="@/assets/img/home/right2.png"/>
       </div>

      <div class="list-item">
        <div>细分行业</div>
        <div class="user_select_div">
          <select id="industry" class="user_detail_select" v-model="industrySelected" @change="getIndustrySelected">
            <option v-for="(item,index) in industry"  :key="index" :value="item.value">{{item.name}}</option>
          </select>
        </div>
        <img src="@/assets/img/home/right2.png"/>
      </div>

      <div class="list-item">
        <div>图片更新频率</div>
        <div class="user_select_div">
          <select id="frequency" class="user_detail_select" v-model="frequencySelected" @change="getFrequencySelected">
            <option v-for="(item,index) in frequency"  :key="index" :value="item.value">{{item.name}}</option>
          </select>
        </div>
        <img src="@/assets/img/home/right2.png"/>
      </div>

      <div style="height: 3rem;">
        <div class="confirm-btn" @click="saveMessage" style="margin: 1rem auto 0px;">
          保存
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import store from "store";
import { index, loadMore, userIndex, seeMyCollection, collection,delCollection,upload,profile,saveUserDetail,DetailMessage } from "../../http/api.js";
import areaList from '../../assets/js/area.js'
import { XHeader, Tab, TabItem, Scroller, LoadMore, Swiper, SwiperItem } from "vux";
import { NavBar, Grid, GridItem, Checkbox, CheckboxGroup, Toast, Empty } from "vant";
import $ from "jquery";
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
      checkAllList:[],
      areaList: areaList, //引用地区信息
      showArea: false,
      valueArea: '', //地区值
      arrArea: [], //存放地区数组
      clientHeight: '',
      pingpai:'',
      pingpaiValue:'',
      sexSelected:'',
      cateTypeSelected:'',
      industrySelected:'',
      frequencySelected:'',
      sex:[
        {value:1,name:'男'},
        {value:2,name:'女'},
      ],
      cateType:[
        {value:1,name:'外卖'},
        {value:2,name:'堂食'},
        {value:3,name:'都有'},
      ],
      industry:[
        {value:4,name:'饺子馄饨'},
        {value:5,name:'快餐便当'},
        {value:6,name:'汉堡薯条'},
        {value:7,name:'意面披萨'},
        {value:8,name:'包子粥铺'},
        {value:9,name:'米粉面馆'},
        {value:10,name:'麻辣烫冒菜'},
        {value:11,name:'川湘菜'},
        {value:12,name:'东北菜'},
        {value:13,name:'西北菜'},
        {value:14,name:'江浙菜'},
        {value:15,name:'地方菜系'},
        {value:16,name:'炸鸡炸串'},
        {value:17,name:'特色小吃'},
        {value:18,name:'精致西餐'},
        {value:19,name:'夹馍饼类'},
        {value:20,name:'鸭脖卤味'},
        {value:21,name:'日料寿司'},
        {value:22,name:'韩式料理'},
        {value:23,name:'香锅干锅'},
        {value:24,name:'火锅串串'},
        {value:25,name:'龙虾烧烤'},
        {value:26,name:'轻食沙拉'},
      ],
      frequency:[
        {value:4,name:'每月更新'},
        {value:5,name:'每季更新'},
        {value:6,name:'半年更新'},
        {value:7,name:'每年更新'},
      ],
      writeShow:false
    };
  },
  mounted() {
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`          //document.body.clientWidth;
    //console.log(self.clientHeight);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };
  },
  watch:{
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function () {
      this.changeFixed(this.clientHeight)
    },
    result:function(v,o){
      if(v.length==this.collectData.length){
        this.checked = true;
      }else{
        this.checked = false;
      }
    }
  },
  methods: {
    changeFixed(clientHeight) {                        //动态修改样式
      console.log(clientHeight);
      this.$refs.homePage.style.height = clientHeight + 'px';
      console.log( this.$refs.homePage.style.height,' this.$refs.homePage.style.height')
    },
    saveMessage(){
      console.log(this.userinfo.id,88889)
      saveUserDetail({
        user_id:this.userinfo.id,
        user_name:this.userinfo.nickname,
        address:this.valueArea,
        sex_id:this.sexSelected,
        cate_type:this.cateTypeSelected,
        brand:this.pingpaiValue,
        industry:this.industrySelected,
        frequency:this.frequencySelected
      }).then(res=>{
        if (res.code == 1) {

        } else {
          Toast(res.msg);
        }
      })
    },
    writePinpai(){
      if(this.writeShow === false){
        this.writeShow = true
      }
    },
    closePinpai(){
      if(this.writeShow === true ){
        this.writeShow = false
      }
    },
    surePingpai(){
      this.pingpaiValue = this.pingpai
      if(this.writeShow === true ){
        this.writeShow = false
      }
    },
    getSexSelected(){
      //获取选中的优惠券
      console.log(this.sexSelected)
    },
    getCateTypeSelected(){
      //获取选中的优惠券
      console.log(this.cateTypeSelected)
    },
    getIndustrySelected(){
      //获取选中的优惠券
      console.log(this.industrySelected)
    },
    getFrequencySelected(){
      //获取选中的优惠券
      console.log(this.frequencySelected)
    },
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
            document.getElementById("inputFile").value = "";
            if (res.code.code === 1) {
              profile({
                token:that.userinfo.token,
                avatar:res.code.url
              }).then(ress=>{
                if(res.code.code === 1){
                  that.$vux.toast.text("修改成功", "middle");
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
    bindShow(){
      this.showArea= true;
    },
    bindCancel(){
      this.showArea= false;
    },
    //地区选择
    onAreaConfirm(val) {
      this.showArea = false;
      this.arrArea = val;
      var addrInfo = val[0].name + '/' + val[1].name + '/' + val[2].name;
      this.valueArea = addrInfo
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
      DetailMessage({
        user_id:this.userinfo.id
      }).then(res => {
        if (res.code === 1 && res.data.edit_type === 1) {
          this.sexSelected = res.data.sex_id;
          this.cateTypeSelected = res.data.cate_type;
          this.industrySelected = res.data.industry;
          this.frequencySelected = res.data.frequency;
          this.valueArea = res.data.address;
          this.pingpaiValue = res.data.brand;
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
     this.getData();
    this.getCollect();
    this.sexSelected = this.sex[0].value;
    this.cateTypeSelected = this.cateType[0].value;
    this.industrySelected = this.industry[0].value;
    this.frequencySelected = this.frequency[0].value;
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
