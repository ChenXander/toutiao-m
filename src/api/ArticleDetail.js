import axios from '@/utils/request.js'

// 获取文章详情
export const detailAPI = ({ artId }) => axios({
  url: `/v1_0/articles/${artId}`,
  method: 'GET'
})

// 文章点赞
export const likeArticleAPI = ({ artId }) => axios({
  url: '/v1_0/article/likings',
  method: 'POST',
  data: {
    target: artId
  }
})

// 文章取消点赞
export const unLikeArticleAPI = ({ artId }) => axios({
  url: `/v1_0/article/likings/${artId}`,
  method: 'DELETE'
})

// 文章评论列表
export const commentsListAPI = ({ id, offset = null, limit = 10 }) => axios({
  url: '/v1_0/comments',
  method: 'GET',
  params: { // axios只针对params参数，如果发现键值对，值为null，会忽略此参数名和值不携带在url?后面
    type: 'a', // 如果值会变化则不选择固定值，由外面传值进来
    source: id,
    offset,
    limit
  }
})

// 文章评论-发布评论
export const commentSendAPI = ({ id, content, art_id = null }) => {
  // 1.axios中data请求体传参，如果值为null是不会忽略这个参数
  // 也会把参数名和值携带后台(只有parmas遇到null会忽略)
  // 2.形参art_id可选参数，如果逻辑页面是对文章评论，则不需要传递art_id
  // 所以这时，内部art_id值为null就证明此次调用是针对文章评论

  // data请求体对象需要自己处理
  const obj = {
    target: id,
    content
  }
  if (art_id !== null) { // 如果本次有第三个参数，证明是对评论进行回复，否则是对文章回复
    obj.art_id = art_id
  }
  return axios({
    url: '/v1_0/comments',
    method: 'POST',
    data: obj
  })
}

// 文章评论点赞
export const commentLikingAPI = ({ comId }) => axios({
  url: '/v1_0/comment/likings',
  method: 'POST',
  data: {
    target: comId
  }
})

// 文章评论取消点赞
export const commentDisLikingAPI = ({ comId }) => axios({
  url: `/v1_0/comment/likings/${comId}`,
  method: 'DELETE'
})

// 文章收藏
export const articleCollectionAPI = ({ artId }) => axios({
  url: '/v1_0/article/collections',
  method: 'POST',
  data: {
    target: artId
  }
})

// 文章取消收藏
export const articleDisCollectionAPI = ({ artId }) => axios({
  url: `/v1_0/article/collections/${artId}`,
  method: 'DELETE'
})
