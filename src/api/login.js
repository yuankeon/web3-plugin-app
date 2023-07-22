import { request } from "./request";

const API = {
  //获取nonce -> 用于登录
  getEmailNonce: '/defed/user/email/getNonce',
  //登录接口
  postJWT_token: '/defed/gateway/login',
  //获取验证码
  getSendVerifyCode: '/defed/user/email/sendVerifyCode',
}

export const getEmailNonce = (data) => request.post(API.getEmailNonce, data)

export const getTokenAPI = (data) => request.post(API.postJWT_token, data)

export const getSendVerifyCode = (params) => request.get(API.getSendVerifyCode, { params })