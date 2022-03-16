import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'
// import Layout from '@/views/Layout'
// import Home from '@/views/Home'
// import User from '@/views/User'
// import Search from '@/views/Search'
// import SearchResult from '@/views/Search/SearchResult'
// import ArticleDetail from '@/views/ArticleDetail'
// import UserEdit from '@/views/User/UserEdit'
// import Chat from '@/views/Chat'

// 路由懒加载：为了让第一个页面加载的app.js小一点，打开网页快一点
// 把组件对应的js分成若干个js，路由切换到哪个页面才加载对应的js文件
// 原因：webpack分析入口时，直接打包了router所import的所有页面进app.js，导致app.js很大
// 解决：当路由路径规则匹配时，才去import对应的组件js文件
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '@/views/Login')
  },
  {
    path: '/layout',
    component: () =>
      import(/* webpackChunkName: "Layout" */ '@/views/Layout'),
    children: [
      {
        path: 'home',
        component: () =>
          import(/* webpackChunkName: "Home" */ '@/views/Home')
      },
      {
        path: 'user',
        component: () =>
          import(/* webpackChunkName: "User" */ '@/views/User')
      }

    ]
  },
  {
    path: '/search',
    component: () =>
      import(/* webpackChunkName: "Search" */ '@/views/Search')
  },
  { // 搜索结果
    path: '/search_result/:kw',
    component: () =>
      import(/* webpackChunkName: "SearchResult" */ '@/views/Search/SearchResult')
  },
  // 文章详情页
  {
    path: '/detail',
    component: () =>
      import(/* webpackChunkName: "ArticleDetail" */ '@/views/ArticleDetail')
  },
  {
    path: '/user_edit',
    component: () =>
      import(/* webpackChunkName: "UserEdit" */ '@/views/User/UserEdit')
  },
  {
    path: '/chat',
    component: () =>
      import(/* webpackChunkName: "Chat" */ '@/views/Chat')
  }
]

const router = new VueRouter({
  routes
})

export default router
