<template>
	<div class="housekeeping-footer">
		<div class="tab-bar"
			 v-for="(icon,index) in icons"
			 :class="{'selected':index == iconIndex}">
			<router-link :to="icon.url">
				<div class="tab-bar-icon"><img :src="index == iconIndex ? icon.jihuo : icon.weijihuo" width="30"></div>
			</router-link>
			<div class="tab-bar-text">{{icon.name}}</div>
		</div>
	</div>
</template>

<script>
	import icon_home from '@/assets/icon/home.png'
	import icon_home1 from '@/assets/icon/home1.png'
	import icon_classfly from '@/assets/icon/classfly.png'
	import icon_classfly1 from '@/assets/icon/classfly1.png'
	import icon_order from '@/assets/icon/order.png'
	import icon_order1 from '@/assets/icon/order1.png'
	import icon_p_center from '@/assets/icon/p_center.png'
	import icon_p_center1 from '@/assets/icon/p_center1.png'

	export default {
		props:{
			iconIndex:String,
		},
		data() {
			return {
				icons: [{
					name:'主页',
					jihuo: icon_home1,
					weijihuo: icon_home,
					url: "home"
				}, {
					name:'分类',
					jihuo: icon_classfly1,
					weijihuo: icon_classfly,
					url: "classfly"
				}, {
					name:'我的订单',
					jihuo: icon_order1,
					weijihuo: icon_order,
					url: "my_order"
				}, {
					name:'个人中心',
					jihuo: icon_p_center1,
					weijihuo: icon_p_center,
					url: "p_center"
				}]
			}
		}
	}

	// // 判断路由
  // router.beforeEach((to, from, next) => {
  //   if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
  //     if (store.state.token) {  // 通过vuex state获取当前的token是否存在
  //       next();
  //     }
  //     else {
  //       next({
  //         path: '/login',
  //         query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
  //       })
  //     }
  //   }
  //   else {
  //     next();
  //   }
  // })
</script>

<style>

</style>
