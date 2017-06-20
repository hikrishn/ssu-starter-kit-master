/* global localStorage */
import axios from 'axios'
import tokenApi from './tokenService'

export default {
  getCityAndState (postalCode, cb) {
    var request = {
      'postalCodeCandidate': [{
        'postalCode': postalCode,
        'isoCountryCode': 'US'
      }]
    }
    var config = {
      headers: {'Authorization': localStorage.getItem('jwtAuthToken')}
    }

    tokenApi.getCachedToken().then((response) => {
      // return new Promise((resolve, reject) => {
      axios.post('/unifiedServicesAVS/v1/postalCodeLookup', request, config)
      .then(resp => {
        var data = resp.data
        console.log('In postalCodeLookUp' + data)

        console.log('In postalCodeLookUp not error' + data)
        var cityAndState = {
          city: data.postalCodeCandidates[0].postalCodeFeedback.city[0],
          state: data.postalCodeCandidates[0].postalCodeFeedback.state
        }
        console.log('In postalCodeLookUp cityAndState' + cityAndState.city)
        cb(cityAndState)
      })
      .catch(e => {
        console.log('Error occured while invoking the PostalCodeLookup Service')
        // reject(e)
      })
      // })
    })
  }

}

