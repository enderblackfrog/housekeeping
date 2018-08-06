/*
直接更新state的多个方法的对象
 */
import {
  RECEIVE_SERVICEADDRESSLIST,
  RECEIVE_USER_INFO,
  RECEIVE_COUPONS,
} from './mutation-types'

export default {
  [RECEIVE_SERVICEADDRESSLIST] (state , serviceaddresslist){
    state.serviceaddresslist = serviceaddresslist
  },
  // [RECEIVE_USER_INFO] (state , userInfo){
  //   state.userInfo = userInfo
  // },
  // [RECEIVE_COUPONS] (state , Coupons) {
  //   state.Coupons = Coupons
  // }
}
