<template>
  <div>
    <housekeeping-head title="确认预约信息"></housekeeping-head>
    <group gutter="0" label-width="4.5em" label-margin-right="2em" label-align="left">
      <cell is-link primary="content" :value="city1">
        <span slot="title" style="color: #333333;"><span style="vertical-align:middle;">{{address.contacts}}</span></span>
        <p slot="inline-desc" style="">{{address.telephone}}</p>
      </cell>
    </group>
    <div class="order-details">
      <div class="order-details-img" :style="'background-image: url(' + imgs.src + ');'"></div>
      <div class="order-item">
        <div class="title" style="">{{skus.title}}</div>
        <div class="introduce">{{skus.introduce}}</div>
        <div class="price">￥{{spus.price / 100}}</div>
        <div class="number">X1</div>
      </div>
    </div>
    <div class="order-explain">
      <p>1.保洁类服务请选择上门时间。</p>
      <p>2.阿姨类服务请选择面试时间。</p>
      <p>3.修改预约信息需要提前一天联系客服，若未及时修改导致服务人员上门未服务的，该订单按已服务计算。</p>
      <p style="color: red;font-size: 12px">注意：付款后请在待预约里确定服务时间。</p>
    </div>

    <!--弹窗-->
    <van-popup v-model="show" position="" :overlay="true">
      <div class="theBack">
        <!--时间选择-->
        <group gutter="0" label-width="4.5em" label-margin-right="2em" label-align="left">
          <datetime v-model="minuteListValue" format="YYYY-MM-DD HH:mm" :start-date="start_date" :min-hour="8" :max-hour="20" :minute-list="['00', '15', '30', '45']" title="预约时间"></datetime>
        </group>
        <textarea v-model="textTip" class="BZ" name="" id="tipText" placeholder="备注："></textarea>
        <van-row style="text-align: center;margin-top: 1rem" type="flex" justify="center">
          <van-col span="6">
            <van-button size="normal" @click="show = false" type="danger">取消</van-button>
          </van-col>
          <!--中间空隙-->
          <van-col span="6"></van-col>
          <!--=======-->
          <van-col span="6">
            <van-button style="background-color: #00b9f6;border: 1px solid #00b9f6" size="normal" @click="addDate()" type="primary">保存</van-button>
          </van-col>
        </van-row>
      </div>
    </van-popup>
    <!--添加预约时间按钮切换-->
    <div v-if="order.status == 1 ? false : true">
      <van-button size="large" @click="show = true" v-if="spus.serviceTimes - orderLists.length >0">
        点击添加预约时间
        <span style="color: red;font-size: 12px">剩余预约次数：<span style="font-size: 20px">{{spus.serviceTimes - orderLists.length}}</span>次</span>
      </van-button>
      <van-button size="large" @click="show = true" disabled v-if="spus.serviceTimes - orderLists.length == 0">
        点击添加预约时间
        <span style="color: red;font-size: 12px">剩余预约次数：<span style="font-size: 20px">0</span>次</span>
      </van-button>

      <!--列表信息-->
      <p class="list_title">预约列表</p>
      <van-collapse v-model="activeName" accordion v-for="(orderList , index) in orderLists" :key="index">
        <van-collapse-item :title="orderList.serviceTime | dateFilter" :name='orderList.id'>
          <div style="font-size: 13px;margin: 0 0 10px 0">服务人员：{{orderList.servicePersonal == ""|| orderList.servicePersonal ==undefined || orderList.servicePersonal ==null ? '待定' : orderList.servicePersonal }}</div>
          <div style="line-height: 20px">备注：{{orderList.remarks}}</div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <van-button v-if="order.status == 1" size="large" style="background-color: #00b9f6;color: white;position: fixed;bottom: 0">确认预约</van-button>
  </div>
</template>

<script>
  import { TransferDom, Popup, Group, Cell, Icon, Datetime, XTextarea, ChinaAddressData } from 'vux'
  //import { Button } from 'vant'
  import value2name from '../filters/value2name'
  import {getCookie} from "../util/util";
  import moment from 'moment';
  import { Toast } from 'vant';
  import name2value from '../filters/name2value'


  export default {
    directives: {
      TransferDom
    },
    components: {
      //vant,
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
        yuyue:'预约时间：',
        changeShow:false,
        //activeValue: '',
        //手风情显示
        activeName: '1',
        // 弹出框默认
        show: false,
        // ===========
        addressList:undefined,
        addressData:ChinaAddressData,
        order:{},
        city1: '',
        imgs:{},
        address:{},
        spus:[],
        skus:{},
        def:undefined,
        minuteListValue: '',
        textTip:'',
        start_date: '',
        // 优惠卷
        chosenCoupon: -1,
        coupons: [],
        disabledCoupons: [],
        showList:false,
        // 列表定义
        orderLists:[],
        // editable:'',
      }
    },
    filters: {
      dateFilter(value){
        return moment(value).format('预约时间：YYYY-MM-DD hh:mm');
      },
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
          "d+": date.getDate() + 1, //day
          "h+": date.getHours(), //hour
          "m+": date.getMinutes(), //minute
          "s+": date.getSeconds(), //second
          "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
          "S": date.getMilliseconds() //millisecond
        };
        if(/(y+)/.test(format)) format = format.replace(RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for(var k in o)
          if(new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
              RegExp.$1.length === 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
        return format;
      },
      initData(orderId,status){
        const isLogin = getCookie("isLogin");
        if(isLogin == 'true'){
          this.$http({
            method:"post",
            url:'/api'+"/order_details.do",
            params:{
              orderId:orderId,
            }
          }).then(({data})=>{
            if(status == 2){
              this.orderLists = data.data.serviceTimesList;
            }
              // console.log(data);
              this.imgs = data.data.img;
              this.address = data.data.serviceAddress;
              this.skus = data.data.sku;
              this.spus = data.data.spu;
              this.city1 = this.addressFilter1(this.address.city, this.addressData) + this.address.address;
              this.order = data.data.order;
              // console.log(this.order)
            }
          )
        }
      },
      addDate(){
        this.show = false;
        this.$http({
          method:'post',
          url:'/api' + '/add_serivce_time.do',
          params:{
            remarks:this.textTip.valueOf(),
            orderId:this.$route.query.orderId,
            timeStamp:moment(this.minuteListValue,"YYYY-MM-DD HH:mm").valueOf()
          }
        }).then(
          ({data})=>{
            console.log(data);
            if(data.status == 200){
              Toast.success('预约成功');
              this.$router.go(0);
            }else{
              Toast.fail(data.msg);
            }
          }
        );
      }
    },
    created() {
      this.initData(this.$route.query.orderId,this.$route.query.status);
      var time = new Date();
      this.start_date = this.formatDate(time, "yyyy-MM-dd");
      this.minuteListValue = this.formatDate(time, "yyyy-MM-dd hh:mm");
    },

  }
</script>

<style lang="less" scoped="scoped">
  @import url("../assets/less/base.less");
  .list_title{
    background-color: white;
    padding: 20px;
    margin-top: 10px;
    text-align: center;
    font-size: 20px;
  }
  .msgList{
    div{
      padding:1rem;
      border-top: 10px solid white;
    }
  }
  .theBack{
    width: 22rem;
    height: 200px;
    .BZ{
      padding: 1rem;
      /*border:1px solid red;*/
      width: 19.7rem;
      height:3.3rem ;
    }
  }
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

