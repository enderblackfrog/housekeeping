<template>
  <div class="NF_body">
    <housekeeping-head title="我的优惠券"></housekeeping-head>
    <ul class="NF_Box">
      <li class="NF_pice" v-for="(coupon , index) in coupons" :key="index">
        <img class="NF_banner" src="../../assets/img/servce/white.png" alt="">
        <div class="NF_FD">
          <p class="NF_name">{{coupon.title}}</p>
          <p class="NF_channel">仅线上购物使用</p>
          <p class="NF_validity">有效期:{{coupon.startTime | timeFilter}}-{{coupon.deadline | timeFilter}}</p>
          <p class="NF_FD_fd">满{{coupon.conditions4use / 100}}元减{{coupon.denomination / 100}}元</p>
          <p class="NF_money">¥<span>{{coupon.denomination / 100}}</span></p>
        </div>
      </li>



    </ul>
  </div>
</template>

<script>
  import {getCookie} from "../../util/util";
  import moment from 'moment';

  export default {
    name: "NotUsed",
    data(){
      return{
        coupons:[]
      }
    },
    methods:{
      initData(){
        if(getCookie("isLogin") == "true"){
          this.$http({
            method:'post',
            url:'/api' + '/receive_coupon.do',
            params:{
              getPath:1
            }
          }).then(({data}) =>{
            this.coupons = data.data
          })
        }
      }
    },
    filters:{
      timeFilter(value){
        return moment(value).format("YYYY/MM/DD");
      }
    },
    created(){
      this.initData();
    }
  }
</script>

<style scoped>
  .NF_body{height: 100vh;}
  .NF_Box{width: 93%;margin: 0 auto}
  .NF_pice{width: 100%;position: relative}
  .NF_banner{width: 100%;margin-top: 10px}
  .NF_FD{position: absolute;top: 12%;left: 5%;line-height: 35px;width: 90%}
  .NF_name{}
  .NF_channel{color: #00b9f6;border-radius: 4px;border: 1px solid #00b9f6;width: 5.3rem;
    height: 1.1rem;font-size: 12px;line-height: 1.1rem;text-align: center;padding: 0 .1rem;
    margin: .5rem 0;
  }
  .NF_validity{font-size: 13px;color: #999999}
  .NF_FD_fd{font-size: 13px;margin-top: .2rem;color: #999999}
  .NF_money{color: #00b9f6;position: absolute;font-size: 30px;top: 1.8rem;right: 1rem;}
  .NF_money>span{font-size: 45px;margin-left: 5px;}
</style>
