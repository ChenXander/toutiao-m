// 封装本地存储的方式:localStorage,sessionStorage,cookie
// 统一管理，方便替换修改

export const setStorage = (key, value) => {
  return localStorage.setItem(key, value)
}

export const getStorage = (key) => {
  return localStorage.getItem(key)
}

export const removeStorage = (key) => {
  return localStorage.removeItem(key)
}
