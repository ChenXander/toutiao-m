<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon
        name="arrow-left"
        color="#fff"
        size="0.48rem"
        class="goback"
        @click="$router.back()"
      />
      <!-- 搜索组件 -->
      <van-search
        v-fofo
        placeholder="请输入搜索关键词"
        background="#007bff"
        shape="round"
      />
    </div>
    <!-- /搜索页面头部 -->
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      kw: '' // 搜索关键词
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  // 后退按钮
  .goback {
    padding-left: 14px;
  }
  // 搜索组件
  .van-search {
    flex: 1;
  }
}
</style>
