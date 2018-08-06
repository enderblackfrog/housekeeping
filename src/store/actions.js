/*
通过mutation间接更新state的多个方法的对象
 */
import {

  RECEIVE_SERVICEADDRESSLIST,
  RECEIVE_USER_INFO,
  RECEIVE_COUPONS,

} from './mutation-types'

import {

  reqServiceAddressList,
  reqCoupons,


} from '../api'


export default {

  // 异步获取'地址'
  async getServiceAddressList ({commit,state}){
  //   //1.发送异步ajax请求
    const {userId} = state;
    const result = await reqServiceAddressList(userId);
  //   //2.提交一个mutation
    if(result.status === 200){
      const ServiceAddressList = result.data;
      commit(RECEIVE_SERVICEADDRESSLIST,{ServiceAddressList})
    }
  },
  // //同步获取用户信息
  // recordUser ({commit,userInfo}){
  //   commit(RECEIVE_USER_INFO,{userInfo})
  // },
  //获取优惠券
  // async getCoupons ({commit,state}){
  //   //   //1.发送异步ajax请求
  //   const {spuId} = state;
  //   const result = await reqCoupons(spuId);
  //   //   //2.提交一个mutation
  //   if(result.status === 200){
  //     const Coupons = result.data.coupons;
  //     commit(RECEIVE_COUPONS,{Coupons})
  //   }
  // },

}

