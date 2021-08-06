import Vue from 'vue'
import Router from 'vue-router'
import Cookie from 'js-cookie'


Vue.use(Router)

//使用路由懒加载
const scrollBehavior = (to, from, savedPosition) => {
    return { x: 0, y: 0 }
}

export default new Router({
    scrollBehavior,
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: resolve => require(['@/view/index'], resolve),
            redirect: '/home',
            alias: '/home',
            children: [
                {
                    path: 'home',
                    component: resolve => require(['@/view/home/home'], resolve), //首页
                    meta: { title: '首页' }
                },
                {
                    path: 'classify',
                    component: resolve => require(['@/view/classify/classify'], resolve), //分类
                    meta: { title: '分类' }
                },
                {
                    path: 'favorite',
                    component: resolve => require(['@/view/favorite/favorite'], resolve), //分类
                    meta: { title: '收藏夹' }
                },
                {
                    path: 'mine',
                    component: resolve => require(['@/view/mine/mine'], resolve),  //我的
                    meta: { title: '我的' }
                }
            ]
        },
        {
            path: '/activityDetail',
            component: resolve => require(['@/view/activityDetail/activityDetail'], resolve)  //图片详情
        },
        {
            path: '/imgPreview',
            component: resolve => require(['@/view/activityDetail/imgPreview'], resolve)  //IOS图片展示
        },
        {
            path: '/membership',
            component: resolve => require(['@/view/membership/membership'], resolve)    //会员购买页
        },
        {
            path: '/redeemCode',
            component: resolve => require(['@/view/membership/redeemCode'], resolve)    //会员兑换页
        },
        {
            path: '/login',
            component: resolve => require(['@/view/login/login'], resolve)   //登录
        },
        {
            path: '/register',
            component: resolve => require(['@/view/login/register'], resolve)   //注册
        },
        {
            path: '/collection',
            component: resolve => require(['@/view/collection/collection'], resolve)
        },
        {
            path: '/forgetPwd',
            component: resolve => require(['@/view/reset/forgetPwd'], resolve)  //忘记密码
        },
        {
            path: '/resetPwd',
            component: resolve => require(['@/view/reset/resetPwd'], resolve)  //修改密码
        },
        {
            path: '/setting',
            component: resolve => require(['@/view/reset/setting'], resolve)  //设置
        },
        {
            path: '/payment',
            component: resolve => require(['@/view/order/payment'], resolve)  //订单支付
        },
        {
            path: '/resetPersonal',
            component: resolve => require(['@/view/reset/resetPersonal'], resolve)  //个人资料
        },
        {
            path: '/vipfree',
            component: resolve => require(['@/view/classify/vipfree'], resolve)  //会员免费
        },
        {
            path: '/submitrequire',
            component: resolve => require(['@/view/mine/submitrequire'], resolve)  //提交需求
        },
        {
            path: '/resetPhone',
            component: resolve => require(['@/view/reset/resetPhone'], resolve)  //绑定手机号
        },


        // 新版本
        {
            path: '/hotImg',
            component: resolve => require(['@/view/home/hotImg'], resolve),  //上周热图TOP20
            meta: { title: '上周热图TOP20' }
        },
        {
            path: '/search',
            component: resolve => require(['@/view/home/search'], resolve),  //搜索
            meta: { title: '搜索' }
        },
        {
            path: '/searchResult',
            component: resolve => require(['@/view/home/searchResult'], resolve),  //搜索结果
            meta: {
                title: '搜索结果',
                keepAlive:true
            }
        },
        {
            path: '/articleDetail',
            component: resolve => require(['@/view/activityDetail/articleDetail'], resolve),  //文章详情
            meta: { title: '文章详情' }
        },
        {
            path: '/copyrightNotice',
            component: resolve => require(['@/view/reset/copyrightNotice'], resolve),  //版权声明
            meta: { title: '版权声明' }
        },
        {
            path: '/serviceAgreement',
            component: resolve => require(['@/view/reset/serviceAgreement'], resolve),  //服务协议
            meta: { title: '服务协议' }
        },
      {
        path: '/downCard',
        component: resolve => require(['@/view/mine/downCard'], resolve)  //图片详情
      },
      {
        path: '/userDetail',
        component: resolve => require(['@/view/mine/userDetail'], resolve)  //图片详情
      },
    ]
})
