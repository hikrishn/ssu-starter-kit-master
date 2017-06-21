/* global localStorage */
import axios from 'axios'
import tokenApi from './tokenService'
import Vue from 'vue'
export default {
  validate (address, cb) {
    var params = {
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      province: address.province,
      postalCode: address.postalCode,
      countryCode: 'US',
      action: 'validate'
    }

    return tokenApi.getCachedToken().then((response) => {
      return new Promise(function (resolve, reject) {
        axios.get('/unifiedServicesAVS/v2/address.json', {params: params, headers: {'Authorization': localStorage.getItem('jwtAuthToken')}})
        .then(resp => {
          console.log('in address validation service 1' + resp.data)
          var candidates = resp.data.addressCandidates

          if (!candidates || candidates.length === 0) {
            return resolve({valid: false})
          }
          var result = {}
          result.valid = candidates[0].addressCandidateFeedback.completeMatch === true && !candidates[0].addressCandidateFeedback.error
          if (result.valid) {
            return resolve(result)
          }
          candidates = Vue._.reject(candidates, function (candidate) {
            return candidate.addressLine1 === params.addressLine1 &&
            candidate.addressLine2 === params.addressLine2 &&
            candidate.city === params.city &&
            candidate.stateProvince === params.province &&
            candidate.postalCode === params.postalCode
          })

          result.suggestions = []

          Vue._.forEach(candidates, function (candidate) {
            if (result.suggestions.length === 2) {
              return
            }

            if (!candidate.addressLine1) {
              return
            }

            var address,
              parsedAddress,
              parsedAddress1,
              parsedAddress2,
              addressLine1,
              addressLine2

            if (candidate.parsedAddress) {
              parsedAddress = candidate.parsedAddress

              parsedAddress1 = parsedAddress.houseNumber ? parsedAddress.houseNumber + ' ' : ''
              parsedAddress1 = parsedAddress.streetPreDirectional ? parsedAddress1 + parsedAddress.streetPreDirectional + ' ' : parsedAddress1
              parsedAddress1 = parsedAddress.streetName ? parsedAddress1 + parsedAddress.streetName + ' ' : parsedAddress1
              parsedAddress1 = parsedAddress.streetType ? parsedAddress1 + parsedAddress.streetType + ' ' : parsedAddress1
              parsedAddress1 = parsedAddress.streetPostDirectional ? parsedAddress1 + parsedAddress.streetPostDirectional + ' ' : parsedAddress1
              parsedAddress1 = parsedAddress1.trim()
              parsedAddress1 = parsedAddress1 === '' ? null : parsedAddress1

              parsedAddress2 = parsedAddress.apartmentLabel ? parsedAddress.apartmentLabel + ' ' : ' '
              parsedAddress2 = parsedAddress.apartmentNumber ? parsedAddress2 + parsedAddress.apartmentNumber + ' ' : ' '
              parsedAddress2 = parsedAddress2.trim()
              parsedAddress2 = parsedAddress2 === '' ? null : parsedAddress2
            }

            if (Vue._.isString(parsedAddress1) && Vue._.isString(parsedAddress2) &&
              Vue._.isString(candidate.addressLine1) &&
              ((parsedAddress1 + ' ' + parsedAddress2).toUpperCase() === candidate.addressLine1.toUpperCase())) {
              addressLine1 = parsedAddress1
              addressLine2 = parsedAddress2
            } else {
              addressLine1 = candidate.addressLine1
              addressLine2 = candidate.addressLine2 || null
            }

            address = {
              address1: addressLine1,
              address2: addressLine2,
              city: candidate.city,
              zipcode: candidate.postalCode
            }
            console.log('in address validation service' + address.address1)
            /* TODO :
              Vue._.forEach(this.$store.state.provinces, function (province) {
              if (province.provinceCode.toUpperCase() === candidate.stateProvince) {
                console.log('in address validation service candidate.stateProvince' + candidate.stateProvince)
                address.province = province
                address.oneLineAddress = this.getOneLineAdd(address)
              }
            }) */

            if (!address) {
              return ''
            }
            var oneLineAddress
            if (address.address1) {
              oneLineAddress = address.address1.toUpperCase()
            }
            if (address.address2) {
              oneLineAddress = oneLineAddress + ' , ' + address.address2.toUpperCase()
            }
            if (address.city) {
              oneLineAddress = oneLineAddress + ' , ' + address.city.toUpperCase()
            }
            if (address.province) {
              oneLineAddress = oneLineAddress + ' , ' + address.province.provinceCode.toUpperCase()
            }
            if (address.zipcode) {
              oneLineAddress = oneLineAddress + ' , ' + address.zipcode
            }
            // address.oneLineAddress = this.getOneLineAdd(address)
            address.oneLineAddress = oneLineAddress
            result.suggestions.push(address)
          })
          return resolve(result)
      // cb(cityAndState)
        })
        .catch(e => {
          console.log('Error occured while invoking the addressValidationService Service')
          return resolve({valid: true})
        })
      })
    })
  },

  getOneLineAdd (address) {
    console.log('in getOneLineAdd')
    if (!address) {
      return ''
    }
    var oneLineAddress
    if (address.address1) {
      oneLineAddress = address.address1.toUpperCase()
    }
    if (address.address2) {
      oneLineAddress = oneLineAddress + ' , ' + address.address2.toUpperCase()
    }
    if (address.city) {
      oneLineAddress = oneLineAddress + ' , ' + address.city.toUpperCase()
    }
    if (address.province) {
      oneLineAddress = oneLineAddress + ' , ' + address.province.provinceCode.toUpperCase()
    }
    if (address.zipcode) {
      oneLineAddress = oneLineAddress + ' , ' + address.zipcode
    }
    return oneLineAddress
  }
}
