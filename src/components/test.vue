<template>
	<div>
    <van-coupon-cell
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showList = true"
    />
    <!-- 优惠券列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
	</div>
</template>

<script>
  const coupon = {
    available: 1,
    discount: 0,
    denominations: 150,
    origin_condition: 0,
    reason: '',
    value: 150,
    name: '我的优惠吧',
    start_at: 1489104000,
    end_at: 1514592000
  };
	export default {
		// props: {
		// 	title: String
		// },
		// created() {
		// 	this.my_iframe = screen.availWidth * 0.72;
		// },
		data() {
			return {
        chosenCoupon: -1,
        coupons: [coupon],
        disabledCoupons: [coupon],
        showList:false
			}
		},
    methods: {
      onChange(index) {
        this.showList = false;
        this.chosenCoupon = index;
      },
      onExchange(code) {
        this.coupons.push(coupon);
      }
    }

	}
</script>
<style>
	.my-iframe {
		width: 100%;
	}
</style>
