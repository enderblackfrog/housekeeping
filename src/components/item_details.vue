<template>
	<div class="item-details">
		<housekeeping-head title="服务详情"></housekeeping-head>
		<swiper auto :list="imgList" style="width:100%;" :aspect-ratio="1" dots-class="custom-bottom" dots-position="right" :show-desc-mask="false">
		</swiper>
		<div class="item-details-info">
			<div class="item-details-title">{{skus.title}}</div>
			<div class="item-details-introduce">{{skus.introduce}}</div>
			<div class="item-details-price">￥{{spuses[0].price / 100}}-{{spuses[1].price / 100}}</div>
			<p>总销量：{{skus.salesVolume}}</p>
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
      },
      initData(){
        this.$http({
          method:'post',
          url:'/api' + '/item_details.do',
          params:{
            spuId:1
          }
        }).then(({data})=>{
          console.log(data)
          this.detailDiagrams = data.data.detailDiagram;
          for (var i=0;i < data.data.mainPicture.length ; i++){
           this.mainPictures = data.data.mainPicture[i]
          }
          this.skus = data.data.sku;
          this.spuses = data.data.spus
        })
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
				setImgWidth: '',
        detailDiagrams:[],
        mainPictures:[],
        skus:[],
        spuses:[{}],
			}
		},

		created() {
			var width = this.getWindowWidth();
			if(width < 540){
				this.setImgWidth = this.getWindowWidth() * 0.96;
			}else{
				this.setImgWidth = 540 * 0.96;
			};
			this.initData();
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
