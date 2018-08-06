<template>
	<div>
		<housekeeping-head title="信息管理"></housekeeping-head>
		<div class="addressList">
			<div class="address" v-for="(address,index) in addressList" @click="editAdress(index)">
				<div class="info">
					<div class="username">{{address.contacts}}</div>
					<div class="usertelephone">{{address.telephone}}</div>
					<p><span v-if="address.isDefult">[默认地址]</span>{{address.city | addressFilter(addressData)}}</p>
				</div>
				<div class="icon">
					<x-icon type="ios-arrow-forward" size="30"></x-icon>
				</div>
			</div>
		</div>
		<div style="padding:15px; background: #ffffff;">
			<x-button :gradients="['#0db9fe', '#0db9fe']" :link="{name:'user_service_info',query:{userId:userId}}" style="border-radius:99px;">添加地址</x-button>
		</div>
		<popup v-model="show" position="bottom" max-height="50%" style="background: transparent;">
			<div style="padding:15px ">
				<x-button @click.native="show = false" :link="{name:'user_service_info',query:{addressIndex:addressIndex}}" style="border-radius:99px;">编辑</x-button>
				<x-button @click.native="deleteAdress()" type="warn" style="border-radius:99px;"> 删除</x-button>
			</div>
			<div style="padding-top: 25px; padding-bottom: 15px; padding-left:15px; padding-right:15px; ">
				<x-button @click.native="show = false" style="border-radius:99px;"> 关闭</x-button>
			</div>
		</popup>
	</div>
</template>

<script>
	import { Popup, XButton, ChinaAddressData } from 'vux'
	import value2name from '../filters/value2name'
	import name2value from '../filters/name2value'
	export default {
		components: {
			Popup,
			XButton,
			ChinaAddressData
		},
		created() {
			this.getDate();
		},
		data() {
			return {
				userId: '1',
				addressList: undefined,
				show: false,
				addressIndex: undefined,
				addressData: ChinaAddressData
			}
		},
		filters: {
			addressFilter: function(value, addressData) {
        var valuelist = value.split("-");
        var cityArray = value2name(valuelist, addressData).split(' ');
        console.debug(cityArray);
        var cityStr = "";
        for(var i = 0; i < cityArray.length; i++) {
          if(cityArray[i] != '直辖市') {
            cityStr = cityStr + cityArray[i];
          }
        }
        return cityStr;
      }
		},
		methods: {
			editAdress: function(index) {
				this.show = !this.show;
				this.addressIndex = index;
			},
			deleteAdress: function() {
				this.show = !this.show;
				var _this = this;
				_this.$vux.confirm.show({
					title:'删除',
					content:'是否确认删除？',
					onCancel() {
						console.log('Plugin: I\'m hiding');
					},
					onConfirm() {
						console.debug(_this.addressList[_this.addressIndex].id);
						_this.$http({
							method: "post",
							url: '/delete_address.do',
							params: {
								id: _this.addressList[_this.addressIndex].id
							}
						}).then(({
							data
						}) => {
							if(data.status == 200) {
								_this.$vux.alert.show({
									title: '成功！',
									content: data.msg,
									onShow() {
										console.log('Plugin: I\'m showing')
									},
									onHide() {
										_this.getDate();
									}
								})
							}
						})
					}
				})
			},
			getDate: function() {
				this.$http({
					method: "post",
					url: '/api' + '/address_admin.do',
					params: {
						userId: this.userId
					}
				}).then(({
					data
				}) => {
					console.debug(this);
					this.addressList = data.data;
					var storage = window.localStorage;
					storage.addressList = JSON.stringify(data.data);
				})
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	@import url("../assets/less/base.less");
	.vux-x-icon {
		fill: #c8c8cd;
	}

	.addressList {
		width: 100%;
		height: auto;
		background: #ffffff;
		.address {
			width: 96%;
			height: 80px;
			display: -webkit-flex;
			display: flex;
			flex-direction: row;
			border-bottom: 1px solid @housekeeping_body_color;
			padding: 0 2%;
			.info {
				display: -webkit-flex;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				flex: 7;
				.username {
					flex: 1;
					color: @housekeeping_font_color1;
					font-size: @housekeeping_font_size5;
					margin-top: 10px;
				}
				.usertelephone {
					flex: 1;
					text-align: right;
					color: @housekeeping_font_color1;
					font-size: @housekeeping_font_size5;
					margin-top: 10px;
				}
				p {
					width: 100%;
					color: @housekeeping_font_color2;
					font-size: @housekeeping_font_size3;
					span {
						color: @housekeeping_theme_color;
					}
				}
			}
			.icon {
				align-self: center;
				flex: 1;
				text-align: right;
			}
		}
	}
</style>
