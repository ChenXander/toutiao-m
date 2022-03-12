// 统一封装接口方法
// 每个方法负责请求一个url，便于统一管理
import axios from '@/utils/request.js'

// 获取所有频道
export const getAllChannelsAPI = () => axios({
  url: '/v1_0/channels',
  method: 'GET'
})

// 获取用户频道,若没有登录则默认返回后台设置的默认频道列表
export const getUserChannelsAPI = () => axios({
  url: '/v1_0/user/channels',
  method: 'GET'
})

// 获取文章推荐数据
export const getAllArticleListAPI = ({ channel_id, timestamp }) => axios({
  url: '/v1_0/articles',
  method: 'GET',
  params: { // 这里的参数会被axios拼接到URL?后面(查询字符串)
    channel_id,
    timestamp
  }
})

// 文章反馈面板-不感兴趣
export const dislikeArticleAPI = ({ artId }) => {
  return axios({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: artId
    }
  })
}

// 文章反馈面板-反馈垃圾内容
export const reportArticleAPI = ({ artId, type }) => {
  return axios({
    url: '/v1_0/article/reports',
    method: 'POST',
    data: {
      target: artId,
      type: type,
      remark: '如果你想写，你可以在逻辑页面判断下，如果类型是0，再给一个弹出框输入其他问题，传参到这里'
    }
  })
}

// 登录接口
export const loginAPI = ({ mobile, code }) => axios({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})
