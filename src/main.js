import '@/utils/console.js' // 去掉打印语句
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'highlight.js/styles/default.css' // 代码高亮样式
import 'amfe-flexible' // 移动端适配
import directiveObj from '@/utils/directive'
import './VueCommponent' // vant组件注册单独分离成 一个js文件，让main.js更清晰
// 执行目标对象里install方法并传入Vue类
Vue.use(directiveObj)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
