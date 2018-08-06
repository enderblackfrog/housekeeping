<template>
	<div>
		<housekeeping-head title="确认预约信息"></housekeeping-head>
		<group gutter="0" label-width="4.5em" label-margin-right="2em" label-align="left">
			<cell @click.native="show = !show" is-link primary="content" :value="city1">
				<span slot="title" style="color: #333333;"><span style="vertical-align:middle;">{{address.contacts}}</span></span>
				<p slot="inline-desc" style="">{{address.telephone}}</p>
			</cell>
		</group>
		<div class="order-details">
			<div class="order-details-img" :style="'background-image: url(' + img.src + ');'"></div>
			<div class="order-item">
				<div class="title" style="">{{sku.title}}</div>
				<div class="introduce">{{sku.introduce}}</div>
				<div class="price">￥{{spu.price/100}}</div>
				<div class="number">X1</div>
			</div>
		</div>
		<!--<group gutter="0" label-width="4.5em" label-margin-right="2em" label-align="left">-->
			<!--<datetime v-model="minuteListValue" format="YYYY-MM-DD HH:mm" :start-date="start_date" :min-hour="8" :max-hour="20" :minute-list="['00', '15', '30', '45']" title="预约时间"></datetime>-->
		<!--</group>-->
    <!--<router-link class="choose_ticket" to="/mycoupon">-->
      <!--<img src="../assets/icon/yhj.png" alt="">-->
      <!--<p>优惠券</p>-->
      <!--<div>全场20元网购券<span>减¥20</span></div>-->
      <!--<img src="../assets/icon/right.png" alt="">-->
    <!--</router-link>-->

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
        @change="onChange"
        @exchange="onExchange"
        :show-exchange-bar="false"
      />
    </van-popup>
		<div class="order-explain">
			<p>1.保洁类服务请选择上门时间。</p>
			<p>2.阿姨类服务请选择面试时间。</p>
			<p>3.修改预约信息需要提前一天联系客服，若未及时修改导致服务人员上门未服务的，该订单按已服务计算。</p>
      <p style="color: red;font-size: 12px">注意：付款后请在待预约里确定服务时间。</p>
		</div>
		<group gutter="0" label-width="3em" label-margin-right="1em" label-align="left">
			<x-textarea title="备注:" :show-counter="false" :rows="4"></x-textarea>
      <!--<textarea name="" id="" cols="30" rows="10">备注：</textarea>-->
		</group>
		<div class="order-footer">
			<div class="total">总计：<span>￥{{chosenCoupon < 0 ? spu.price / 100 : (spu.price - coupons[chosenCoupon].value) / 100 }}</span></div>
			<div class="submit" @click="submit()">确认预约</div>
		</div>
		<div v-transfer-dom>
			<popup v-model="show" position="bottom" max-height="50%" style="background: #ffffff;">
				<div class="address" v-for="(address,index) in addressList" @click="changeAddress(index)">
					<div class="address-info">
						<div>联系人：{{address.contacts}}</div>
						<div>联系电话：{{address.telephone}}</div>
						<div>预约地址：{{address.city | addressFilter(addressData) + address.address}}</div>
					</div>
					<div class="address-active">
						<x-icon type="ios-checkmark-empty" size="40" v-if="def == index"></x-icon>
					</div>
				</div>
			</popup>
		</div>
	</div>
</template>

