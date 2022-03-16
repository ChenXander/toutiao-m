<template>
  <div class="user-edit-container">
    <!-- Header区域 -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- /Header区域 -->

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image
            round
            class="avatar"
            :src="profileObj.photo"
            @click="imageClickFn"
          />
          <!-- file文件选择框 -->
          <!-- 视觉上隐藏，标签还在 -->
          <input
            type="file"
            ref="iptFile"
            v-show="false"
            accept="image/"
            @change="onFileChange"
          />
        </template>
      </van-cell>
      <van-cell
        title="名称"
        is-link
        :value="profileObj.name"
        @click="nameClickFn"
      />
      <van-cell
        title="生日"
        is-link
        :value="profileObj.birthday"
        @click="birthdayClickFn"
      />
    </van-cell-group>
    <!-- /用户资料 -->

    <!-- 姓名修改的弹窗 -->
    <van-dialog
      v-model="show"
      title="标题"
      show-cancel-button
      :before-close="beforeCloseFn"
    >
      <input type="text" v-fofo v-model="inputUserName" />
    </van-dialog>
    <!-- /姓名修改的弹窗 -->

    <!-- 生日时间选择器 -->
    <van-popup
      round
      v-model="dateTimePickerShow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="dateCancelFn"
        @confirm="confirmFn"
      />
    </van-popup>
    <!-- /生日时间选择器 -->
  </div>
</template>

<script>
import { userProfileAPI, updateUserPhotoAPI, updateUserProfileAPI } from '@/api'
import { Notify } from 'vant'
import { formatDate } from '@/utils/date.js'
import { mapMutations } from 'vuex'

export default {
  name: 'UserEdit',
  components: {},
  data() {
    return {
      profileObj: {}, // 用户基本资料
      show: false, // 姓名修改弹窗的显示隐藏
      inputUserName: '', // 修改名字弹出框绑定的值
      minDate: new Date(1920, 0, 1), // 最小范围
      maxDate: new Date(), // 最大范围(默认获取系统日期-今日)
      currentDate: new Date(2021, 0, 17), // 当前时间
      dateTimePickerShow: false // 控制日期弹出层显示与隐藏
    }
  },
  async created() {
    const res = await userProfileAPI()
    this.profileObj = res.data.data
  },
  methods: {
    ...mapMutations(['SET_USERPHOTO', 'SET_USERNAME']),

    // 文件选择改变事件
    async onFileChange(e) {
      if (e.target.files[0] === 0) return // 用户没有选择图片
      // 创建FormData对象
      const theFd = new FormData()
      theFd.append('photo', e.target.files[0]) // 请求体里加入一对参数和值

      const res = await updateUserPhotoAPI(theFd)
      this.profileObj.photo = res.data.data.photo

      this.SET_USERPHOTO(res.data.data.photo) // 更新成功后同步到vuex中
    },

    // 图片点击事件
    imageClickFn() {
      this.$refs.iptFile.click() // js模拟标签事件的触发
    },

    // 姓名的点击事件
    nameClickFn() {
      this.show = true
      this.inputUserName = this.profileObj.name
    },

    // 姓名确认框关闭前的回调函数
    async beforeCloseFn(action, done) {
      if (action === 'confirm') {
        // 确定
        const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.inputUserName) === true) {
          // 通过了校验
          await updateUserProfileAPI({
            name: this.inputUserName
          })
          this.profileObj.name = this.inputUserName
          this.SET_USERNAME(this.inputUserName)
          done()
        } else {
          // 没通过校验
          Notify({
            type: 'warning',
            message: '用户名只能是1-7位中英文数字组合'
          })
          done(false)
        }
      } else {
        // 取消，关闭弹窗
        done()
      }
    },

    // 编辑生日的点击事件
    birthdayClickFn() {
      this.dateTimePickerShow = true
      this.currentDate = new Date(this.profileObj.birthday)
    },

    // 生日选择器的取消事件
    dateCancelFn() {
      this.dateTimePickerShow = false
    },

    // 生日选择器完成确认
    async confirmFn() {
      await updateUserProfileAPI({
        // 选择器里currentDate是日期对象，后台要的是年-月-日字符串
        birthday: formatDate(this.currentDate)
      })
      this.dateTimePickerShow = false
      this.profileObj.birthday = formatDate(this.currentDate)
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}

/deep/ .van-dialog__content {
  text-align: center;
  input {
    padding: 0;
    outline: none;
    border: none;
    text-align: center;
  }
}
</style>
