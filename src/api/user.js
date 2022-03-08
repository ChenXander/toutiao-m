// 用户相关请求模块
import request from '@/utils/request'
// import store from "@/store";

// 登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 发送验证码
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'

    /* 请求头，通过配置请求拦截器取代此处
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    }, */
  })
}
