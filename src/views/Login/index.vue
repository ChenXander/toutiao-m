<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar class="" title="头条-登录"> </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        required
        name="mobile"
        label="手机号"
        placeholder="请输入11位手机号"
        :rules="[
          {
            required: true,
            message: '请填写正确手机号',
            pattern: /^1[3-9]\d{9}$/
          }
        ]"
      />
      <van-field
        v-model="user.code"
        required
        type="password"
        name="code"
        label="密码"
        placeholder="请输入6位密码"
        :rules="[{ required: true, message: '请填写密码', pattern: /^\d{6}$/ }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  created() {},
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    }
  }
}
</script>

<style lang="less" scoped>
//* 改用vant组件定制
// van-nav-bar组件的根标签
// .van-nav-bar {
//   background-color: #007bff;
//   color: #fff;
// }
// // /deep/ 会把属性选择器加到前面
// /deep/ .van-nav-bar__title {
//   color: #fff;
// }
</style>