<script>
  import { TransferDom, Popup, Group, Cell, Toast, Icon, Datetime, XTextarea, ChinaAddressData } from 'vux'
    import value2name from '../filters/value2name'
    import {getCookie} from "../util/util";
    import moment from 'moment'
    import name2value from '../filters/name2value'

    const coupon = {
    // available: 1,
    // discount: 0,
    denominations:500,
    origin_condition: 10000,
    //reason: '',
    value: 500,
    name: '满100减5',
    start_at: 1489104000,
    end_at: 1514592000
  };

    export default {
		directives: {
			TransferDom
		},
		components: {
			TransferDom,
			Popup,
			Group,
			Cell,
			Toast,
			Icon,
			Datetime,
			XTextarea,
      ChinaAddressData
		},
		data() {
			return {
				//activeValue: '',
				radio001: ['China', 'Japan'],
				show: false,
				addressList:undefined,
        address:{},
        addressData:ChinaAddressData,
				city1: '',
        spu:{},
        sku:{},
        img:{},
        def:undefined,
				// minuteListValue: '',
				// start_date: '',

        // 优惠卷
        chosenCoupon: -1,
        coupons: [],
        disabledCoupons: [],
        showList:false

        // editable:'',
			}
		},
    filters: {
      addressFilter: function(value, addressData) {
        var valuelist = value.split("-");
        var cityArray = value2name(valuelist, addressData).split(' ');
        console.debug(cityArray);
        var cityStr = "";
        for(var i = 0; i < cityArray.length; i++) {
          if(cityArray[i] !== '市辖区') {
            cityStr = cityStr + cityArray[i];
          }
        }
        return cityStr;
      }
    },
		methods: {

      onChange(index) {
        this.showList = false;
        this.chosenCoupon = index;
      },
      onExchange(code) {
        this.coupons.push(coupon);
      },
      submit:function(){
        var couponId;
        var couponIndex;
        console.log(this.spu.id);
        if(this.chosenCoupon > 0){
          couponId = this.coupons[couponIndex].id
        }
        this.$http({
          url:'/api' + '/add_order.do',
          params:{
            spuId:this.spu.id,
            couponId: couponId,
            serviceAddressId:this.address.id
          },
          method:'post'
        }).then(({data})=>{
          console.log(data);
          if(data.status == 200){
            this.$router.replace('my_order');
          }
        })
      },

			changeAddress(index) {
				this.address = this.addressList[index];
        this.city1 = this.addressFilter1(this.address.city,this.addressData) + this.address.address;
				this.show = false;
				this.def = index;
			},
      addressFilter1: function(value, addressData) {
        var valuelist = value.split("-");
        var cityArray = value2name(valuelist, addressData).split(' ');
        console.debug(cityArray);
        var cityStr = "";
        for(var i = 0; i < cityArray.length; i++) {
          if(cityArray[i] !== '市辖区') {
            cityStr = cityStr + cityArray[i];
          }
        }
        return cityStr;
      },
			formatDate(date, format) {
				var o = {
					"M+": date.getMonth() + 1, //month
					"d+": date.getDate(), //day
					"h+": date.getHours(), //hour
					"m+": date.getMinutes(), //minute
					"s+": date.getSeconds(), //second
					"q+": Math.floor((date.getMonth() + 3) / 3), //quarter
					"S": date.getMilliseconds() //millisecond
				}
				if(/(y+)/.test(format)) format = format.replace(RegExp.$1,
					(date.getFullYear() + "").substr(4 - RegExp.$1.length));
				for(var k in o)
					if(new RegExp("(" + k + ")").test(format))
						format = format.replace(RegExp.$1,
							RegExp.$1.length === 1 ? o[k] :
							("00" + o[k]).substr(("" + o[k]).length));
				return format;
			},
      initData(){
        const isLogin = getCookie("isLogin");
        if(isLogin == 'true'){
          this.$http({
            method:"post",
            url:'/api'+"/confirm_order.do",
            params:{
              spuId:"1"
            }
          }).then(({data})=>{
              console.log(data);
              if(data.status === 200){
                // 获取优惠券
                var coupons = data.data.coupons;
                for(var i= 0; i < coupons.length;i++){
                  var coupon = {};
                  coupon.denominations = coupons[i].denomination;
                  coupon.origin_condition = coupons[i].conditions4use;
                  coupon.value = coupons[i].denomination;
                  coupon.name = coupons[i].title;
                  coupon.start_at = moment(coupons[i].startTime).valueOf()/1000
                  coupon.end_at = moment(coupons[i].deadline).valueOf()/1000;
                  this.coupons.push(coupon);
                }
                //=============
                // 获取商品信息，地址，订单详情
                this.addressList = data.data.serviceAddressList;
                for(var i = 0; i< this.addressList.length; i++) {
                  if (this.addressList[i].isDefult === true) {
                    this.address = this.addressList[i];
                    this.def = i;
                    this.city1 = this.addressFilter1(this.addressList[i].city, this.addressData)+this.addressList[i].address;
                    this.spu = data.data.spu;
                    this.sku = data.data.sku;
                    this.img = data.data.img;
                    return;
                  }
                }
                this.address = this.addressList[0];
                this.city1 = this.addressFilter1(this.addressList[0].city, this.addressData) + this.addressList[0].address;
                this.def = 0;
                //===============
              }
            }
          )
        }
        // else{
        //   this.$router.push("/login");
        // }
      }
		},
		created() {
		  // alert(document.cookie);
		  this.initData();
			// var time = new Date();
			// this.start_date = this.formatDate(time, "yyyy-MM-dd");
			// this.minuteListValue = this.formatDate(time, "yyyy-MM-dd hh:mm");
		},

	}
