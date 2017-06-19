/* global localStorage */
import axios from 'axios'

export default {

  getCachedToken () {
    return axios({
      method: 'post',
      url: '/api-gateway/jwt/token',
      headers: {
        'X-AUTH-TOKEN': 'anonymous'
      }
    }).then(response => {
      let authToken = 'Bearer ' + response.data.access_token
      localStorage.setItem('jwtAuthToken', authToken)
    })
  }

}
