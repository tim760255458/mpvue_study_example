import Vue from 'vue'
import Vuex from 'vuex'
import { setStorage } from '../utils/storage'

Vue.use(Vuex)

const options = {
  state: {
    testmessage: 'test message',
    user_info: {}, // 用户信息
    groups: [], // 分组信息
    state: null // 周报状态
  },
  mutations: {
    SET_USER_INFO (state, params) {
      state.user_info = params
      setStorage('user_info', params)
    },
    SET_GROUPS (state, params) {
      state.groups = params
      setStorage('groups', params)
    },
    SET_STATE (state, params) {
      state.state = params
      setStorage('state', params)
    }
  }
}

export default new Vuex.Store(options)
