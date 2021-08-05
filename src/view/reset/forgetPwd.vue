<template>
    <div class="forgetPwd">
        <x-header class="title" :left-options="{backText: ''}">忘记密码</x-header>
        <div class="input-box">
            <input v-model="mobile" type="text" placeholder="请输入手机号">
            <div class="code-box">
                <input v-model="captcha" type="text" placeholder="请输入验证码" class="code-input">
                <div class="send-code" @click="sms_send" :class="{gray:timer==0}">{{codeTips}}</div>
            </div>
            <input v-model="newpassword" type="password" placeholder="请输入新密码">
        </div>
        <div class="confirm-btn" @click="confirm">确定</div>
    </div>
</template>

<script>
import store from "store";
import {XHeader} from 'vux'
import {resetPwd,smsSend} from '../../http/api.js'
export default {
    components:{
        XHeader
    },
    data(){
        return{
            mobile:'',
            captcha:'',
            newpassword:'',
            timer:1,
            codeTips:'获取验证码'
        }
    },
    methods:{
        sms_send(){ //获取验证码   
            let data={
                mobile:this.mobile,
                event:'resetpwd'
            }
            smsSend(data).then((res)=>{
                console.log(res)
                if(res.code==1){
                    if(this.timer==1){
                        var time=60;
                        var inter=window.setInterval(()=>{
                            this.codeTips="重新获取("+time+"s)";
                            this.timer=0;
                            time--;
                            console.log(time)
                            if(time<0){
                                window.clearInterval(inter)
                                this.timer=1;
                                this.codeTips="获取验证码"
                            }
                        },1000)
                    }
                }else{
                    this.$vux.toast.text(res.msg, 'middle')
                }
            })
        },
        confirm(){  //确定
            let params={
                mobile:this.mobile,
                newpassword:this.newpassword,
                captcha:this.captcha,
            }
            resetPwd(params).then(res=>{
                console.log(res)
                if(res.code==1){
                    this.$vux.toast.text("重置密码成功", 'middle')
                    store.remove("userinfo")
                    window.setTimeout(()=>{
                        this.$router.replace({path:'/login'})
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
    .gray{
        background-color: gray;
        color: #fff !important;
    }
    .forgetPwd{
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
            .code-box{
                height:1.733333rem;
                border-bottom: .013333rem solid #D8D6D9;
                display: flex;
                justify-content: space-between;
                align-items: center;
                input{
                    height:1.7rem;
                    border: none;
                    padding:0 .426667rem;
                    box-sizing: border-box;
                    color: #D8D6D9;
                }
                .send-code{
                    width: 3.146667rem;
                    height: 1.066667rem;
                    border: 1px solid #ECEBED;
                    text-align: center;
                    line-height: 1.066667rem;
                    color: #D8D6D9;
                    border-radius: .106667rem;
                    margin-right: .4rem;
                }
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
