<template>
  <div>
    <ul>
      <li class="Order_box" v-for="(data , index) in datas" :key="index">
        <!--icon-->
        <div class="Order_secbox">
          <img class="Order_headpic" :src="data.img.src" alt="">
          <div class="Order_depict">
            <p>{{data.sku.title}}</p>
            <p class="middle_title">{{data.sku.introduce}}</p>
            <p>¥{{data.order.total / 100}} <span class="cross_line">¥160.00</span></p>
            <p style="margin-top: 10px;color: red" v-if="data.order.status == 0">退款中...</p>
            <p style="margin-top: 10px;color: #00b9f6" v-if="data.order.status == -1">退款完成</p>
          </div>
        </div>
        <div class="Order_bottom_set">
          <span class="turn_inblock" @click="CCS()">联系客服</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import {getCookie} from "../../util/util";

  export default {
        name: "AfterSale",
    data(){
          return{
            datas:[],

          }
    },
    methods:{
      initData(){
        if(getCookie('isLogin') == 'true'){
          this.$http({
            method:'post',
            url:'/api' + '/user_order.do',
            params:{}
          }).then(({data}) => {
            if (data.status === 200) {
              //获取status为0&-1的订单
              for (var i = 0; i < data.data.length; i++) {
                if (data.data[i].order.status == 0 || data.data[i].order.status == -1) {
                  this.datas.push(data.data[i]);
                }
              }
            }
          })
        }
      },
      CCS(){

      }
    },
    created(){
      this.initData()
    }
  }
</script>

<style scoped>

</style>
