<template>
	<div>
		<housekeeping-head title="家政LOGO"></housekeeping-head>
		<div class="banner"></div>
		<div id="sidebar" class="sidebar" :style="sidebarHeight">
			<div v-for="(classfly,index) in classflys" :class="{'active':ind === index}" @click="addActive(index)">{{classfly.skuClassflyName}}</div>
		</div>
		<div class="classfly-show" :style="sidebarHeight">
			<div class="classfly-show-row">
				<div class="classfly-show-row-item" v-for="(sku,index) in classflyToSkus">
					<router-link to="item_details">
						<div class="box">
							<img :src="classflyToImgs[index][0].src">
							<p>{{sku.title}}</p>
							<div>￥{{classflyToSpus[index].price / 100}}元/小时</div>
							<span>销量：{{sku.salesVolume}}</span>
						</div>
					</router-link>
				</div>
			</div>
		</div>
		<housekeeping-foot-nav iconIndex="1"></housekeeping-foot-nav>
	</div>
</template>

<script>
	import { Divider } from 'vux'
	export default {
		data() {
			return {
				classflys:undefined,
				ind: 0,
				sidebarHeight: '',
				classflyToSkus:undefined,
				Skus:undefined,
				classflyToSpus:undefined,
				Spus:undefined,
				classflyToImgs:undefined,
				Imgs:undefined,
			}
		},
		created() {
		  const BASE_URL = '/api';
			this.sidebarHeight = "height:" + (this.getWindowHeight() - 260) + "px";
			this.$http.post(BASE_URL+'/classfly.do').then(({
				data
			}) => {
				this.classflys = data.data.SkuClassflys;
				this.Skus = data.data.skusList;
				this.Spus = data.data.spusList;
				this.Imgs = data.data.imgsList;
				this.addActive(0);
			})
		},
		methods: {
			addActive: function(index) {
				this.ind = index;
				this.classflyToSkus = this.Skus[index];
				this.classflyToSpus = this.Spus[index];
				this.classflyToImgs = this.Imgs[index];
			}
		},
		components: {
			Divider
		}
	}
</script>

<style>

</style>
