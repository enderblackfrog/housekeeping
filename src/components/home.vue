<template>
	<div id="home">
		<housekeeping-head title="家政LOGO"></housekeeping-head>
		<swiper :list="imgList" auto style="width:100%;" height="150px" dots-class="custom-bottom" dots-position="right" :show-desc-mask="false"></swiper>
		<div class="subject">
			<div class="nav">
				<div class="nav-bar" @click="goNew">
					<div class="nav-bar-icon">
						<img :src="nav_bar[0]">
					</div>
					<p class="nav-text">新人专享</p>
				</div>
				<div class="nav-bar">
					<div class="nav-bar-icon">
						<img :src="nav_bar[1]">
					</div>
					<p class="nav-text">每日推荐</p>
				</div>
				<div class="nav-bar">
					<div class="nav-bar-icon">
						<img :src="nav_bar[2]">
					</div>
					<p class="nav-text">领劵中心</p>
				</div>
				<div class="nav-bar">
					<div class="nav-bar-icon">
						<img :src="nav_bar[3]">
					</div>
					<p class="nav-text">会员专属</p>
				</div>
			</div>
			<div class="service-plate">
				<div class="service-plate-left">
					<img src="../assets/img/servce/home_cleaning.png"/>
				</div>
				<div class="service-plate-right">
					<div>钟点保洁</div>
					<div>超值包月</div>
					<div>新居开荒</div>
					<div>搽玻璃</div>
				</div>
			</div>
			<div class="service-plate">
				<div class="service-plate-left">
					<img src="../assets/img/servce/family_assistant.png"/>
				</div>
				<div class="service-plate-right">
					<div>住家保姆</div>
					<div>白班保姆</div>
					<div>育儿嫂</div>
					<div>月嫂</div>
				</div>
			</div>
			<div class="service-plate">
				<div class="service-plate-left">
					<img src="../assets/img/servce/healthy_life.png"/>
				</div>
				<div class="service-plate-right">
					<div>窗帘清洗</div>
					<div>空调清洗</div>
					<div>油烟机清洗</div>
					<div>更多》</div>
				</div>
			</div>
		</div>
    <!--精品推荐-->
		<div class="housekeeping-item">
			<div class="jing-ping-tui-jian">
				<div class="housekeeping-item-title">精品推荐</div>
				<div class="housekeeping-item-items" v-for="(forYou , index) in ForYou" :key="index" @click="goDetails(forYou.sku.id)" >
					<div class="housekeeping-item-items-left">
						<img :src="forYou.img.src">
					</div>
					<div class="housekeeping-item-items-right">
						<div class="housekeeping-item-items-name">{{forYou.sku.title}}</div>
						<div class="housekeeping-item-items-point">{{forYou.sku.introduce}}</div>
						<div class="housekeeping-item-items-tag">
							<span>冠名单品</span>
						</div>
						<div class="housekeeping-item-items-price">￥{{forYou.spu.price / 100}}/人&nbsp;&nbsp;<span>￥199</span></div>
					</div>
				</div>
			</div>
      <!--为您优选-->
			<div class="wei-nin-you-xuan">
				<div class="housekeeping-item-title">为您优选</div>
				<div class="housekeeping-item-items" v-for="(recommend , index) in Recommend" :key="index">
					<div class="housekeeping-item-items-left">
						<img :src="recommend.img.src">
					</div>
					<div class="housekeeping-item-items-right">
						<div class="housekeeping-item-items-name">{{recommend.sku.title}}</div>
						<div class="housekeeping-item-items-point">{{recommend.sku.introduce}}</div>
						<div class="housekeeping-item-items-price">￥{{recommend.spu.price / 100}}/人&nbsp;&nbsp;<span>￥759</span></div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer-margin"></div>
		<div id="star-five"></div>
		<housekeeping-foot-nav iconIndex="0"></housekeeping-foot-nav>
	</div>
</template>

<script>
	import banner0 from '../assets/img/banner/banner0.jpg'
	import banner1 from '../assets/img/banner/banner1.jpg'
	import recommend from '../assets/icon/recommend.png'
	import vip_center from '../assets/icon/vip_center.png'
	import new_guest_exclusive from '../assets/icon/new_guest_exclusive.png'
	import coupon from '../assets/icon/coupon.png'
	import { Swiper } from 'vux'
  import RouterLink from "vant/es/mixins/router-link";
	export default {
		components: {
      RouterLink,
			Swiper,
		},
		data() {
			return {
				imgList: [{
					url: 'javascript:',
					img: banner0,
				},
				{
					url: 'javascript:',
					img: banner1,
				},
				{
					url: 'javascript:',
					img: banner0,
				}],
				banner: banner0,
				nav_bar: [new_guest_exclusive, recommend, coupon, vip_center],

        ForYou:[],
        Recommend:[]
			}
		},
    methods:{
      goNew(){
        this.$router.push('/Newlyweds')
      },
      initData(){
        this.$http({
          method:'post',
          url:'/api' + '/home.do'
        }).then(({data}) => {
          this.ForYou = data.data.forYou;
          this.Recommend = data.data.recommend;
          console.log(data)
        })
      },
      goDetails(skuId){
        this.$router.push({name:'item_details',query:{skuId:skuId}});
      }
    },
    created(){
		  this.initData()
    }
	}
</script>

<style>

</style>
