import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import cart from './modules/cart'
import products from './modules/products'
import provinces from './modules/provinces'
import personalinfo from './modules/personalinfo'
import address from './modules/address'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    cart,
    products,
    provinces,
    personalinfo,
    address
  },
  strict: debug
})
