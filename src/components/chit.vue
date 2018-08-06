<template>
  <div  class="login_list">
    <housekeeping-head title="绑定手机"></housekeeping-head>
    <div class="back">
      <!--<span class="login_title">短信验证码：</span>-->
      <input class="phone" type="text" placeholder="请输入手机号">
      <input class="auth_input phone" type="text"  placeholder="输入验证码" />
      <span v-show="sendAuthCode" class="auth_text auth_text_blue msg"  @click="getAuthCode">获取验证码</span>
      <span v-show="!sendAuthCode" class="auth_text msg"> <span class="auth_text_blue">({{auth_time}}s) </span>重新发送</span>
    </div>
    <div class="button_phone">
      立即绑定
    </div>
  </div>
</template>

<script>
    export default {
        name: "chit",
      data(){
          return{
            sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
            auth_time: 0, /*倒计时 计数器*/
          }
      },
      methods: {
        getAuthCode:function () {
          this.sendAuthCode = false;
          this.auth_time = 30;
          var auth_timetimer =  setInterval(()=>{
            this.auth_time--;
            if(this.auth_time<=0){
              this.sendAuthCode = true;
              clearInterval(auth_timetimer);
            }
          }, 1000);
        }
      }
    }
</script>

<style lang="less" scoped>
  @import url("../assets/less/base.less");
  .login_list{
    text-align: center;
    height: 100vh;
    .back{
      margin-top: 100px;
      position: relative;
      .phone{
        border-radius: 5px;
        border: 1px solid silver;
        height: 50px;
        width: 18rem;
        padding: 0 10px 0 10px;
        margin: .5rem 0 ;
      }
      .msg{
        position: absolute;
        border-left: 1px solid silver;
        border-radius: 0 7px 7px 0;
        background-color: white;
        width: 7.5rem;
        height: 50px;
        right: 2.3rem;
        bottom: 9px;
        line-height: 50px;
        text-align: center;

      }
    }
    .button_phone{
      width: 19rem;
      height: 50px;
      line-height: 50px;
      background-color: #00b9f6;
      border-radius: 5px;
      color: white;
      font-size: 15px;
      text-align: center;
      margin: 1rem auto;
    }
  }
</style>
