import Vue from 'vue'
import Router from 'vue-router'
import my_order from '@/components/my_order'
import home from '@/components/home'
import classfly from '@/components/classfly'
import p_center from '@/components/p_center'
import item_details from '@/components/item_details'
import user_service_info from '@/components/user_service_info'
import order_info from '@/components/order_info'
import user_address_admin from '@/components/user_address_admin'
import test from '@/components/test'
// 我的订单下面的二级路由
import ToPay from '@/pages/ToPay/ToPay'
import ToOrder from '@/pages/ToOrder/ToOrder'
import ToEvaluate from '@/pages/ToEvaluate/ToEvaluate'
import AfterSale from '@/pages/AfterSale/AfterSale'
// 申请退款页面
import Refund from '@/components/Refund/Refund'
//新人礼包
import Newlyweds from '../pages/Newlyweds/Newlyweds'
// 我的优惠券
import MyCoupon from '@/components/MyCoupon/MyCoupon'
// 登陆注册
import Login from '@/components/Login/Login'
// 确认预约时间
import Confirmation_time from '@/components/Confirmation_time'
//短信验证码页面
import chit from '@/components/chit'
Vue.use(Router);

export default new Router({
	routes: [{
		path: '/',
		redirect: 'home',
	}, {
		path: '/home',
		name: 'home',
		component: home,
	}, {
		path: '/my_order',
		name: 'my_order',
		component: my_order,
    children:[
      {
        path:'/',
        redirect:'topay'
        },
      {
        path:'topay',
        name:'ToPay',
        component:ToPay,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path:'toorder',
        name:'ToOrder',
        component:ToOrder,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path:'toevaluate',
        name:'ToEvaluate',
        component:ToEvaluate,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path:'aftersale',
        name:'AfterSale',
        component:AfterSale,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      }

        ],
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
	}, {
		path: '/classfly',
		name: 'classfly',
		component: classfly,
	}, {
		path: '/p_center',
		name: 'p_center',
		component: p_center,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
	}, {
		path: '/item_details',
		name: 'item_details',
		component: item_details,
	}, {
		path: '/user_service_info',
		name: 'user_service_info',
		component: user_service_info,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
	}, {
		path: '/order_info',
		name: 'order_info',
		component: order_info,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
	}, {
		path: '/user_address_admin',
		name: 'user_address_admin',
		component: user_address_admin,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
	},
    {
		path: '/test',
		name: 'test',
		component: test,
	},
    // 申请退款
    {
      path:'/refund',
      name:'Refund',
      component:Refund,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    // 新人福利
    {
      path:'/newlyweds',
      name:'Newlyweds',
      component:Newlyweds,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    // 我的优惠卷
    {
      path:'/mycoupon',
      name:'MyCoupon',
      component:MyCoupon,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    // 登陆注册
    {
      path:'/login',
      name:'Login',
      component:Login,
    },
    // 确认预约时间
    {
      path:'/confirmation_time',
      name:'Confirmation_time',
      component:Confirmation_time,
    },
    {
      path:'/chit',
      name:'chit',
      component:chit
    }
  ]
})
