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
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :disabled="isLoading"
          :loading="isLoading"
          loading-text="加载中..."
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { loginAPI } from '@/api'
import { setToken } from '@/utils/token'
import { Notify } from 'vant'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      user: {
        mobile: '13861766176',
        code: '246810'
      },
      isLoading: false // 登录按钮加载状态的显示隐藏
    }
  },
  created() {},
  methods: {
    async onSubmit(values) {
      // 加载状态设置true
      this.isLoading = true

      try {
        const res = await loginAPI(this.user)
        console.log(res)
        Notify({ type: 'success', message: '登录成功！！！' })
        setToken(res.data.data.token)
        localStorage.setItem('refresh_token', res.data.data.refresh_token)
        // 跳转一定要写在最后，最后执行
        // this.$router.push()压栈(会产生历史记录。可以回退)，this.$router.replace()替换(不会产生历史记录)
        this.$router.replace({
          path: '/layout/home' // 路由规则里没有重定向所以写全
        })
      } catch (err) {
        Notify({ type: 'danger', message: '账号或密码错误' })
      }
      // 网络请求完成无论成功/报错,关闭加载状态
      this.isLoading = false
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
