<template>
  <div>
    <housekeeping-head title="淘厨汇新人礼"></housekeeping-head>
    <div class="N_body">
      <img class="N_banner" src="../../assets/img/banner/banner2.jpg" alt="">
      <ul class="N_Box">
          <li class="N_title">淘厨汇新人券</li>
        <li class="N_piceBox">
          <div class="yellow" v-for="(coupon , index) in coupons" :key="index" @click="getUserCoupon(index)">
            <img class="N_card" src="../../assets/img/servce/yellow.png" alt="">
            <div class="color_red">
              <p>¥<span class="money_size">{{coupon.denomination / 100}}</span></p>
              <p>{{coupon.title}}</p>
            </div>
          </div>
        </li>
        <li class="N_title">新人活动规则</li>
        <li class="N_atcBox">
          <p>
            1.新人用户首次下单可享受新人专享活动，重点保洁满4小时可减1小时。可在首页
            领劵中心领取该优惠券，每位新用户仅能领取一次。
          </p>
          <p>
            2.每张订单仅能使用1张优惠券且不能与本商城其他优惠活动叠加使用，使用优惠券的
            订单发生退货时，优惠券不退回。
          </p>
          <p>
            3.线下实体门店无新人专享价，请注意优惠券上的有效日期。
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {getCookie} from "../../util/util";
  import moment from 'moment';
    export default {
        name: "Newlyweds",
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
        },
        getUserCoupon(index){
          console.log(this.coupons[index].id);
          this.$http({
            method:'post',
            url:'/api' + '/user_receive4coupon.do',
            params:{
              couponId:this.coupons[index].id
            }
          }).then(({data}) =>{
            console.log(data);
          })
        }
      },
      filters:{
        timeFilter(value){
          return moment(value).format("YYYY/MM/DD");
        }
      },
      created(){
          this.initData()
      }
    }
</script>

<style scoped>
  .N_banner{width: 100%}
  .N_body{background-color: #00b9f6;height: 100vh}
  .N_Box{width: 93%;margin: 0 auto}
  .N_piceBox{display: flex;justify-content: flex-start;width: 100%;overflow-y: hidden;}
  .N_atcBox{background-color: #f6f8bd;line-height: 20px;padding: 3.5%;border-radius: 4px;color: #666567}
  .N_atcBox>p:nth-child(2){margin: 5% 0}
  .N_title{color: white;margin: 5% 0 3% 0}

  /*黄色标签*/
  .yellow{position: relative;margin-right:5px;}
  .color_red{color: #ff0000;text-align: center;position: absolute;top:20%;left: 15%;line-height: 20px}
  .money_size{font-size: 25px}
  .N_card{width: 7rem;}
</style>
