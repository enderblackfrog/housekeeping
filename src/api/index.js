// 包含n个接口请求函数的模块
// 函数的返回值：promise对象
import ajax from './ajax'
const BASE_URL = '/api';
// 1.地址
export const reqServiceAddressList = (userId) => ajax(BASE_URL+'/address_admin.do',{userId},'POST');
//2.登陆
export const reqLogin = (username , password) => ajax(BASE_URL+'/login.do',{username , password},'POST');
//3.登出
// export const reqLogout = () =>ajax();
//4.更具会话session获取用户信息
// export const reqUserInfo = () =>ajax();

// export const reqCoupons = (spuId) => ajax(BASE_URL+'/confirm_order.do',{spuId:1},'POST');

