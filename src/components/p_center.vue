<template>
	<div style="margin-bottom: 60px;">
		<housekeeping-head title="个人中心"></housekeeping-head>
		<div class="p-center" v-if="">
      <div class="p-center-photos"><img :src="user.photos"></div>
			<div class="p-center-info">
				<div>ID：{{user.id}}</div>
				<div>用户名：{{user.name}}</div>
				<div>绑定手机：{{user.telephone}}</div>
			</div>
		</div>
		<div class="p-relevant">
			<div class="div1">积分签到</div>
		</div>
		<div class="p-relevant">
			<div class="div1">领取微信会员卡</div>
		</div>
		<div class="p-relevant">
			<div class="div1">领取优惠券</div>
			<div class="div1" @click="goMyCoupon">我的优惠券</div>
		</div>
		<div class="p-relevant">
			<div class="div1">我的关注</div>
			<div class="div1">我的足迹</div>
		</div>
		<div class="p-relevant">
			<div class="div1">充值记录</div>
		</div>
		<div class="p-relevant">
			<router-link to="user_address_admin">
				<div class="div1">服务地址管理</div>
			</router-link>
		</div>
    <van-button size="large" type="danger">退出登陆</van-button>
		<housekeeping-foot-nav iconIndex="3"></housekeeping-foot-nav>
	</div>
</template>

<script>
	import photos from '@/assets/user/user.jpg'
  import picture from '@/assets/user/nolog.png'
	export default {
		data() {
			return {
				user: {
					photos: photos,
					name: '陈浩',
					telephone: '18008399969',
					id: '12580'
				},
        nolog:{
				  picture:picture,
          name:'未登陆',
        }
			}
		},
    methods:{
		  // 跳转我的优惠卷
		  goMyCoupon(){
		    this.$router.push('/mycoupon')
      },
    }
	}
</script>

<style lang="less" scoped>
  @import url("../assets/less/base.less");

</style>
