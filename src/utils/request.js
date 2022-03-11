// 请求模块
import theAxios from 'axios'

const request = theAxios.create({
  baseURL: 'http://toutiao.itheima.net/', // 接口的基准路径
  timeout: 20000 // 请求超时时间
})

export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return request({
    url,
    method,
    params,
    data,
    headers
  })

  /*  //* 替换ajax
    return new Promise((resolve, reject) => {
      //* 判断如果有params值，则自己写js代码将params对象的key和value拼接到url
      $.ajax({
        url,
        data,
        headers,
        type:method,
        success:(res) => {
          resolve(res)
        },
        error: err = > {
          reject(err)
        }
      })
    })
  */
}
