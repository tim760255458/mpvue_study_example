<template>
  <div class="container" @click="clickHandle('test click', $event)">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <p class="h1">mpvue 开发小程序 相关示例</p>
    <div class="card-example default-card">
      <p class="card-header">项目目录解释（以 src 目录为根）</p>
      <div class="card-main">
        <p><span class="card-main-span">components</span> 组件文件夹</p>        
        <p><span class="card-main-span">pages</span> 页面文件夹</p>
        <p><span class="card-main-span">store</span> 状态管理，使用vuex</p>
        <p><span class="card-main-span">utils</span> 全局方法（如：时间处理）</p>       
        <p><span class="card-main-span">App.vue</span> 在这里请求用户信息，其他的好像没了。别管它...</p>
        <p><span class="card-main-span">main.js</span> 在这里注册页面（可选，不注册也可以）、添加全局 store、设置一些样式</p>
      </div>
    </div>
    <div class="card-example default-card">
      <p class="card-header">新建页面（以 testpage 目录为例）</p>
      <div class="card-main">
        <p>在 pages 文件夹下新建目录，目录中必须包括 index.vue 和 main.js 文件（尽量不要改变命名），<span class="card-main-warning">创建完成后必须要运行 npm run dev</span></p>
        <p><span class="card-main-span">index.vue</span> 没什么说的，就是要展示的页面</p>        
        <p><span class="card-main-span">main.js</span> 作用是运行时创建页面（个人理解）</p>
      </div>
    </div>
    <div class="card-example default-card input-example">
      <p class="card-header">使用表单的例子（提交后改变 store 中的状态，并将新的状态保存到 storage 中。utils -> storage.js 封装了相应的方法）</p>
      <div class="card-main">
        <input class="input-item" type="email" v-model="email" placeholder="输入邮箱..." />
        <input class="input-item" type="password" v-model="password" placeholder="输入密码..." />
      </div>
      <div class="input-example-btns">
        <button @click="submit">提交</button>
        <button @click="check">检验</button>
      </div>
      <p v-if="isCheck">email: {{ checkData.email }}, password: {{ checkData.password }}</p>
    </div>
    <div class="vuex-box card-example default-card">
      <p class="card-header">使用 vuex 的例子，点击按钮从 store 获取 testmessage 的值。具体使用看代码</p>
      <div class="card-main">
        <p>{{ message }}</p>
        <button @click="clicked">click</button>
      </div>
    </div>
    <div class="default-card card-example">
      <p class="card-header">使用路由的例子（mpvue 暂不支持 vue-router）</p>
      <div class="card-main">
        <p>url 形式</p>
        <a class="counter" href="/pages/counter/main">去往Vuex示例页面</a>
        <p>函数调用形式</p>
        <button @click="toPage">去往 logs 页</button>
      </div>
    </div>
    <div class="default-card card-example">
      <p class="card-header">使用路由传递参数的例子</p>
      <div class="card-main">
        <p>url 形式</p>
        <a class="counter" href="/pages/testpage/main?value=1&name=buer">去往 test 示例页面</a>
      </div>
      <p class="card-header">注意：在使用 mpvue 开发时，新创建一个页面后需要再次运行 npm run dev 才能使页面生效。</p>
    </div>
    <div class="default-card card-example">
      <p class="card-header">请求示例（封装微信请求 api 为 promise 形式。）</p>
      <div class="card-main">
        <p>去http://gank.io/api/data/Android/10/1请求数据</p>
        <button @click="query">发起请求</button>
        <ul>
          <li class="list-item" v-for="(item, index) of listData" :key="index">{{ item.desc }} - {{ item.who }}</li>
        </ul>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
  </div>
</template>

<script>
import card from '@/components/card'
import { mapState, mapMutations } from 'vuex'
import { getStorage } from '../../utils/storage.js'
import { getList } from '../../api'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      email: null,
      password: null,
      message: null,
      checkData: {},
      isCheck: false,
      listData: []
    }
  },

  components: {
    card
  },

  computed: {
    ...mapState([
      'user_info'
    ])
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    clicked () {
      console.log(this.$store)
      this.message = this.$store.state.testmessage
    },
    toPage () {
      // const url = '../logs/main'
      wx.navigateTo({
        url: '../logs/main'
      })
    },
    submit () {
      const params = {
        email: this.email,
        password: this.password
      }
      console.log(params)
      this.setUserInfo(params)
    },
    check () {
      const val = getStorage('user_info')
      console.log(val)
      if (val) {
        this.checkData = val
      } else {
        this.checkData = '未检出数据'
      }
      this.isCheck = true
    },
    query () {
      wx.showLoading({
        title: 'Loading...',
        mask: true
      })
      getList().then(res => {
        this.listData = res.data.results
        wx.hideLoading()
      })
      setTimeout(function(){
        wx.hideLoading()
      },2000)
    },
    ...mapMutations({
      setUserInfo: 'SET_USER_INFO'
    })
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}

.input-item {
  border: 1rpx solid #ddd;
  padding: 3px 5px;
  border-radius: 2px;
  margin-bottom: 20px;
  font-size: 14px;
  color: rgb(67, 190, 98);
  width: 300px;
}
.vuex-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.card-header {
  font-size: 14px;
  padding: 5px 20px;
  color: orangered;
}
.default-card {
  width: 90%;
  padding: 10px;
  border: 1rpx solid #ddd;
  box-shadow: 0 0 5px #ddd;
  border-radius: 3px;
}
.card-example {
  margin-bottom: 20px;
}
.card-main {
  font-size: 16px;
  color: #aaa;
}
.card-main-span {
  color: brown;
  font-weight: bold;
}
.h1 {
  font-size: 20px;
  color: rgb(219, 120, 28);
  font-weight: bold;
  padding: 20px 5px;
}
.card-main-warning {
  color: crimson;
}
.input-example {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input-example-btns {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.list-item {
  color: cadetblue;
  box-shadow: 0 0 4px #ddd;
  margin: 10px 0;
  padding: 5px;
}
</style>
