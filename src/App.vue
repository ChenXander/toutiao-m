<template>
  <div>
    <!-- 组件缓存:部分一级路由不需要缓存，exclude对组件name进行排除 -->
    <keep-alive exclude="Search,SearchResult,ArticleDetail,UserEdit">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped>
</style>
