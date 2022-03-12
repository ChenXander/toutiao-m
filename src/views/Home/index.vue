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
          <article-list></article-list>
        </van-tab>
      </van-tabs>
    </div>
    <!-- /tab栏 -->
  </div>
</template>

<script>
import { getUserChannelsAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'

export default {
  name: 'Home',
  components: { ArticleList },
  data() {
    return {
      active: 0,
      userChannelList: [] // 用户频道列表
    }
  },
  async created() {
    try {
      const res = await getUserChannelsAPI()
      this.userChannelList = res.data.data.channels
    } catch (error) {}
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
