<template>
	<div>
		<housekeeping-head title="添加服务信息"></housekeeping-head>
		<div class="service-info">
			<group gutter="0" label-width="4.5em" label-margin-right="2em" label-align="left">
				<input type="hidden" v-model="address.id" />
				<x-input title="联系人" v-model="address.contacts"></x-input>
				<x-input title="联系电话" placeholder="必填" v-model="address.telephone"></x-input>
				<x-address title="所在地区" v-model="address_city" raw-value :list="addressData" value-text-align="left"></x-address>
				<x-textarea title="详细地址" placeholder="请填写详细地址" :show-counter="false" :rows="3" v-model="address.address"></x-textarea>
				<x-textarea title="家庭信息" placeholder="请填写详细家庭人口数、宝宝年龄、家庭面积及户型等" :show-counter="false" :rows="3" v-model="address.familyInfo"></x-textarea>
				<x-switch title="设置默认信息" v-model="address.isDefult"></x-switch>
			</group>
			<div style="padding:20px 2%; background: #ffffff; width: 96%;">
				<div @click="submitEdit()">
					<x-button action-type="reset" :gradients="['#0db9fe', '#0db9fe']" style="border-radius:99px;">
						{{'userId' in this.$route.query ? button_text[0]:button_text[1]}}
					</x-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Alert, GroupTitle, Group, XInput, ChinaAddressData, XAddress, XTextarea, XSwitch, XButton } from 'vux'
	import value2name from '../filters/value2name'
	export default {
		components: {
			Alert,
			GroupTitle,
			Group,
			XInput,
			ChinaAddressData,
			XAddress,
			XTextarea,
			XSwitch,
			XButton
		},
		created() {
			this.initData();
		},
		data() {
			return {
				addressData: ChinaAddressData,
				address: {
					id: '',
					telephone: '',
					contacts: '',
					city: '',
					address: '',
					familyInfo: '',
					isDefult: false,
					userId: '',
				},
				check: {
					isContacts: {
						isPass: false,
						msg: ''
					},
					isTelephone: {
						isPass: false,
						msg: ''
					},
					isAddress_city: {
						isPass: false,
						msg: ''
					},
					isAddress: {
						isPass: false,
						msg: ''
					}
				},
				address_city: [],
				button_text: ["确认保存", "确认修改"]
			}
		},
		watch: {
			address: {
				handler: function(val) {
					//手机验证
					this.address.telephone = val.telephone;
					let result = !!this.address.telephone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
					if(result) {
						this.check.isTelephone.isPass = true;
					} else {
						this.check.isTelephone.isPass = false;
						if(val.telephone != "") {
							this.check.isTelephone.msg = '手机号码填写错误！';
						} else {
							this.check.isTelephone.msg = '手机号码不能为空！';
						}
					}
					console.debug(this.check.isTelephone.isPass);
					//昵称验证
					this.address.contacts = val.contacts;
					if(val.contacts.replace(/ /g, '') != "") {
						this.check.isContacts.isPass = true;
					} else {
						this.check.isContacts.isPass = false;
						this.check.isContacts.msg = "请填写您的昵称！";

					}
					console.debug(this.check.isContacts.isPass);
					//详细地址验证
					this.address.address = val.address;
					if(val.address.replace(/ /g, '') != "") {
						this.check.isAddress.isPass = true;
					} else {
						this.check.isAddress.isPass = false;
						this.check.isAddress.msg = "请填写详细地址！"
					}
					console.debug(this.check.isAddress.isPass);
				},
				deep: true
			},
			address_city: function(val) {
				this.address_city = val;
				if(this.address_city.length == 0) {
					this.check.isAddress_city.isPass = false;
					this.check.isAddress_city.msg = '请选择所在城市';
				} else {
					this.check.isAddress_city.isPass = true;
				}
				console.debug(this.check.isAddress_city.isPass);
			}
		},
		methods: {
			initData: function() {
				if("addressIndex" in this.$route.query) {
					var storage = window.localStorage;
					var addressList = JSON.parse(storage.addressList);
					this.address = addressList[this.$route.query.addressIndex];
					var cityCode = this.address.city.split("-");
					this.address_city = value2name(cityCode, ChinaAddressData).split(" ");
				} else {
					this.address.userId = this.$route.query.userId;
					this.address_city = [];
				}
			},
			submitEdit: function() {
				console.debug(this.check);
				for(var i in this.check) {
					if(this.check[i].isPass == false) {
						this.$vux.alert.show({
							title: '错误！',
							content: this.check[i].msg,
							onShow() {
								console.log('Plugin: I\'m showing')
							},
							onHide() {
								console.log('Plugin: I\'m hiding')
							}
						})
						return;
					}
				}
				var cityStr = "";
				console.debug(this.address_city);
				for(var i = 0; i < this.address_city.length; i++) {
					if(i == this.address_city.length - 1) {
						cityStr = cityStr + this.address_city[i];
					} else {
						cityStr = cityStr + this.address_city[i] + "-";
					}
				}
				var address = this.address;
				address.city = cityStr;
				var _this = this;
				console.log(this.address.isDefult);
				_this.$http({
					method: "post",
					params: address,
					url: 'api' + '/edit_address.do'
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
								_this.$router.push({name:"user_address_admin"})
							}
						})
					}else{
						_this.$vux.alert.show({
							title: '失败！',
							content: data.msg,
							onShow() {
								console.log('Plugin: I\'m showing')
							},
							onHide() {
								_this.$router.push({name:"user_address_admin"})
							}
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
