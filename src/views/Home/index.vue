<template>
  <div>
    <!-- 头部导航 -->
    <div>
      <van-nav-bar fixed>
        <template v-slot:left>
          <img class="logo" src="@/assets/logo.png" alt="" />
        </template>
        <template v-slot:right>
          <van-icon name="search" size="18" color="#fff" />
        </template>
      </van-nav-bar>
    </div>
    <!-- /头部导航 -->

    <!-- tab栏 -->
    <div class="main">
      <van-tabs v-model="active" animated sticky offset-top="1.226667rem">
        <van-tab
          v-for="item in userChannelList"
          :title="item.name"
          :key="item.id"
        >
          <article-list :list="articleList"></article-list>
        </van-tab>
      </van-tabs>
    </div>
    <!-- /tab栏 -->
  </div>
</template>

<script>
import { getUserChannelsAPI, getAllArticlesAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'

export default {
  name: 'Home',
  components: { ArticleList },
  data() {
    return {
      active: 0,
      userChannelList: [], // 用户频道列表
      articleList: [] // 文章列表
    }
  },
  async created() {
    // 频道列表
    const res = await getUserChannelsAPI()
    this.userChannelList = res.data.data.channels

    // 文章列表
    const timer = new Date()
    const res2 = await getAllArticlesAPI({
      channel_id: 0, // 先默认请求推荐频道数据
      timestamp: timer.getTime()
    })
    this.articleList = res2.data.data.results
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.logo {
  width: 100px;
  height: 30px;
}

.main {
  padding-top: 46px;
  //   底部在Layout/index.vue给二级路由挂载点
}
</style>
