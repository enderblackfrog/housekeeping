<template>
	<div>
		<housekeeping-head title="我的订单"></housekeeping-head>
		<div class="my-order">
      <div class="link_box">
        <router-link :class="{on_line:'/my_order/topay'===$route.path}" to="topay" replace>待付款</router-link>
        <router-link :class="{on_line:'/my_order/toorder'===$route.path}" to="toorder" replace>待预约</router-link>
        <router-link :class="{on_line:'/my_order/toevaluate'===$route.path}" to="toevaluate" replace>待评价</router-link>
        <router-link :class="{on_line:'/my_order/aftersale'===$route.path}" to="aftersale" replace>退款/售后</router-link>
      </div>
      <router-view/>
		</div>
		<!--<housekeeping-foot-nav iconIndex="2"></housekeeping-foot-nav>-->
	</div>
</template>
<script>
	// import unpaid from '@/assets/icon/unpaid.png'
	// import subscribe from '@/assets/icon/subscribe.png'
	// import evaluate from '@/assets/icon/evaluate.png'
	// import after_sale from '@/assets/icon/after_sale.png'
  // import { Datetime } from 'vux'


	export default {
		methods: {
      // goTo(path){
      //   this.$router.replace(path)
      // }
		}
	}
</script>

<style>
  .link_box{display: flex;justify-content:space-around;background-color: white;margin-bottom: 5px}
  .link_box>a{display: inline-block;width: 20%;text-align: center;padding: 3% 0}
  .on_line{border-bottom: 2px solid #00b9f6}
</style>
