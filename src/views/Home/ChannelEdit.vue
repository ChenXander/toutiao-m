<template>
  <div>
    <!-- 弹出层头部 -->
    <van-nav-bar title="频道管理">
      <template #right>
        <van-icon name="cross" size="0.37333334rem" color="white" />
        <van-icon
          name="cross"
          size="0.37333334rem"
          color="white"
          @click="closeFn"
        />
      </template>
    </van-nav-bar>
    <!-- /弹出层头部 -->

    <!-- 我的频道 -->
    <div class="my-channel-box">
      <div class="channel-title">
        <span
          >我的频道
          <span class="small-title">
            点击{{ isEdit ? '删除' : '进入' }}频道
          </span>
        </span>
        <span @click="editFn">{{ isEdit ? '完成' : '编辑' }}</span>
      </div>

      <!-- 我的频道列表 -->
      <van-row type="flex">
        <van-col
          span="6"
          v-for="obj in userList"
          :key="obj.id"
          @click="userChannelClickFn(obj)"
        >
          <div class="channel-item van-hairline--surround">
            {{ obj.name }}
            <!-- 删除的徽标 -->
            <van-badge color="transparent" class="cross-badge">
              <template #content>
                <van-icon
                  name="cross"
                  class="badge-icon"
                  v-show="isEdit && obj.id !== 0"
                  color="#cfcfcf"
                  size="0.32rem"
                />
              </template>
            </van-badge>
          </div>
        </van-col>
      </van-row>
      <!-- /我的频道列表 -->
    </div>
    <!-- /我的频道 -->

    <!-- 更多频道 -->
    <div class="more-channel-box">
      <div class="channel-tile">
        <span>点击添加更多频道</span>
      </div>
      <!-- 更多频道列表 -->
      <van-row type="flex">
        <van-col
          span="6"
          v-for="obj in unCheckList"
          :key="obj.id"
          @click="moreFn(obj)"
        >
          <div class="channel-item van-hairline-surround">{{ obj.name }}</div>
        </van-col>
      </van-row>
    </div>
    <!-- /更多频道 -->
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    userList: Array, // 用户已选频道数组
    unCheckList: Array // 用户未选频道数组
  },
  data() {
    return {
      isEdit: false // 控制编辑状态
    }
  },
  created() {},
  methods: {
    // 编辑的事件
    editFn() {
      this.isEdit = !this.isEdit
    },

    // 添加更多频道点击事件
    moreFn(channelObj) {
      if (this.isEdit === true) {
        this.$emit('addChannelEV', channelObj)
      }
    },

    // 已选频道的点击事件
    userChannelClickFn(channelObj) {
      // 处于编辑状态 -> 执行删除功能
      if (this.isEdit === true) {
        if (channelObj.id !== 0) {
          // 推荐频道不能删除，但是不能和上面写在一起
          // 否则点击推荐频道就变成进入频道了，所以要在外面if，再进来判断
          this.$emit('removeChannelEV', channelObj)
        }
      } else {
        // 切换频道
        this.$emit('closeEV') // 关闭弹出层
        // 触发v-model绑定的input事件，把值传出去绑定给v-model对应的vue变量
        this.$emit('input', channelObj.id)
      }
    },

    // 关闭频道管理弹出层
    closeFn() {
      this.$emit('closeEV')
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup,
.popup-container {
  background-color: transparent;
  width: 100%;
  height: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-header {
  height: 90px;
  background-color: #007bff;
  color: #fff;
  text-align: center;
  font-size: 14px;
  position: relative;
  .title {
    width: 100%;
    position: absolute;
    bottom: 15px;
  }
}

.my-channel-box,
.more-channel-box {
  .pop-body {
    flex: 1;
    overflow: scroll;
    padding: 8px;
    background-color: #fff;
  }

  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
  }
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 5px;
}

// 删除的徽标
.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

// 提示文字
.samll-title {
  font-size: 10px;
  color: gray;
}
</style>
