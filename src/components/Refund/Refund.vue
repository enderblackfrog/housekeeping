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
      </li>
    </ul>
    <!--按键变色-->
    <div class="deep_bt">提交</div>
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
          this.$router.push('/home')
        }
      }
    }
  }
</script>

<style scoped>
  .R_details{}
  .R_money{color: #00b9f6}
  .R_details p{padding:1rem 1.5rem;border-top: 4px solid #f5f5f5;border-bottom: 4px solid #f5f5f5;}
  .R_details textarea{resize:none;outline:none;padding: 1rem 1.5rem;width: 84%}
  .deep_bt{position: fixed;bottom: 0;width: 100%;height: 55px;line-height: 55px;
    background-color: silver;color: white;text-align: center}
  .deep_bt_choose{background-color: #00b9f6}
  .R_tip{font-size: 12px;font-style: italic;margin: 0 1.5rem 1rem 0;text-align: right;
    color: silver;}
</style>
