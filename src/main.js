import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router/index.js'
import foot_nav from './components/foot_nav'
import head from './components/head'
import test from './components/test'
import { AjaxPlugin } from 'vux'
import  { AlertPlugin } from 'vux'
import  { ConfirmPlugin } from 'vux'
import Vuex from 'vuex'
import store from './store'
import {getCookie} from "./util/util";



// vant
import { CouponCell, CouponList } from 'vant';
import { Popup } from 'vant';
import { Dialog } from 'vant';
import { Icon } from 'vant';
import { Button } from 'vant';
import { Row, Col } from 'vant';
import { Collapse, CollapseItem } from 'vant';


// import axios from 'axios'
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(AjaxPlugin);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(Popup);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Row).use(Col);

Vue.use(CouponCell).use(CouponList);
Vue.use(Collapse).use(CollapseItem);

/*const routes = [{
  path: '/',
  component: Home
}]*/


const router = routes;

FastClick.attach(document.body);

Vue.config.productionTip = false;
Vue.component('housekeeping-foot-nav', foot_nav);
Vue.component('housekeeping-head', head);
Vue.component('test', test);
Vue.prototype.goToPage = function(url) {
	if(typeof url === 'number') {
		router.go(url);
	} else {
		router.push(url);
	}
};
Vue.prototype.getWindowHeight = function() {
	return screen.availHeight;
};
Vue.prototype.getWindowWidth = function() {
	return screen.availWidth;
};


//路由拦截器
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (getCookie('isLogin') == 'true') {
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}// 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});
/*Vue.http = axios;
Vue.prototype.$http = axios.create({
	baseURL: 'http://localhost:8082/',
	timeout: 5000,
	paramsSerializer: function(params) {
		return qs.stringify(params, {
			arrayFormat: 'brackets'
		})
	}
});*/
/* eslint-disable no-new */
/*Vue.prototype.$http.create({
	baseURL: 'http://localhost:8082/',
	timeout: 5000,
})*/
// Vue.prototype.$http.defaults.baseURL ="http://192.168.2.236:8082/";

new Vue({
	router,
  store,
	render: h => h(App)
}).$mount('#app-box');
