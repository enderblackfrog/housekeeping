<template>
  <div>
    <ul>
      <li class="Order_box" v-for="(data , index) in datas" :key="index">
        <!--icon-->
        <div class="Order_secbox" @click="checkList(index)">
          <img class="Order_headpic" :src="data.img.src" alt="">
          <div class="Order_depict">
            <p>{{data.sku.title}}</p>
            <p class="middle_title">{{data.sku.introduce}}</p>
            <p>¥{{data.order.total / 100}} <span class="cross_line">¥160.00</span></p>
          </div>
        </div>
        <div class="Order_bottom_set">
          <span class="turn_inblock" @click="deleteHistory(index)">删除记录</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getCookie} from "../../util/util";
  import { Dialog } from 'vant';

  export default {
        name: "ToEvaluate",
      data(){
        return{
          datas:[],
        }
      },
      methods:{
        deleteHistory:function (index) {
          Dialog.confirm({
            title: '注意',
            message: '您确定要取消这个订单吗？'
          }).then(() => {
            orderId:this.datas[index].id;
            this.$http({
              url:'/api' + '/delete_order.do',
              method:'post',
              params:{
                orderId:this.datas[index].order.id
              }
            }).then(({data})=>{
              if(data.status==200){
                Dialog.alert({
                  message: data.data
                }).then(() => {
                  this.datas.splice(index , 1)
                });
              }else{
                Dialog.alert({
                  message: data.msg
                }).then(() => {
                  // on close
                });
              }
            });
          }).catch(() => {
          });
        },
        initData(){
          if(getCookie('isLogin') == 'true'){
            this.$http({
              method:'post',
              url:'/api' + '/user_order.do',
              params:{}
            }).then(({data}) => {
              if (data.status === 200) {
                //获取status为2的订单
                for (var i = 0; i < data.data.length; i++) {
                  if (data.data[i].order.status == 3) {
                    this.datas.push(data.data[i]);
                  }
                }
              }
            })
          }
        },
        checkList(index){
          this.$router.push({path:'/confirmation_time',query:{orderId:this.datas[index].order.id,status:this.datas[index].order.status}});
        }
      },
      created(){
          this.initData()
      }
    }
</script>

<style scoped>

</style>
