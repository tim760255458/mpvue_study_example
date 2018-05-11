import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const options = {
  state: {
    testmessage: 'test message'
  }
}

export default new Vuex.Store(options)
