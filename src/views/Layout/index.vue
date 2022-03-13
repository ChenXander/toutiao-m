<template>
  <div>
    <div class="home_container">
      <!-- 二级路由 -->
      <router-view></router-view>
      <!-- /二级路由 -->
    </div>

    <!-- 底部导航 -->
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/layout/home">首页</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/layout/user">我的</van-tabbar-item>
    </van-tabbar>
    <!-- /底部导航 -->
  </div>
</template>

<script>
export default {
  name: 'Layout',
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
// 防止内容被底部导航挡住
.home_container {
  padding-bottom: 50px;
}
// 底部导航上边框
.van-tabbar {
  border-top: 1px solid #f8f8f8;
}
</style>
