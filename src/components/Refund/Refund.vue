<template>
  <div style="height: 100vh">
    <housekeeping-head title="退款申请"></housekeeping-head>
    <ul>
      <li class="Order_box">
        <div class="Order_secbox">
          <img class="Order_headpic" src="../../assets/img/item/item.png" alt="">
          <div class="Order_depict">
            <p>这是一个主标题一个主标题</p>
            <p class="middle_title">这是一个副标题</p>
            <p>¥160.00 <span class="cross_line">¥160.00</span></p>
          </div>
        </div>
        <div class="R_details">
          <p>退款金额：<span class="R_money">¥160.00</span></p>
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
    <van-button @click="hehe" size="large" style="background-color: #00b9f6;color: white;position: fixed;bottom: 0" disabled>提交</van-button>
  </div>
</template>

<script>

  export default {
    name: "Refund",
    data(){
      return{
        Surplus:200,
        introduct:''
      }
    },
    methods:{
      descArea(){
        var textVal = this.introduct.length;
        this.Surplus = 200 - textVal;
        if(this.Surplus>0){
          // this.$router.push('/home')
        }
      },
      hehe(){
        console.log('hehe')
      }
    }
  }
</script>

<style scoped>
  .R_details{}
  .R_money{color: #00b9f6}
  .R_details p{padding:1rem 1.5rem;border-top: 4px solid #f5f5f5;border-bottom: 4px solid #f5f5f5;}
  .R_details textarea{resize:none;outline:none;padding: 1rem 1.5rem;width: 84%}
  .R_tip{font-size: 12px;font-style: italic;margin: 0 1.5rem 1rem 0;text-align: right;
    color: silver;}
  .tip{color: red;line-height: 25px;margin: 1rem;padding-top:1rem;border-top:3px solid #ededed}
</style>
