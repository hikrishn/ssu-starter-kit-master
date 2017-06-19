/* global localStorage */
import axios from 'axios'
import tokenApi from './tokenService'
import Vue from 'vue'

 /*
export function getProvinces (cb) {
  tokenApi.getCachedToken().then((accessToken) => {
    axios.get('/unifiedServicesCRM/restServices/v1/provinces?isoCountryCode=US', {
      headers: { 'Authorization': accessToken }
    }).then(response => {
      let authToken = 'Bearer ' + response.data.access_token
      localStorage.setItem('jwtAuthToken', authToken)
    })
  })
} */

export default {

  getProvinces (cb) {
    tokenApi.getCachedToken().then((response) => {
      axios.get('/unifiedServicesCRM/restServices/v1/provinces?isoCountryCode=US', {
        transformResponse: axios.defaults.transformResponse.concat((data) => {
          // Do whatever you want to transform the data
          var result = []
          var respArray = data.referenceDataEntry
          console.log('transformResponse' + respArray)
          Vue._.forEach(respArray, function (province) {
            var stateObject = {'provinceCode': province.dataId, 'provinceId': province.dataId, 'provinceName': province.dataDisplayText}
            result.push(stateObject)
            console.log('province' + province.dataId)
          })
          data = Vue._.sortBy(result, 'provinceId')
          return data
        }),
        headers: { 'Authorization': localStorage.getItem('jwtAuthToken') }
      }).then(response => {
        cb(response.data)
      })
    })
  }

}

