<template>
	<div class="item-details">
		<housekeeping-head title="服务详情"></housekeeping-head>
		<swiper auto :list="mainPictures" style="width:100%;" :aspect-ratio="1" dots-class="custom-bottom" dots-position="right" :show-desc-mask="false">
		</swiper>
		<div class="item-details-info">
			<div class="item-details-title">{{skus.title}}</div>
			<div class="item-details-introduce">{{skus.introduce}}</div>
			<div class="item-details-price">
        ￥{{spuses[0].price / 100}}-{{spuses[spuses.length-1].price / 100}}
        <span style="font-size: 15px;color: silver;text-decoration: line-through"></span>
      </div>
      <p>总销量：{{skus.salesVolume}}</p>
		</div>
		<div class="item-relevant">
			<div>服务范围：重庆</div>
			<div>规格</div>
		</div>
		<div class="item-details-img">
			<p>商品详情</p>
			<div v-for="(detailDiagram , index) in detailDiagrams" :key="index">
				<img :src="detailDiagram.src" :width="setImgWidth" style="">
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
	// import details from '@/assets/details/12.jpg'
  // import C_service from '@/assets/img/servce/C_service.png'

	export default {
    methods: {
      goTo(path){
        this.$router.replace(path)
      },
      initData(skuId){
        this.$http({
          method:'post',
          url : '/api' + '/item_details.do',
          params:skuId
        }).then(({data}) =>{
          console.log(data);
          var mainPictures = [];
          for (var i = 0 ; i < data.data.mainPicture.length; i++) {
            var mainPicture = {};
            mainPicture.url = 'javascript:';
            mainPicture.img = data.data.mainPicture[i].src;
            mainPictures.push(mainPicture);
          }
          this.mainPictures = mainPictures;
          this.skus = data.data.sku;
          this.spuses = data.data.spus;
          this.detailDiagrams = data.data.detailDiagram;
          // for(var i = 0 ; i < spus.length; i++ ){
          //
          // }
          // console.log(this.mainPictures[0].src)
        })
      }
    },
    // watch:{
    //   mainPictures:function(newQuestion){
    //     this.img = this.mainPictures;
    //   }
    // },
		components: {
			Swiper
		},
		data() {
			return {
				setImgWidth: '',
        mainPictures:[],
        detailDiagrams:[],
        skus:{},
        spuses:[{}],
        // img:[]
			}
		},

		created() {
			var width = this.getWindowWidth();
			if(width < 540){
				this.setImgWidth = this.getWindowWidth() * 0.96;
			}else{
				this.setImgWidth = 540 * 0.96;
			}
      this.initData(this.$route.query);
			console.log(this.$route.query);
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
