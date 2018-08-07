<template>
  <div>
    <ul>
      <li class="Order_box" v-for="(data , index) in datas" :key="index">
        <div class="Order_secbox" @click="yuyue(index)">
          <img class="Order_headpic" :src="data.img.src" alt="">
          <div class="Order_depict">
            <p>{{data.sku.title}}</p>
            <p class="middle_title">{{data.sku.introduce}}</p>
            <p>¥{{data.order.total / 100}} <span class="cross_line">¥160.00</span></p>
          </div>
        </div>
        <div class="Order_bottom_set">
          <span class="turn_inblock" @click="yuyue(index)">立即预约</span>
          <span class="turn_inblock" @click="goToRe(index)">申请退款</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getCookie} from "../../util/util";
  import RouterLink from "vant/es/mixins/router-link";

  export default {
    name: "ToOrder",
    components: {RouterLink},
    data(){
      return {
        datas:[],
      };
    },
    methods:{
      initData(){
        if(getCookie("isLogin") == 'true'){
          this.$http({
            method:'post',
            url:'/api' + '/user_order.do',
            params:{}
          }).then(({data}) => {
            if(data.status === 200){
              //获取status为2的订单
              for(var i= 0; i<data.data.length;i++){
                if(data.data[i].order.status == 2){
                  this.datas.push(data.data[i]);
                }
              }
            }
          })
        }
      },
      yuyue(index){
        this.$router.push({path:'/confirmation_time',query:{orderId:this.datas[index].order.id,status:this.datas[index].order.status}});
      },
      goToRe(index){
        this.$router.push({path:'/refund',query:{orderId:this.datas[index].order.id}})
      }
    },
    created(){
      this.initData();
    }
  }
</script>

<style scoped>
  .middle_align{display: flex;align-items: center}
</style>
