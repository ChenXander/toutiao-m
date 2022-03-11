<template>
  <div>
    <!-- 头部导航 -->
    <div>
      <van-nav-bar>
        <template v-slot:left>
          <img class="logo" src="@/assets/logo.png" alt="" />
        </template>
        <template v-slot:right>
          <van-icon name="search" size="18" color="#fff" />
        </template>
      </van-nav-bar>
    </div>
    <!-- /头部导航 -->
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.logo {
  width: 100px;
  height: 30px;
}
</style>
