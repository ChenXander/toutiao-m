<template>
  <div>
    <!-- 文章列表 -->
    <ArticleItem
      v-for="item in list"
      :key="item.art_id"
      :artItem="item"
    ></ArticleItem>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
export default {
  name: '',
  components: { ArticleItem },
  props: {
    list: Array // 文章列表数组
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
