<template>
  <div style="padding-bottom:9rem ">
    <housekeeping-head title="退款申请"></housekeeping-head>
    <ul>
      <li class="Order_box">
        <div class="Order_secbox">
          <img class="Order_headpic" :src="src" alt="">
          <div class="Order_depict">
            <p>{{title}}</p>
            <p class="middle_title">{{introduce}}</p>
            <p>¥{{price / 100}} <span class="cross_line">¥160.00</span></p>
          </div>
        </div>
        <div class="R_details">
          <textarea maxlength="200" @input="descArea" v-model="introduct" name="abstract" id="abstract" cols="30" rows="10" placeholder="退款原因描述"></textarea>
          <div class="R_tip">{{Surplus}}/200</div>
        </div>
        <div class="tip">
          <p>1.未服务前可申请全额退款。</p>
          <p>2.上门未服务按已服务计算，可申请部分退款。</p>
          <p>3.服务未完成可根据实际完成情况，申请部分退款。</p>
        </div>
      </li>
    </ul>
    <!--按键变色-->
    <!--<div v-if="!order.status == 0">-->
      <van-button @click="hehe" size="large" style="background-color: #00b9f6;color: white;position: fixed;bottom: 0" v-if="!changeBT">申请</van-button>
      <van-button @click="hehe" size="large" style="background-color: silver;color: white;position: fixed;bottom: 0" disabled v-if="changeBT">申请</van-button>
    <!--</div>-->
  </div>
</template>

<script>
  import {getCookie} from "../../util/util";
  import {Toast} from 'vant'

  export default {
    name: "Refund",
    data(){
      return{
        Surplus:200,
        introduct:'',
        changeBT:true,
        src:{},
        title:{},
        introduce:{},
        price:{}

      }
    },
    watch:{
      introduct:function () {
        this.checkFont()
      }
    },
    methods:{
      descArea(){
        var textVal = this.introduct.length;
        this.Surplus = 200 - textVal;
      },
      checkFont(){
        if(this.Surplus>0){
          this.changeBT=false
        }else {
          this.changeBT = true
        }
      },
      hehe(){
        // console.log('hehe')
        this.$http({
          method:'post',
          url:'/api' + '/application4refund.do',
          params:{
            orderId:this.$route.query.orderId,
            reason:this.introduct.valueOf(),
          }
        }).then(({data})=>{
          if(data.status == 200){
            Toast.success(data.data);
            this.$router.go(-1);
          }else{
            Toast.fail(data.msg);
          }
        })
      },
      initData(orderId){
        if(getCookie('isLogin') == 'true'){
          this.$http({
            method:'post',
            url:'/api' + '/application4refund_page.do',
            params:{
              orderId
            }
          }).then(({data})=>{
            this.src = data.data.img.src;
            this.title = data.data.sku.title;
            this.introduce = data.data.sku.introduce;
            this.price = data.data.spu.price;
          })

        }
      }
    },
    created(){
      this.initData(this.$route.query.orderId)
    }
  }
</script>

<style scoped>
  .R_details{border-top: 4px solid #f5f5f5}
  .R_details textarea{resize:none;outline:none;padding: 1rem 1.5rem;width: 84%}
  .R_tip{font-size: 12px;font-style: italic;margin: 0 1.5rem 1rem 0;text-align: right;
    color: silver;}
  .tip{color: red;line-height: 25px;margin: 1rem;padding-top:1rem;border-top:3px solid #ededed}
</style>
