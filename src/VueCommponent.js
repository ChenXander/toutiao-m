import Vue from 'vue'
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
  CellGroup,
  Dialog,
  DatetimePicker,
  Loading,
  Lazyload
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
Vue.use(Dialog)
Vue.use(DatetimePicker)
Vue.use(Loading)
// 如果懒加载图片失败，使用错误提示图片
Vue.use(Lazyload, {
  preLoad: 0.8, // 屏幕高度的范围百分比0-1，预加载范围
  error: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01bb495b486e18a80121ade0866d6a.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650024283&t=88257093cb57ef6e08a779518c8c271a'
})
