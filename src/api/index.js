// 统一封装接口方法
// 每个方法负责请求一个url，便于统一管理
import axios from '@/utils/request.js'
// 既引入也同时向外按需导出所有引入过来的方法(中转作用)
export * from './ArticleDetail'
export * from './Channel'
export * from './User'

// 获取文章推荐数据
export const getAllArticlesListAPI = ({ channel_id, timestamp }) => axios({
  url: '/v1_0/articles',
  method: 'GET',
  params: { // 这里的参数会被axios拼接到URL?后面(查询字符串)
    channel_id,
    timestamp
  }
})

// 文章反馈面板-不感兴趣
export const dislikeArticleAPI = ({ artId }) => axios({
  url: '/v1_0/article/dislikes',
  method: 'POST',
  data: {
    target: artId
  }
})

// 文章反馈面板-反馈垃圾内容
export const reportArticleAPI = ({ artId, type }) => axios({
  url: '/v1_0/article/reports',
  method: 'POST',
  data: {
    target: artId,
    type: type,
    remark: '如果你想写，你可以在逻辑页面判断下，如果类型是0，再给一个弹出框输入其他问题，传参到这里'
  }
})

// 搜索-联想菜单列表
export const suggestListAPI = ({ keywords }) => axios({
  url: '/v1_0/suggestion',
  method: 'GET',
  params: {
    q: keywords
  }
})

// 搜索-搜索结果列表
export const searchResultAPI = ({ page = 1, per_page = 10, q }) => axios({
  url: '/v1_0/search',
  method: 'GET',
  params: {
    page,
    per_page,
    q
  }
})

// 登录接口
export const loginAPI = ({ mobile, code }) => axios({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})

// 刷新用户token
export const getNewTokenAPI = () => axios({
  url: '/v1_0/authorizations',
  method: 'PUT',
  headers: {
    // 请求拦截器统一携带的token，而这次请求携带的是refresh_tokne
    // 所以在axios请求拦截器里判断是为了这种情况准备
    Authorization: 'Bearer ' + localStorage.getItem('refresh_token')
  }
})
