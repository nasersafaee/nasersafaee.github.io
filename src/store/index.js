import Vue from 'vue'
import Vuex from 'vuex'
import { createStore } from 'vuex-extensions'

Vue.use(Vuex)

import { home } from './modules/home'

import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  key: 'bitpay-store',
  storage: window.localStorage,
  reducer: (state) => ({
    home: state.home,
  }),
})

export default createStore(Vuex.Store, {
  modules: {
    home,
  },
  plugins: [vuexLocal.plugin],
})
