<template>
    <div class="redeemCode">
        <x-header class="title" :left-options="{backText: ''}">会员兑换</x-header>
        <div class="input-box">
            <input v-model="code" type="text" placeholder="请输入兑换码" class="phone-input">
        </div>
        <div class="confirm-btn" @click="confirm">确定</div>
    </div>
</template>

<script>
import store from "store";
import {XHeader} from 'vux'
import {useRedeemCode} from '../../http/api.js'
export default {
    components:{
        XHeader
    },
    data(){
        return{
            code:""
        }
    },
    methods:{
        confirm(){  //确定
            useRedeemCode({
                token:store.get("userinfo").token,
                code:this.code
            }).then(res=>{
                console.log(res)
                if(res.code==1){
                    this.$vux.toast.text('会员兑换成功', 'middle');
                    window.setTimeout(()=>{
                        this.$router.replace({path:'/mine'})
                    },500)
                }else{
                    this.$vux.toast.text(res.msg, 'middle')
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    input::-webkit-input-placeholder {
        color: #D8D6D9;
    }
    .redeemCode{
        width:100vw;
        .input-box{
            >input{
                width:100%;
                height:1.733333rem;
                border: none;
                border-bottom: .013333rem solid #D8D6D9;
                padding:0 .426667rem;
                box-sizing: border-box;
                color: #D8D6D9;
            }
        }
        .confirm-btn{
            width: 6.666667rem;
            height:1.066667rem;
            border-radius: .56rem;
            font-size: .48rem;
            text-align: center;
            line-height:1.066667rem;
            margin:1.44rem auto 0;
            color: #fff;
            background-color: #4E83FE;
        }
    }
</style>
