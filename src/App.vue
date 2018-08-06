<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
  import {mapActions} from 'vuex'
	export default {
		name: 'app',
    methods:{
      ...mapActions(['getServiceAddressList','getLogin']),
    },
    mounted(){
		  this.getServiceAddressList();
		  // this.getCoupons();
    }
	}
</script>

<style lang="less">
	/*@import '~vux/src/styles/reset.less';*/

	@import './assets/less/base.less';
	@import './assets/less/home.less';
	@import './assets/less/classfly.less';
	@import './assets/less/my_order.less';
	@import './assets/less/p_center.less';
	@import './assets/less/item_details.less';
	@import './assets/less/user_service_info';
	#app {
		max-width: 540px;
		margin: 0 auto;
		font-family: "黑体";
		background-color: @housekeeping_body_color;
		a {
			text-decoration: none;
		}
		a:hover,
		a:visited,
		a:active {
			color: #333333;
		}
	}

	* {
		padding: 0;
		margin: 0
	}
</style>
