import provincesService from '../api/provincesService'
import * as types from '../mutation-types'

// initial state
const state = {
  provinces: ['Germany', 'Iceland']
}

// getters
const getters = {
  allProvinces: state => state.provinces
}

// actions
const actions = {
  getAllProvinces ({commit}) {
    console.log('1in getAllProvinces')
    provincesService.getProvinces(provinces => {
      console.log('in getAllProvinces' + provinces)
      commit(types.GET_PROVINCES, {provinces})
    })
  }
}

// mutations
const mutations = {
  [types.GET_PROVINCES] (state, {provinces}) {
    console.log('in mutation getAllProvinces')
    state.provinces = provinces
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
