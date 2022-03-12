// 统一封装接口方法
// 每个方法负责请求一个url，便于统一管理
import request from '@/utils/request.js'
import { getToken } from '@/utils/token.js'

// 获取所有频道
export const getAllChannelsAPI = () => request({
  url: '/v1_0/channels',
  method: 'GET'
})

// 获取用户频道,若没有登录则默认返回后台设置的默认频道列表
export const getUserChannelsAPI = () => request({
  url: '/v1_0/user/channels',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}` // Bearer后必须有空格
  }
})

// 获取文章推荐数据
export const getAllArticlesAPI = ({ channel_id, timestamp }) => request({
  url: '/v1_0/articles',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}` // Bearer后必须有空格
  },
  params: { // 这里的参数会被axios拼接到URL?后面(查询字符串)
    channel_id,
    timestamp
  }
})

// 登录接口
export const loginAPI = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})
