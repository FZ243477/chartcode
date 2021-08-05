<template>
    <div class="register">
        <x-header class="title" :left-options="{backText: ''}">修改密码</x-header>
        <div class="input-box">
            <input v-model="old" type="password" placeholder="请输入旧密码" class="phone-input">
            <input v-model="password" type="password" placeholder="请输入新密码" class="phone-input">
        </div>
        <div class="confirm-btn" @click="confirm">确定</div>
    </div>
</template>

<script>
import store from "store";
import {XInput,Group,XButton,XHeader} from 'vux'
import {resetPwdt} from '../../http/api.js'
export default {
    components:{
        XInput,
        Group,
        XButton,
        XHeader
    },
    data(){
        return{
            password:"",
            old:""
        }
    },
    methods:{
        confirm(){  //确定
            let params={
                token:store.get("userinfo").token,
                password:this.password,
                old:this.old
            }
            resetPwdt(params).then(res=>{
                if(res.code==1){
                    this.$vux.toast.text('修改密码成功', 'middle');
                    store.remove("userinfo");
                    window.setTimeout(()=>{
                        this.$router.replace({path:'/login'})
                    },500)
                }else{
                    this.$vux.toast.text(res.msg, 'middle')
                }
            })
        },
        register(){ //注册
            let params={
                username:this.username,
                password:this.password,
                mobile:this.mobile,
                captcha:this.captcha
            }
            let checkParams={
                mobile:this.mobile,
                event:'register',
                captcha:this.captcha
            }
            // sms_check(checkParams).then((res)=>{
            //     console.log(res)
            //     if(res.code==1){
            //         register(params).then((res)=>{
            //             console.log(res)
            //             if(res.code==1){
            //                 _this.$vux.toast.text('注册成功', 'middle')
            //             }else{
            //                 _this.$vux.toast.text(res.msg, 'middle')
            //             }
            //         })
            //     }else{
            //         _this.$vux.toast.text(res.msg, 'middle')
            //     }
            // })
        },
        sms_send(){ //获取验证码
            var _this=this;        
            let data={
                mobile:_this.mobile,
                event:'register'
            }
            smsSend(data).then((res)=>{
                console.log(res)
                if(res.code==1){
                    if(_this.timer==1){
                        var time=5;
                        var inter=window.setInterval(()=>{
                            _this.codeTips="重新获取("+time+"s)";
                            _this.timer=0;
                            time--;
                            console.log(time)
                            if(time<0){
                                window.clearInterval(inter)
                                _this.timer=1;
                                _this.codeTips="获取验证码"
                            }
                        },1000)
                    }
                }else{
                    _this.$vux.toast.text(res.msg, 'middle')
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
    .register{
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
