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
      <van-tabs
        v-model="channelId"
        @change="channelChangeFn"
        animated
        sticky
        offset-top="1.226667rem"
      >
        <van-tab
          v-for="item in userChannelList"
          :title="item.name"
          :key="item.id"
          :name="item.id"
        >
          <ArticleList :channelId="channelId"></ArticleList>
        </van-tab>
      </van-tabs>

      <!-- 编辑频道图标 -->
      <van-icon name="plus" size="0.37333334rem" class="moreChannels" />
      <!-- /编辑频道图标 -->
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
      channelId: 0, // tab导航，激活频道ID，默认0，页面默认显示推荐页面
      userChannelList: [] // 用户频道列表
    }
  },
  async created() {
    // 频道列表
    const res = await getUserChannelsAPI()
    this.userChannelList = res.data.data.channels
  },
  methods: {
    // tab切换事件
    async channelChangeFn() {}
  }
}
</script>

<style lang="less" scoped>
.logo {
  height: 43px;
}

.main {
  padding-top: 46px;
  //   底部在Layout/index.vue给二级路由挂载点
}

// 设置tab容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
</style>
