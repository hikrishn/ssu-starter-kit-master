import postalCodeLookupService from '../api/postalCodeLookupService'
import * as types from '../mutation-types'
// initial state
const state = {
  address1: '',
  address2: '',
  city: '',
  province: '',
  zipcode: '',
  countryCode: 'US',
  terms: null
}

// getters
const getters = {
}

// actions
const actions = {

  updateAddress1 ({commit}, value) {
    console.log('in updateAddress1 action' + value)
    commit(types.UPDATE_ADDR1, value)
  },
  updateAddress2 ({commit}, value) {
    console.log('in updateAddress2 action' + value)
    commit(types.UPDATE_ADDR2, value)
  },
  updateCity ({commit}, value) {
    console.log('in updateCity action' + value)
    commit(types.UPDATE_CITY, value)
  },
  updateState ({commit}, value) {
    console.log('in updateState action' + value)
    commit(types.UPDATE_STATE, value)
  },
  updateZip ({commit}, value) {
    console.log('in updateZip action' + value)
    commit(types.UPDATE_ZIP, value)
  },
  updateTerms ({commit}, value) {
    console.log('in updateTerms action' + value)
    commit(types.UPDATE_TERMS, value)
  }
}

// mutations
const mutations = {
  [types.UPDATE_CITY_STATE] (state, value) {
    postalCodeLookupService.getCityAndState(value, cityAndState => {
      console.log('in updatecitystate' + cityAndState)
      state.city = cityAndState.city
      state.province = cityAndState.state
    })
    // console.log('in mutation updatecitystate' + state.city)
    // state.city = 'SOUTH AMBOY'
    // console.log('in mutation updatecitystate1' + state.province)
  },
  [types.UPDATE_ADDR1] (state, value) {
    console.log('update UPDATE_ADDR1' + value)
    state.address1 = value
  },
  [types.UPDATE_ADDR2] (state, value) {
    console.log('update UPDATE_ADDR2' + value)
    state.address2 = value
  },
  [types.UPDATE_ZIP] (state, value) {
    console.log('update UPDATE_ZIP' + value)
    state.zipcode = value
  },
  [types.UPDATE_CITY] (state, value) {
    console.log('update UPDATE_CITY' + value)
    state.city = value
  },
  [types.UPDATE_STATE] (state, value) {
    console.log('update UPDATE_STATE' + value)
    state.province = value
  },
  [types.UPDATE_TERMS] (state, value) {
    console.log('update UPDATE_TERMS' + value)
    state.terms = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

