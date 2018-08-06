<template>
	<div class="item-details">
		<housekeeping-head title="服务详情"></housekeeping-head>
		<swiper auto :list="imgList" style="width:100%;" :aspect-ratio="1" dots-class="custom-bottom" dots-position="right" :show-desc-mask="false">
		</swiper>
		<div class="item-details-info">
			<div class="item-details-title">超值包月套餐</div>
			<div class="item-details-introduce">建议面积：80㎡及以下（2次）</div>
			<div class="item-details-price">￥299</div>
			<p>总销量：89</p>
		</div>
		<div class="item-relevant">
			<div>服务范围：重庆</div>
			<div>规格</div>
		</div>
		<div class="item-details-img">
			<p>商品详情</p>
			<div>
				<img :src="details" :width="setImgWidth" style="">
			</div>
		</div>
    <div class="C_P">
      <a class="img_bt" href="javascript:;">
        <img src="../assets/img/servce/C_service.png" alt="">
      </a>
      <a class="blue_bt" href="javascript:;" @click="goTo('/order_info')">现在下单</a>
    </div>
	</div>
</template>

<script>
	import { Swiper } from 'vux'
	import item0 from '@/assets/details/item0.jpg'
	import item1 from '@/assets/details/item1.jpg'
	import item2 from '@/assets/details/item2.png'
	import details from '@/assets/details/12.jpg'
  // import C_service from '@/assets/img/servce/C_service.png'

	export default {
    methods: {
      goTo(path){
        this.$router.replace(path)
      }
    },
		components: {
			Swiper
		},
		data() {
			return {
				imgList: [{
						url: 'javascript:',
						img: item0,
					},
					{
						url: 'javascript:',
						img: item1,
					},
					{
						url: 'javascript:',
						img: item2,
					}
				],
				details: details,
				setImgWidth: ''
			}
		},

		created() {
			var width = this.getWindowWidth();
			if(width < 540){
				this.setImgWidth = this.getWindowWidth() * 0.96;
			}else{
				this.setImgWidth = 540 * 0.96;
			}
		},
	}
</script>

<style>
/*.item-details-img div{
	width:375px;
	background-image: url(../assets/details/12.jpg);
	background-size: cover;
}*/
  .C_P{display: flex;justify-content: space-between;align-items: center;position: fixed;bottom: 0;width: 100%;background-color: white;box-sizing: border-box;border: 1px solid #cccccc}
  .min_font{font-size: 12px}
  .img_bt{display: block;width: 30%;text-align: center}
  .blue_bt{display: block;background-color: #0db9f1;color: white;width: 70%;
    height: 49px;line-height: 49px;text-align: center}
</style>
