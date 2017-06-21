import postalCodeLookupService from '../api/postalCodeLookupService'
import * as types from '../mutation-types'
import addressValidationService from '../api/addressValidationService'
// initial state
const state = {
  address1: '',
  address2: '',
  city: '',
  province: '',
  zipcode: '',
  countryCode: 'US',
  terms: null,
  showModal: false,
  suggestions: []
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
  },
  updateShowModal ({commit}, value) {
    console.log('in updateShowModal action' + value)
    commit(types.UPDATE_SHOWMODAL, value)
  },
  checkSuggestions ({commit}, value) {
    console.log('in updateShowModal action' + value)

    addressValidationService.validate(value).then(function (response) {
      let noSuggestions = 'We are unable to verify this address.  Please check the spelling and use of abbreviations and try again.'
      let oneSuggestions = 'Please confirm that the address below is correct'
      let multipleSuggestion = 'Please confirm which address below is correct:'
      if (response.valid) {
        // localStorageService.set('e911', self.addressInfo)
        // this.onConfirm(); Proceed to OrderConfirmation
      } else {
        var suggestions = ''
        var message = ''
        var showMessage = false
        if (response.suggestions.length === 0) {
          suggestions = response.suggestions
          message = noSuggestions
          showMessage = true
          // $scope.showMessage = true
        } else {
          suggestions = response.suggestions
          if (response.suggestions.length === 1) {
            message = oneSuggestions
            showMessage = true
            showMessage = true
          } else {
            message = multipleSuggestion
            showMessage = true
            showMessage = true
          }
        }
        console.log('suggestions' + suggestions)
        console.log('message' + message)
        console.log('showMessage' + showMessage)
        commit(types.UPDATE_SUGGESTIONS, {suggestions})
        // this.$data.showModal = true
        commit(types.UPDATE_SHOWMODAL, true)
        // console.log('showModal' + this.showModal)
      }
    })
  },
  [types.SET_CITY_STATE] ({commit}, value) {
    console.log('in set City State action' + value)
    postalCodeLookupService.getCityAndState(value, cityAndState => {
      console.log('in set City State action - ' + cityAndState)
      commit(types.UPDATE_CITY_STATE, cityAndState)
    })
  }
}

// mutations
const mutations = {
  [types.UPDATE_CITY_STATE] (state, value) {
    console.log('in UPDATE_CITY_STATE' + value.city + '-' + value.state)
    state.city = value.city
    state.province = value.state
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
  },
  [types.UPDATE_SHOWMODAL] (state, value) {
    console.log('update UPDATE_SHOWMODAL 1' + value)
    state.showModal = value
  },
  [types.UPDATE_SUGGESTIONS] (state, {suggestions}) {
    console.log('update UPDATE_SUGGESTIONS 1' + suggestions)
    state.suggestions = suggestions
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

