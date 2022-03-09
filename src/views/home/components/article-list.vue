<template>
  <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  components: {},
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中loading状态
      finished: false // 控制数据加载结束的状态
    }
  },
  created() {},
  methods: {
    // 初始化或滚动到底的时候触发调用
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束，关闭后才能触发下一次加载更多
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          // 如果没有更多数据，finished设为true结束触发加载更多
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
