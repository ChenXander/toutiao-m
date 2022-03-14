<template>
  <div>
    <!-- 头部导航 -->
    <div>
      <van-nav-bar fixed>
        <template v-slot:left>
          <img class="logo" src="@/assets/logo.png" alt="" />
        </template>
        <template v-slot:right>
          <van-icon name="search" size="18" color="#fff" />
        </template>
      </van-nav-bar>
    </div>
    <!-- /头部导航 -->

    <!-- tab栏 -->
    <div class="main">
      <van-tabs
        v-model="channelId"
        @change="channelChangeFn"
        animated
        sticky
        offset-top="1.226667rem"
      >
        <van-tab
          v-for="item in userChannelList"
          :title="item.name"
          :key="item.id"
          :name="item.id"
        >
          <ArticleList :channelId="channelId"></ArticleList>
        </van-tab>
      </van-tabs>

      <!-- 编辑频道图标 -->
      <van-icon
        name="plus"
        size="0.37333334rem"
        class="moreChannels"
        @click="plusClickFn"
      />
      <!-- /编辑频道图标 -->
    </div>
    <!-- /tab栏 -->

    <!-- 频道管理弹出层 -->
    <van-popup class="channel-popup" v-model="show" get-container="body">
      <ChannelEdit
        :userList="userChannelList"
        :unCheckList="unCheckChannelList"
        @addChannelEV="addChannelFn"
        @removeChannelEV="removeChannelFn"
        @closeEV="closeFn"
        ref="editRef"
      ></ChannelEdit>
    </van-popup>
    <!-- /频道管理弹出层 -->
  </div>
</template>

<script>
import {
  getUserChannelsAPI,
  getAllArticlesListAPI,
  getAllChannelsAPI,
  updateChannelsAPI,
  removeTheChannelAPI
} from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './ChannelEdit.vue'

export default {
  name: 'Home',
  components: { ArticleList, ChannelEdit },
  data() {
    return {
      channelId: 0, // tab导航，激活频道ID，默认0，页面默认显示推荐页面
      userChannelList: [], // 用户频道列表
      allChannelList: [], // 所有频道列表
      articleList: [], // 文章列表
      show: false // 频道弹出层显示与隐藏
    }
  },
  async created() {
    // 频道列表
    const res = await getUserChannelsAPI()
    this.userChannelList = res.data.data.channels

    // 文章列表
    const res2 = await getAllArticlesListAPI({
      channel_id: 0, // 先默认请求推荐频道数据
      timestamp: Date.now()
    })
    this.articleList = res2.data.data.results

    // 所有频道列表
    const res3 = await getAllChannelsAPI()
    this.allChannelList = res3.data.data.channels
  },
  methods: {
    // tab切换事件
    async channelChangeFn() {},

    // 编辑状态
    plusClickFn() {
      this.show = true
    },

    // 添加频道
    async addChannelFn(channelObj) {
      // 数组删选是在computed里，依赖的userChannelList发生改变，数组筛选会重新执行
      this.userChannelList.push(channelObj)

      // 推荐频道不能传递，删选出除推荐频道外的剩余频道
      /* const newArr = this.userChannelList.filter((obj) => obj.id !== 0)
      newArr.forEach((obj, index) => {
        delete obj.name // 去掉不需要传递的name属性
        obj.seq = index // 新增需要传递的seq序号
      })
      const res = await updateChannelsAPI({
        channels: this.userChannelList
      }) */
      // *上面的代码出问题，新增频道时，频道的名字被删除了
      // *原因：所有数组里的对象，都是同一个内存地址，影响到ChannelEdit的对象
      // *解决办法
      const newArr = this.userChannelList.filter((obj) => obj.id !== 0)
      const theNewArr = newArr.map((obj, index) => {
        const newObj = { ...obj } // 拷贝(浅拷贝)
        delete newObj.name
        newObj.seq = index

        return newObj // 让map方法把新对象收集起来形成新数组
      })
      const res = await updateChannelsAPI({
        channels: theNewArr
      })
      console.log(res)
    },

    // 删除频道
    async removeChannelFn(channelObj) {
      const index = this.userChannelList.findIndex(
        (obj) => obj.id === channelObj.id
      )
      this.userChannelList.splice(index, 1)

      const res = await removeTheChannelAPI({
        channelId: channelObj.id
      })
      console.log(res)
    },

    // 关闭弹出层
    closeFn() {
      this.show = false
      // 让内部编辑状态回归false
      this.$refs.editRef.isEdit = false
    }
  },

  computed: {
    unCheckChannelList() {
      // 对所有频道数组进行filter删选，对比用户已选频道数组，删选掉用户已选频道,并将新数据存到新数组
      const newArr = this.allChannelList.filter((bigObj) => {
        const index = this.userChannelList.findIndex((smallObj) => {
          return smallObj.id === bigObj.id
        })

        // 如果有重复的频道
        if (index > -1) {
          return false
        } else {
          return true
        }
      })

      return newArr
      // * 简化写法，不利于阅读
      /* return this.allChannelList.filter(
        (bigObj) =>
          this.userChannelList.findIndex(
            (smallObj) => smallObj.id === bigObj.id
          ) !== -1
      ) */
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  height: 43px;
}

.main {
  padding-top: 46px;
  //   底部在Layout/index.vue给二级路由挂载点
}

// 设置tab容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}

// 频道编辑弹出层
.channel-popup {
  width: 100vw;
  height: 100vh;
}
</style>
