// import postalCodeLookupService from '../api/postalCodeLookupService'
import * as types from '../mutation-types'
// initial state
const state = {
  address1: '',
  address2: '',
  city: 'SOUTH AM',
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
}

// mutations
const mutations = {
  [types.UPDATE_CITY_STATE] (state, value) {
    /* postalCodeLookupService.getCityAndState(value, cityAndState => {
      console.log('in updatecitystate' + cityAndState)
      state.city = cityAndState.city
      state.province = cityAndState.state
    }) */
    console.log('in mutation updatecitystate' + state.city)
    state.city = 'SOUTH AMBOY'
    console.log('in mutation updatecitystate1' + state.city)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

