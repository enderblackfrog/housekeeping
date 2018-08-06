<template>
    <div class="L_body">
      <housekeeping-head title="一键登录"></housekeeping-head>
      <img class="L_logo" src="" alt="">
      <ul class="L_content">
        <li class="L_pic">
          <img ondragstart="return false" src="../../assets/img/item/weixin.png" alt="">
        </li>
        <li class="L_tip">使用微信安全登录，免注册，更快捷！</li>
        <li class="L_botton" @click="submit()">立即登录</li>
      </ul>
      <!--<div v-for="(address, index) in addressList.addressList" :key="index">{{address.address}}</div>-->
      <!--<AlertTip :alertText="alertText" v-show="alertShow"/>-->
    </div>
</template>

<script>
  import { Toast } from 'vant';
  import {reqLogin} from "../../api";

  export default {
    name: "Login",
    methods: {
      async submit(){
        let data = await reqLogin(123456,123);
        console.log('发送成功');
        if (data.status === 200) {
          Toast.success(data.data);
          setTimeout(()=>{this.$router.replace('/home')},3000);
        }else{
          Toast.fail('登陆失败');
        }
      },
    },
  }
</script>

<style scoped>
  .L_body{height: 100vh;text-align: center}
  .L_pic>img{width: 25%}
  .L_content{background-color: white;padding-bottom: 5%;width: 95%;margin: 0 auto;border: 2px solid #ededed;border-radius: 10px}
  .L_tip{color: #cccccc}
  .L_content li{padding: 5% 0 0 0;}
  .L_botton{color: #00b9f6}
</style>
