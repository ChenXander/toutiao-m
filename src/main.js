import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 移动端适配
import {
  NavBar,
  Field,
  Form,
  Button,
  Tabbar,
  TabbarItem,
  Icon,
  Tab,
  Tabs,
  Cell,
  List,
  PullRefresh,
  ActionSheet,
  Popup,
  Badge,
  Col,
  Row,
  Search,
  Image as VanImage,
  Divider,
  Tag,
  CellGroup
} from 'vant'

Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Cell)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(ActionSheet)
Vue.use(Popup)
Vue.use(Badge)
Vue.use(Col)
Vue.use(Row)
Vue.use(Search)
Vue.use(VanImage)
Vue.use(Divider)
Vue.use(Tag)
Vue.use(CellGroup)

Vue.config.productionTip = false

// 自定义指令,自动聚焦
const directiveObj = { // 封装中间件函数插件
  install(Vue) {
    Vue.directive('fofo', {
      // el代表指令所在的标签
      inserted(el) {
        // 指定所在van-search组件
        // 组件根标签是div，input在内部
        // 以上都是原生标签对象
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          // el本身不是输入框，尝试获取
          const theInput = el.querySelector('input')
          const theTextArea = el.querySelector('textarea')
          if (theInput) theInput.focus()
          if (theTextArea) theTextArea.focus()
        }
      }
    })
  }
}
// 执行目标对象里install方法并传入Vue类
Vue.use(directiveObj)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
