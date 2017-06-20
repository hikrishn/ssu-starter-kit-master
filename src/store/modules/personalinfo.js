import * as types from '../mutation-types'

const state = {
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
}

const actions = {
  [types.SET_FIRST_NAME] ({commit}, value) {
    console.log('in updateFirstNames action' + value)
    commit(types.UPDATE_FIRST_NAME, value)
  },
  [types.SET_LAST_NAME] ({commit}, value) {
    console.log('in updateLastName action' + value)
    commit(types.UPDATE_LAST_NAME, value)
  },
  [types.SET_EMAIL] ({commit}, value) {
    console.log('in updateEmail action' + value)
    commit(types.UPDATE_EMAIL, value)
  },
  [types.SET_PHONE] ({commit}, value) {
    console.log('in updatePhone action' + value)
    commit(types.UPDATE_PHONE, value)
  }
}

const mutations = {
  [types.UPDATE_FIRST_NAME] (state, value) {
    console.log('update forstName')
    state.firstName = value
  },
  [types.UPDATE_LAST_NAME] (state, value) {
    console.log('update lastName mut' + value)
    state.lastName = value
  },
  [types.UPDATE_EMAIL] (state, value) {
    state.email = value
  },
  [types.UPDATE_PHONE] (state, value) {
    state.phone = value
  }
}

const getters = {

}

export default {
  state,
  getters,
  actions,
  mutations
}