</script>

<style lang="less" scoped="scoped">
	@import url("../assets/less/base.less");
  .choose_ticket{
    padding: 0 2%;
    border-bottom: 1px solid #ededed;
    display: flex;
    height: 55px;
    align-items: center;
    background-color: white;
    img:first-child{
      width: 2.5rem;
    }
    div{width: 70%;
      text-align: right;
      span{
        color: red;
        margin-left: 1rem;
      }
    }
  }
	.address {
		width: 96%;
		border-bottom: 1px solid @housekeeping_body_color;
		padding: 10px 2%;
		display: flex;
		flex-direction: row;
		.address-info {
			width: 90%;
			display: flex;
			flex-direction: column;
			flex: 1;
			div {
				width: 100%;
				line-height: 25px;
				color: @housekeeping_font_color2;
				font-size: @housekeeping_font_size4;
			}
		}
		.address-active {
			width: 10%;
			align-self: center;
		}
	}

	.order-details {
		width: 96%;
		padding: 10px 2%;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		flex-wrap: wrap;
		.order-details-img {
			width: 100px;
			height: 100px;
			background-size: cover;
			margin-right: 20px;
		}
		.order-item {
			width: 60%;
			height: auto;
			display: flex;
			display: -webkit-flex;
			flex-direction: row;
			flex-wrap: wrap;
			align-content: space-between;
			.title {
				width: 100%;
				font-size: @housekeeping_font_size4;
				color: #333333;
			}
			.introduce {
				width: 100%;
				color: #999999;
				font-size: @housekeeping_font_size3;
				/*line-height: 20px;
				height: 40px;
				margin-bottom: 10px;*/
			}
			.price {
				width: 50%;
				font-size: @housekeeping_font_size5;
				color: red;
			}
			.number {
				text-align: right;
				width: 50%;
				font-size: @housekeeping_font_size4;
				color: #666666;
			}
		}
	}

	.order-explain {
		width: 96%;
		height: auto;
		background: #ffffff;
		padding: 10px 2%;
		P {
			line-height: 18px;
			margin-bottom: 5px;
			font-size: @housekeeping_font_size3;
			color: @housekeeping_font_color3;
		}
	}

	.order-footer {
		height: 60px;
		width: 100%;
		position: fixed;
		bottom: 0px;
		background: @housekeeping_body_color;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		.submit,
		.total {
			height: 60px;
			line-height: 60px;
		}
		.total {
			margin-left: 2%;
			text-align: left;
			font-size: @housekeeping_font_size5;
			flex: 3;
			span {
				color: red;
				font-weight: 700;
				font-size: 24px;
			}
		}
		.submit {
			text-align: center;
			background: @housekeeping_theme_color;
			color: #ffffff;
			font-size: @housekeeping_font_size5;
			flex: 2;
		}
		.submit:active {
			background: #00b9f6;
		}
	}

	.vux-x-icon {
		fill: @housekeeping_theme_color;
	}
</style>
